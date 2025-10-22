import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { apiClient } from "../client";
import type { Project } from "../../types";
import { db } from "../../db";
import type { PendingOperationStore, ProjectStore } from "../../db/schema";
import { useOnline } from "../../hooks/useOnline";
// import { useOnline } from "../../hooks/useOnline";

export const useProjects = () => {
    const [cachedData, setCachedData] = useState<{ data: Project[] } | null>(
        null,
    );

    useEffect(() => {
        db.projects.getAll().then((stored) => {
            if (stored.length > 0) {
                setCachedData({ data: stored.map((s) => s.data) });
            }
        });
    }, []);

    return useQuery<Project[], Error>({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await apiClient<Project[]>("/projects");
            for (const project of response) {
                await db.projects.save({
                    id: project.id,
                    syncStatus: "synced",
                    data: project,
                    lastSyncedAt: new Date(),
                });
            }
            const projects = (await db.projects.getAll()).map((p) => p.data);
            return projects;
        },
        placeholderData: cachedData ? cachedData.data : undefined,
    });
};

const createProjectInApi = async (project: Project) => {
    console.log("Online - calling API");
    const response = await apiClient<Project>("/projects", {
        method: "POST",
        body: JSON.stringify(project),
    });
    console.log(response);
    return response;
};

const createProjectActionInDb = async (data: Project) => {
    console.log("Offline - queuing");
    const projectId = v4();
    const projectCreateOp: PendingOperationStore = {
        type: "create",
        data: data,
        id: v4(),
        projectId: projectId,
        retryCount: 0,
        timestamp: new Date(),
    };

    await db.projectOps.add(projectCreateOp);

    const project: ProjectStore = {
        id: projectId,
        syncStatus: "pending",
        data,
        lastSyncedAt: new Date(),
    };
    await db.projects.save(project);

    return data;
};
export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const { isOnline } = useOnline();
    const mutationFn = isOnline ? createProjectInApi : createProjectActionInDb;
    return useMutation({
        mutationFn,
        networkMode: "always",
        onSuccess: (newProject) => {
            if (isOnline) {
                queryClient.invalidateQueries({ queryKey: ["projects"] });
            } else {
                queryClient.setQueryData<Project[]>(["projects"], (old) => {
                    return old ? [...old, newProject] : [newProject];
                });
            }
        },
    });
};
