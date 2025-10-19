import { describe, it, expect, beforeEach } from "vitest";
import "fake-indexeddb/auto"; // Mock IndexedDB in tests
import { db, getDB } from "..";
import type { PendingOperationStore, ProjectStore } from "../schema";

describe("IndexedDB Integration", () => {
    beforeEach(async () => {
        // Clear database before each test
        const database = await getDB();
        await database.clear("projects");
        await database.clear("pending-operations");
    });

    it("should save and retrieve a project", async () => {
        // Arrange
        const project: ProjectStore = {
            id: "ps-1",
            syncStatus: "synced",
            data: {
                id: "p-1",
                title: "TestProj",
                description: "TestProjDesc",
                ownerId: "o-1",
                createdAt: new Date(),
                updatedAt: new Date(),
                lastOpenedAt: new Date(),
                visibility: "private",
            },
        };

        // Act
        await db.projects.save(project);
        const result = await db.projects.getById(project.id);

        // Assert
        expect(result).toEqual(project);
    });

    it("should persist multiple projects", async () => {
        const project1: ProjectStore = {
            id: "ps-1",
            syncStatus: "synced",
            data: {
                id: "p-1",
                title: "TestProj",
                description: "TestProjDesc",
                ownerId: "o-1",
                createdAt: new Date(),
                updatedAt: new Date(),
                lastOpenedAt: new Date(),
                visibility: "private",
            },
        };

        const project2: ProjectStore = {
            id: "ps-2",
            syncStatus: "synced",
            data: {
                id: "p-2",
                title: "TestProj2",
                description: "TestProjDesc2",
                ownerId: "o-1",
                createdAt: new Date(),
                updatedAt: new Date(),
                lastOpenedAt: new Date(),
                visibility: "private",
            },
        };

        await db.projects.save(project1);
        await db.projects.save(project2);

        const projects = await db.projects.getAll();
        expect(projects.length).toBe(2);
        expect(projects[0]).toEqual(project1);
        expect(projects[1]).toEqual(project2);
    });

    it("should queue pending operations", async () => {
        // Arrange
        const project: ProjectStore = {
            id: "ps-1",
            syncStatus: "synced",
            data: {
                id: "p-1",
                title: "TestProj",
                description: "TestProjDesc",
                ownerId: "o-1",
                createdAt: new Date(),
                updatedAt: new Date(),
                lastOpenedAt: new Date(),
                visibility: "private",
            },
        };

        // Act
        await db.projects.save(project);

        const pendingOps: PendingOperationStore = {
            id: "pending-1",
            projectId: "p-1",
            type: "create",
            data: { description: "updated" },
            retryCount: 0,
            timestamp: new Date(),
        };

        await db.projectOps.add(pendingOps);
        const allOps = await db.projectOps.getAll();
        expect(allOps.length).toBe(1);
        expect(allOps[0]).toEqual(pendingOps);
    });

    it("should delete operations from queue", async () => {
        const project: ProjectStore = {
            id: "ps-1",
            syncStatus: "synced",
            data: {
                id: "p-1",
                title: "TestProj",
                description: "TestProjDesc",
                ownerId: "o-1",
                createdAt: new Date(),
                updatedAt: new Date(),
                lastOpenedAt: new Date(),
                visibility: "private",
            },
        };

        // Act
        await db.projects.save(project);

        const pendingOps: PendingOperationStore = {
            id: "pending-1",
            projectId: "p-1",
            type: "create",
            data: { description: "updated" },
            retryCount: 0,
            timestamp: new Date(),
        };

        await db.projectOps.add(pendingOps);
        const allOps = await db.projectOps.getAll();
        expect(allOps.length).toBe(1);
        expect(allOps[0]).toEqual(pendingOps);

        await db.projectOps.delete("pending-1");
        expect(await db.projectOps.getAll()).toEqual([]);
    });
});
