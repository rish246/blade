import { MiddleWare, PersistOptions } from "./types";

export const createPersistenceMiddleware = <T>(
    options: PersistOptions<T>,
): MiddleWare<T> => {
    return (set, get) => {
        console.log("1. Middleware function called");
        const { name, adapter = localStorage, version, partialize } = options;

        const savedState = adapter.getItem(name);
        console.log("2. Saved state:", savedState);

        if (savedState) {
            try {
                const parsed = JSON.parse(savedState.toString());
                console.log("3. Calling set with:", parsed.state);
                set(parsed.state);
                console.log("4. State after rehydration:", get());
            } catch (err) {
                console.error("Failed to parse saved state", err);
            }
        }

        console.log("5. Returning interceptor");

        // on state update...
        return (update) => {
            console.log("6. Interceptor called with:", update);
            set(update);

            // first re-render then update local storage
            const stateToPersist = partialize ? partialize(get()) : get();
            console.log("7. Persisting:", stateToPersist);
            adapter.setItem(
                name,
                JSON.stringify({
                    _version: version,
                    state: stateToPersist,
                }),
            );
        };
    };
};
