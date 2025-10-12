import { RefObject, useEffect } from "react";

type Options = {
    enabled?: boolean;
    autoFocus?: boolean;
};

const FOCUSABLE_SELECTOR =
    "button:not([disabled]), " +
    "[href], " +
    "input:not([disabled]), " +
    "select:not([disabled]), " +
    "textarea:not([disabled]), " +
    '[tabindex]:not([tabindex="-1"]):not([disabled])';

export const useFocusTrap = <T extends HTMLElement>(
    ref: RefObject<T | null>,
    options: Options = {},
) => {
    const { enabled = true, autoFocus = false } = options;

    useEffect(() => {
        if (!enabled || !ref.current) {
            return;
        }

        const container = ref.current;
        const previousActiveElement = document.activeElement as HTMLElement;

        // Auto-focus first element when enabled
        if (autoFocus) {
            const firstFocusable =
                container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
            firstFocusable?.focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") {
                return;
            }

            const focusableElements = Array.from(
                container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
            );

            if (focusableElements.length === 0) {
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            if (e.shiftKey) {
                // Shift + Tab (backward)
                if (activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab (forward)
                if (activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        container.addEventListener("keydown", handleKeyDown);

        return () => {
            container.removeEventListener("keydown", handleKeyDown);
            // Restore focus to previous element
            previousActiveElement?.focus();
        };
    }, [ref.current, enabled, autoFocus]); // ✅ Remove ref from dependencies
};
