import { fireEvent, renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRef } from "react";
import { vi } from "vitest";
import { useClickOutside } from ".";

describe("useClickOutside", () => {
    it("should call handler when clicking outside the element", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler);
            return ref;
        });

        // Create a div and attach the ref
        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        // Click outside (on document body)
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element);
        expect(handler).toHaveBeenCalledTimes(1);

        // Cleanup
        document.body.removeChild(element);
    });

    it("should not call handler when clicking inside the element", () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler);
            return ref;
        });

        // Create a div and attach the ref
        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        // Click inside the element
        fireEvent.mouseDown(element);

        expect(handler).not.toHaveBeenCalled();

        // Cleanup
        document.body.removeChild(element);
    });

    it("should not call handler when enabled is false", () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler, false); // disabled
            return ref;
        });

        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        fireEvent.mouseDown(document.body);

        expect(handler).not.toHaveBeenCalled();

        document.body.removeChild(element);
    });

    it("Should support multiple ref targets", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref1 = useRef<HTMLDivElement>(null);
            const ref2 = useRef<HTMLDivElement>(null);
            useClickOutside([ref1, ref2], handler);
            return [ref1, ref2];
        });
        // Create a div and attach the ref
        const element1 = document.createElement("div");
        result.current[0].current = element1;
        document.body.appendChild(element1);

        const element2 = document.createElement("div");
        result.current[1].current = element2;
        document.body.appendChild(element2);

        // Click outside (on document body)
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element1);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element2);
        expect(handler).toHaveBeenCalledTimes(1);
        // Cleanup
        document.body.removeChild(element1);
        document.body.removeChild(element2);
    });

    it("Should support multiple ref targets of different types", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref1 = useRef<HTMLDivElement>(null);
            const ref2 = useRef<HTMLButtonElement>(null);
            useClickOutside([ref1, ref2], handler);
            return [ref1, ref2];
        });
        // Create a div and attach the ref
        const element1 = document.createElement("div");
        result.current[0].current = element1;
        document.body.appendChild(element1);

        const element2 = document.createElement("div");
        result.current[1].current = element2;
        document.body.appendChild(element2);

        // Click outside (on document body)
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element1);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element2);
        expect(handler).toHaveBeenCalledTimes(1);
        // Cleanup
        document.body.removeChild(element1);
        document.body.removeChild(element2);
    });

    it("Should handle touch events on mobile", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler);
            return ref;
        });

        // Create a div and attach the ref
        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        // Click outside (on document body)
        fireEvent.touchStart(document.body);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element);
        expect(handler).toHaveBeenCalledTimes(1);

        // Cleanup
        document.body.removeChild(element);
    });

    it("Should cleanup handlers on unmount", async () => {
        const handler = vi.fn();
        const removeEventListenerSpy = vi.spyOn(
            document,
            "removeEventListener",
        );

        const { unmount } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler);
            return ref;
        });

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "click",
            expect.any(Function),
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "touchstart",
            expect.any(Function),
        );

        removeEventListenerSpy.mockRestore();
    });

    it("Should handle ref being null initially", async () => {
        const handler = vi.fn();

        const { unmount } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler);
            return ref;
        });

        // didn't attach
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("Should handle nested components", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref1 = useRef<HTMLDivElement>(null);
            useClickOutside(ref1, handler);
            return ref1;
        });
        // Create a div and attach the ref
        const parentEl = document.createElement("div");
        result.current.current = parentEl;
        document.body.appendChild(parentEl);

        const childEl = document.createElement("div");
        parentEl.appendChild(childEl);

        await userEvent.click(childEl);
        expect(handler).not.toHaveBeenCalled();
        // Click outside (on document body)
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);
        document.body.removeChild(parentEl);
    });

    it("Should remove the first handler on re-render and call the second handler", async () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        const { result, rerender } = renderHook(
            ({ handler }) => {
                const ref = useRef<HTMLDivElement>(null);
                useClickOutside(ref, handler);
                return ref;
            },
            { initialProps: { handler: handler1 } },
        );

        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        await userEvent.click(document.body);
        expect(handler1).toHaveBeenCalledTimes(1);

        rerender({ handler: handler2 });
        await userEvent.click(document.body);
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);
    });

    it("Should not call handler if not enabled", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler, false);
            return ref;
        });

        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        await userEvent.click(document.body);
        expect(handler).not.toHaveBeenCalled();
    });

    it("Should handle dynamic enabled state", async () => {
        const handler = vi.fn();
        const { result, rerender } = renderHook(
            ({ enabled }) => {
                const ref = useRef<HTMLDivElement>(null);
                useClickOutside(ref, handler, enabled);
                return ref;
            },
            { initialProps: { enabled: false } },
        );

        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        await userEvent.click(document.body);
        expect(handler).not.toHaveBeenCalled();

        rerender({ enabled: true });
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should handle empty array of refs", async () => {
        const handler = vi.fn();
        renderHook(() => {
            useClickOutside([], handler);
        });

        await userEvent.click(document.body);

        // Should call handler since no refs to check
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should work with mixed null and valid refs", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref1 = useRef<HTMLDivElement>(null);
            const ref2 = useRef<HTMLDivElement>(null);
            useClickOutside([ref1, ref2], handler);
            return [ref1, ref2];
        });

        // Only attach one ref
        const element1 = document.createElement("div");
        result.current[0].current = element1;
        document.body.appendChild(element1);
        // ref2 remains null

        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);

        await userEvent.click(element1);
        expect(handler).toHaveBeenCalledTimes(1);

        document.body.removeChild(element1);
    });

    it("should prevent handler from being called multiple times on same click", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useClickOutside(ref, handler);
            return ref;
        });

        const element = document.createElement("div");
        result.current.current = element;
        document.body.appendChild(element);

        // Single click should only trigger handler once
        await userEvent.click(document.body);

        // Small delay to ensure no duplicate calls
        await new Promise((resolve) => setTimeout(resolve, 10));

        expect(handler).toHaveBeenCalledTimes(1);

        document.body.removeChild(element);
    });

    it("should work correctly with portaled elements", async () => {
        const handler = vi.fn();
        const { result } = renderHook(() => {
            const ref1 = useRef<HTMLDivElement>(null);
            const ref2 = useRef<HTMLDivElement>(null);
            useClickOutside([ref1, ref2], handler);
            return [ref1, ref2];
        });

        // Main element
        const mainElement = document.createElement("div");
        result.current[0].current = mainElement;
        document.body.appendChild(mainElement);

        // Portaled element (rendered elsewhere in DOM)
        const portalElement = document.createElement("div");
        result.current[1].current = portalElement;
        document.body.appendChild(portalElement);

        // Click on main element - should not trigger
        await userEvent.click(mainElement);
        expect(handler).not.toHaveBeenCalled();

        // Click on portal element - should not trigger
        await userEvent.click(portalElement);
        expect(handler).not.toHaveBeenCalled();

        // Click outside both - should trigger
        await userEvent.click(document.body);
        expect(handler).toHaveBeenCalledTimes(1);

        document.body.removeChild(mainElement);
        document.body.removeChild(portalElement);
    });
});
