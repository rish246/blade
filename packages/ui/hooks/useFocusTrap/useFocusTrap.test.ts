import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import { fireEvent } from "@testing-library/react";
import { useFocusTrap } from ".";

describe("useFocusTrap", () => {
    it("should trap focus within container", () => {
        const { result, rerender } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useFocusTrap(ref);
            return ref;
        });

        const container = document.createElement("div");
        const button1 = document.createElement("button");
        const button2 = document.createElement("button");

        container.appendChild(button1);
        container.appendChild(button2);
        result.current.current = container;
        document.body.appendChild(container);
        rerender();

        button2.focus();
        expect(document.activeElement).toBe(button2);

        // Tab from last element should cycle to first
        fireEvent.keyDown(container, { key: "Tab" });
        expect(document.activeElement).toStrictEqual(button1);

        document.body.removeChild(container);
    });

    it("should cycle backwards with Shift+Tab", () => {
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useFocusTrap(ref);
            return ref;
        });

        const container = document.createElement("div");
        const button1 = document.createElement("button");
        const button2 = document.createElement("button");

        container.appendChild(button1);
        container.appendChild(button2);
        result.current.current = container;
        document.body.appendChild(container);

        button1.focus();

        // Shift+Tab from first element should cycle to last
        fireEvent.keyDown(container, { key: "Tab", shiftKey: true });
        expect(document.activeElement).toStrictEqual(button2);

        document.body.removeChild(container);
    });

    it("should auto-focus first element", () => {
        const { result, rerender } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useFocusTrap(ref, { autoFocus: true });
            return ref;
        });

        const container = document.createElement("div");
        const button = document.createElement("button");

        container.appendChild(button);
        result.current.current = container;
        document.body.appendChild(container);

        rerender();
        // I think.. its not fo

        expect(document.activeElement).toBe(button);

        document.body.removeChild(container);
    });

    it("should restore focus on unmount", () => {
        const originalButton = document.createElement("button");
        document.body.appendChild(originalButton);
        originalButton.focus();

        const { result, unmount } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useFocusTrap(ref);
            return ref;
        });

        const container = document.createElement("div");
        const button = document.createElement("button");
        container.appendChild(button);
        result.current.current = container;
        document.body.appendChild(container);

        unmount();

        expect(document.activeElement).toBe(originalButton);

        document.body.removeChild(container);
        document.body.removeChild(originalButton);
    });

    it("should not trap when disabled", () => {
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useFocusTrap(ref, { enabled: false });
            return ref;
        });

        const container = document.createElement("div");
        const button = document.createElement("button");

        container.appendChild(button);
        result.current.current = container;
        document.body.appendChild(container);

        button.focus();

        // Tab should not be prevented
        const event = new KeyboardEvent("keydown", {
            key: "Tab",
            bubbles: true,
        });
        const defaultPrevented = !container.dispatchEvent(event);

        expect(defaultPrevented).toBe(false);

        document.body.removeChild(container);
    });
});
