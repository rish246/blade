import { vi, describe, it, expect } from "vitest";
import { composeHandlers } from ".";

describe("composeHandlers", () => {
    it("should call both handlers", () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();
        const composed = composeHandlers(handler1, handler2);

        const mouseEvent = new MouseEvent("click");
        composed(mouseEvent);

        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
        expect(handler1).toHaveBeenCalledTimes(1);
    });

    it("should not call external when default behaviour is prevented", () => {
        const internalHandler = vi.fn((e: MouseEvent) => e.preventDefault());
        const externalHandler = vi.fn();

        const composed = composeHandlers(internalHandler, externalHandler);

        // ✅ Must be cancelable
        const event = new MouseEvent("click", { cancelable: true }); // cancelable prop should be set to true
        // only then the event works

        composed(event);

        expect(event.defaultPrevented).toBe(true);
        expect(internalHandler).toHaveBeenCalledTimes(1);
        expect(externalHandler).not.toHaveBeenCalled();
    });

    it("should handle undefined handlers gracefully", () => {
        const event = new MouseEvent("click");

        // Both undefined
        expect(() =>
            composeHandlers(undefined, undefined)(event),
        ).not.toThrow();

        // Internal undefined
        const external = vi.fn();
        composeHandlers(undefined, external)(event);
        expect(external).toHaveBeenCalledWith(event);

        // External undefined
        const internal = vi.fn();
        composeHandlers(internal, undefined)(event);
        expect(internal).toHaveBeenCalledWith(event);
    });

    it("should call in proper order: internal -> external", () => {
        const callOrder: string[] = [];
        const internal = vi.fn(() => callOrder.push("Internal"));
        const external = vi.fn(() => callOrder.push("External"));
        const composed = composeHandlers(internal, external);
        composed(new MouseEvent("click"));
        expect(callOrder).toEqual(["Internal", "External"]);
    });

    it("should pass the same event object to both handlers", () => {
        let internalEvent: Event | null = null;
        let externalEvent: Event | null = null;

        const internal = vi.fn((e: Event) => {
            internalEvent = e;
        });
        const external = vi.fn((e: Event) => {
            externalEvent = e;
        });
        const event = new MouseEvent("click");

        const composed = composeHandlers(internal, external);
        composed(event);

        expect(internalEvent).toBe(event);
        expect(externalEvent).toBe(event);
        expect(internalEvent).toBe(externalEvent);
    });
});
