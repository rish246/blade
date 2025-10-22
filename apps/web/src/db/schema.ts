import type { Project } from "../types";

type SyncStatus = "synced" | "pending" | "error";

export interface ProjectStore {
    id: string; // each entry needs an id
    syncStatus: SyncStatus;
    data: Project; // store the full project
    lastSyncedAt?: Date;
}

type OperationType = "create" | "update" | "delete";

export interface PendingOperationStore {
    id: string;
    projectId: string;
    type: OperationType;
    data: Project; // some data needs to be updated in the project
    retryCount: number;
    timestamp: Date;
}

export const DB_NAME = "blade-db";
export const DB_VERSION = 1;

// tables inside the database
export const STORES = {
    PROJECTS: "projects",
    PENDING_OPS: "pending-operations",
} as const;
