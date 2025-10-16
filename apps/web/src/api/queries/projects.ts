import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Project } from "../../types";
// const fetchProjects = async () => {
//     const response = await fetch("/api/projects");
//     if (!response.ok) throw new Error("Failed to fetch projects");
//     const result = await response.json();
//     return result.data;
// };

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => apiClient("/projects"),
        staleTime: 1000,
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
