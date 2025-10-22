export const apiClient = async <T>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> => {
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

    const res = await response.json();
    return res.data as T;
};
