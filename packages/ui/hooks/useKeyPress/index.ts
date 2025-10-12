import { useCallback, useEffect } from "react";

type Options = {
    enabled?: boolean;
    target?: HTMLElement | Document;
};

type Handler = (e: KeyboardEvent) => void;

export const useKeypress = (
    keys: string | string[],
    handler: Handler,
    options: Options = {},
) => {
    const { enabled = true, target = document } = options;
    const handleKeyDown = useCallback(
        (e: Event) => {
            const event = e as KeyboardEvent;
            if (!enabled) {
                return;
            }
            const key = event.key;
            const shouldTrigger =
                typeof keys === "string" ? key === keys : keys.includes(key);
            if (shouldTrigger) {
                handler(event);
            }
        },
        [handler, enabled, keys],
    );

    useEffect(() => {
        target.addEventListener("keydown", handleKeyDown);
        return () => target.removeEventListener("keydown", handleKeyDown);
    }, [target, handleKeyDown]);
};
