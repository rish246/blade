import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import {
    DB_NAME,
    DB_VERSION,
    STORES,
    type PendingOperationStore,
    type ProjectStore,
} from "./schema";

export interface BladeDbSchema extends DBSchema {
    [STORES.PROJECTS]: {
        key: string;
        value: ProjectStore;
        indexes: { "by-sync-status": string };
    };
    [STORES.PENDING_OPS]: {
        key: string;
        value: PendingOperationStore;
        indexes: { "by-project": string };
    };
}

// time to create a db instance
let dbInstance: IDBPDatabase<BladeDbSchema> | null = null;

// initial db connection
// if not connected... create a connection
export const getDB = async (): Promise<IDBPDatabase<BladeDbSchema>> => {
    if (dbInstance) return dbInstance;

    dbInstance = await openDB<BladeDbSchema>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORES.PROJECTS)) {
                const projectStore = db.createObjectStore(STORES.PROJECTS, {
                    keyPath: "id",
                });
                projectStore.createIndex("by-sync-status", "syncStatus"); // the key by which search will happen
            }

            if (!db.objectStoreNames.contains(STORES.PENDING_OPS)) {
                const pendingOpsStore = db.createObjectStore(
                    STORES.PENDING_OPS,
                    { keyPath: "id" },
                );

                pendingOpsStore.createIndex("by-project", "projectId");
            }

            return db;
        },
    });

    return dbInstance;
};

export const db = {
    projects: {
        async getAll(): Promise<ProjectStore[]> {
            const db = await getDB();
            return db.getAll(STORES.PROJECTS);
        },
        async getById(id: string): Promise<ProjectStore | undefined> {
            const db = await getDB();
            return db.get(STORES.PROJECTS, id);
        },
        async save(project: ProjectStore): Promise<void> {
            const db = await getDB();
            await db.put(STORES.PROJECTS, project);
        },
        async delete(id: string): Promise<void> {
            const db = await getDB();
            await db.delete(STORES.PROJECTS, id);
        },
        async add(project: ProjectStore): Promise<void> {
            const db = await getDB();
            await db.add(STORES.PROJECTS, project);
        },
    },

    projectOps: {
        async getAll(): Promise<PendingOperationStore[]> {
            const db = await getDB();
            return db.getAll(STORES.PENDING_OPS);
        },
        async add(op: PendingOperationStore): Promise<void> {
            const db = await getDB();
            await db.add(STORES.PENDING_OPS, op);
        },
        async delete(id: string): Promise<void> {
            const db = await getDB();
            await db.delete(STORES.PENDING_OPS, id);
        },
    },
};
