import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Project } from "../../types";
import { db } from "../../db";
import { useEffect, useState } from "react";

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

            for (const project of response.data) {
                await db.projects.save({
                    id: project.id,
                    syncStatus: "synced",
                    data: project,
                    lastSyncedAt: new Date(),
                });
            }
            return response.data;
        },
        placeholderData: cachedData ? cachedData.data : undefined,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Project>) =>
            apiClient("/projects", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
