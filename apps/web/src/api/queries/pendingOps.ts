import { useQuery } from "@tanstack/react-query";
import { db } from "../../db";
import type { PendingOperationStore } from "../../db/schema";

export const usePendingOps = () => {
    return useQuery<PendingOperationStore[], Error>({
        queryKey: ["projects"],
        queryFn: async () => {
            const pendingOps = await db.projectOps.getAll();
            return pendingOps;
        },
    });
};
