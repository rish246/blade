import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../../db";
import type { PendingOperationStore } from "../../db/schema";
import { createProjectInApi } from "./projects";
import { useOnline } from "../../hooks/useOnline";

export const usePendingOps = () => {
    return useQuery<PendingOperationStore[], Error>({
        queryKey: ["project-ops"],
        queryFn: async () => {
            const pendingOps = await db.projectOps.getAll();
            return pendingOps;
        },
    });
};

export const flushOpsToApi = async () => {
    const changes = await db.projectOps.getAll();
    for (const change of changes) {
        try {
            switch (change.type) {
                case "create": {
                    const project = await createProjectInApi(change.data);
                    console.log({
                        project,
                    });
                    db.projectOps.delete(change.id);
                    db.projects.save({
                        id: project.id,
                        data: project,
                        syncStatus: "synced",
                    });
                    if (change.data.id !== project.id) {
                        console.log(
                            "Have to delete from the DB" + change.projectId,
                        );
                        await db.projects.delete(change.projectId);
                    }
                    break;
                }
                default: {
                    console.log("Not Implemented Yet...");
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
};

export const useFlushOps = () => {
    const { isOnline } = useOnline();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            if (!isOnline) {
                return;
            }
            await flushOpsToApi();
        },
        networkMode: "always",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-ops"] });
        },
    });
};
