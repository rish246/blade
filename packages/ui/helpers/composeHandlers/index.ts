type Handler<T extends Event = Event> = (e: T) => void;

/**
 * Composes two event handlers (internal and external).
 * - Calls internal first
 * - If internal doesn't preventDefault(), calls external
 */
export const composeHandlers = <T extends Event>(
    internal?: Handler<T>,
    external?: Handler<T>,
): Handler<T> => {
    return (e) => {
        internal?.(e);
        // Only call external if event not prevented by internal
        if (!e.defaultPrevented) {
            external?.(e);
        }
    };
};
