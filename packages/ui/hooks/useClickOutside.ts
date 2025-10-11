import { RefObject, useEffect, useRef } from "react";
export const useClickOutside = <T extends HTMLElement>(
    ref: RefObject<T | null> | RefObject<T | null>[],
    callback: () => void,
    enabled: boolean = true,
) => {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const didClickOnElement = (e: MouseEvent) => {
            const refs = Array.isArray(ref) ? ref : [ref];
            return refs.some(
                (ref) => ref.current && ref.current.contains(e.target as Node),
            );
        };

        const handleClick = (e: MouseEvent) => {
            if (!didClickOnElement(e)) {
                console.log("clicked");
                callback();
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [ref, callback, enabled]);
};
