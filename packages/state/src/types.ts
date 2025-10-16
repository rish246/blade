export type StoreSetter<T> = (
    partial: Partial<T> | ((prev: T) => Partial<T>),
) => void;

export type StoreGetter<T> = () => T;

export type StoreInitializer<T extends Object> = (
    set: StoreSetter<T>,
    get: StoreGetter<T>,
) => T;

export type MiddleWare<T> = (
    set: StoreSetter<T>,
    get: StoreGetter<T>,
) => StoreSetter<T>;

export type UseStore<T> = {
    (): T;
    <U>(selector?: (state: T) => U): U;
    getState: () => T;
    setState: (partial: Partial<T>) => void;
};

export type PersistenceAdapter = {
    getItem: (key: string) => string | null | Promise<string | null>;
    setItem: (key: string, value: string) => void | Promise<void>;
    removeItem: (key: string) => void | Promise<void>;
};

export type PersistOptions<T> = {
    name: string;
    adapter?: PersistenceAdapter;
    partialize?: (state: T) => Partial<T>;
    version?: number;
    migrate?: (persistedState: T, version: number) => T;
};
