import { MiddleWare, PersistOptions } from "./types";

export const createPersistenceMiddleware = <T>(
    options: PersistOptions<T>,
): MiddleWare<T> => {
    return (set, get) => {
        const { name, adapter = localStorage, version, partialize } = options;

        const savedState = adapter.getItem(name);

        if (savedState) {
            try {
                const parsed = JSON.parse(savedState.toString());
                set(parsed.state);
            } catch (err) {
                console.error("Failed to parse saved state", err);
            }
        }
        // on state update...
        return (update) => {
            set(update);
            const stateToPersist = partialize ? partialize(get()) : get();
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
