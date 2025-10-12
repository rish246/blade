import { RefObject, useEffect } from "react";
export const useClickOutside = (
    ref: RefObject<HTMLElement | null> | Array<RefObject<HTMLElement | null>>,
    callback: () => void,
    enabled: boolean = true,
) => {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const didClickOnElement = (e: MouseEvent | TouchEvent) => {
            const refs = Array.isArray(ref) ? ref : [ref];
            return refs.some(
                (ref) => ref.current && ref.current.contains(e.target as Node),
            );
        };

        const handleClick = (e: MouseEvent | TouchEvent) => {
            if (!didClickOnElement(e)) {
                callback();
            }
        };

        document.addEventListener("click", handleClick);
        document.addEventListener("touchstart", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    }, [ref, callback, enabled]);
};
