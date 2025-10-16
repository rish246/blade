import type { User, Project } from "../types";

export const mockUsers: User[] = [
    {
        id: "user_1",
        email: "user1@example.com",
        name: "Alice Smith",
        createdAt: new Date("2024-01-01T12:00:00Z"),
    },
    {
        id: "user_2",
        email: "user2@example.com",
        name: "Bob Jones",
        createdAt: new Date("2024-03-15T09:30:00Z"),
    },
];

export const mockProjects: Project[] = [
    {
        id: "project_1",
        title: "AI Platform",
        description: "A platform for building and deploying AI models.",
        ownerId: "user_1",
        createdAt: new Date("2024-02-10T10:00:00Z"),
        updatedAt: new Date("2024-02-15T15:00:00Z"),
        lastOpenedAt: new Date("2024-02-15T15:00:00Z"),
        visibility: "private",
    },
    {
        id: "project_2",
        title: "Web Redesign",
        description: "Redesign of the company website for better UX.",
        ownerId: "user_2",
        createdAt: new Date("2024-03-20T08:45:00Z"),
        updatedAt: new Date("2024-03-22T11:30:00Z"),
        lastOpenedAt: new Date("2024-02-15T15:00:00Z"),
        visibility: "private",
    },
];
