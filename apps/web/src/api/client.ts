export const apiClient = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`/api${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`Error while making request: ${response.statusText}`);
    }

    return response.json();
};
