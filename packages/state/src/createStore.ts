import { useSyncExternalStore } from "react";
import {
    MiddleWare,
    StoreGetter,
    StoreInitializer,
    StoreSetter,
    UseStore,
} from "./types";
import { deepEqualObject } from "./utils";

export const createStore = <T extends object>(
    initializer: StoreInitializer<T>,
    middlewares: MiddleWare<T>[] = [],
): UseStore<T> => {
    let state: T;
    const listeners = new Set<() => void>();

    const set: StoreSetter<T> = (update) => {
        const changeInState =
            typeof update === "function" ? update(state) : update;

        const newState = {
            ...state,
            ...changeInState,
        };

        if (deepEqualObject(state, newState)) {
            return;
        }

        state = newState;
        listeners.forEach((l) => l());
    };

    const get: StoreGetter<T> = () => state;

    // Create a mutable reference that will hold the enhanced set
    let enhancedSet: StoreSetter<T> = set;

    // Create a proxy set that always calls the current enhancedSet
    const proxySet: StoreSetter<T> = (update) => enhancedSet(update);

    // Step 1: Initialize state with the proxy (which initially points to base set)
    state = initializer(proxySet, get);

    // Step 2: Now create the enhanced set with middlewares
    enhancedSet = middlewares.reduceRight(
        (prev, middleware) => middleware(prev, get) || prev,
        set,
    );

    // Now the proxy automatically uses the enhanced version
    // AND the persistence middleware can rehydrate the state

    const subscribe = (listener: () => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const useStore: UseStore<T> = ((selector?: any): T => {
        const sliceSelector = selector ?? ((s: T) => s);
        return useSyncExternalStore(subscribe, () => sliceSelector(state));
    }) as UseStore<T>;

    useStore.getState = get;
    useStore.setState = enhancedSet;
    return useStore;
};
