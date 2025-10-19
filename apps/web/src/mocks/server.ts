import { http, HttpResponse, delay } from "msw";
import { mockProjects, mockUsers } from "./db";
import type { Project } from "../types";

const projects = [...mockProjects];
const users = [...mockUsers];
export const projectHandlers = [
    http.get("/api/projects", async () => {
        console.log(projects);
        await delay(300);
        return HttpResponse.json({ data: projects });
    }),
    http.post("/api/projects", async ({ request }) => {
        const body = (await request.json()) as Partial<Project>;

        const newProject: Project = {
            id: `proj-${Date.now()}`,
            title: body.title || "Untitled Project",
            description: body.description || "",
            ownerId: "user-1",
            createdAt: new Date(),
            updatedAt: new Date(),
            lastOpenedAt: new Date(),
            visibility: body.visibility || "private",
            thumbnail: `https://picsum.photos/seed/${Date.now()}/400/300`,
        };

        projects.push(newProject);

        console.log("[MSW] Created project:", newProject.title);
        await delay(300);

        return HttpResponse.json({ data: newProject }, { status: 201 });
    }),
];

export const userHandlers = [
    http.get("/api/users", async () => {
        await delay(200);
        return HttpResponse.json({ data: users });
    }),
];
