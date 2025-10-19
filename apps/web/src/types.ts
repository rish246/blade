export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    lastOpenedAt: Date;
    visibility: "private" | "team" | "public";
    thumbnail?: string;
}
