import { useSyncExternalStore } from "react";
import { StoreGetter, StoreInitializer, StoreSetter, UseStore } from "./types";
export const createStore = <T extends object>(
    initializer: StoreInitializer<T>,
): UseStore<T> => {
    let state: T;
    const listeners = new Set<() => void>();

    const set: StoreSetter<T> = (update) => {
        const changeInState =
            typeof update === "function" ? update(state) : update;
        state = {
            ...state,
            ...changeInState,
        };
        listeners.forEach((l) => l()); // make the component to re-render
    };

    const get: StoreGetter<T> = () => state;

    state = initializer(set, get);

    const subscribe = (listener: () => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const useStore: UseStore<T> = ((selector?: any): T => {
        const sliceSelector = selector ?? ((s: T) => s);
        return useSyncExternalStore(subscribe, () => sliceSelector(state));
    }) as UseStore<T>;

    return useStore;
};
