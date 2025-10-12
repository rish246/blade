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

export type UseStore<T> = <U = T>(
    selector?: (state: T) => U,
) => U extends T ? T : U;
