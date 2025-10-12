import { renderHook, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useKeypress } from ".";

describe("useKeypress", () => {
    // Basic Functionality
    it("should call handler when key is pressed", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("Escape", handler));

        fireEvent.keyDown(document, { key: "Escape" });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    });

    it("should not call handler for different key", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("Escape", handler));

        fireEvent.keyDown(document, { key: "Enter" });

        expect(handler).not.toHaveBeenCalled();
    });

    it("should handle multiple key presses", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("Escape", handler));

        fireEvent.keyDown(document, { key: "Escape" });
        fireEvent.keyDown(document, { key: "Escape" });
        fireEvent.keyDown(document, { key: "Escape" });

        expect(handler).toHaveBeenCalledTimes(3);
    });

    // Multiple Keys
    it("should handle array of keys", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(["Enter", "Space"], handler));

        fireEvent.keyDown(document, { key: "Enter" });
        fireEvent.keyDown(document, { key: "Space" });

        expect(handler).toHaveBeenCalledTimes(2);
    });

    it("should call handler for any key in array", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(["a", "b", "c"], handler));

        fireEvent.keyDown(document, { key: "a" });
        fireEvent.keyDown(document, { key: "c" });
        fireEvent.keyDown(document, { key: "b" });

        expect(handler).toHaveBeenCalledTimes(3);
    });

    it("should not call handler for keys not in array", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(["a", "b"], handler));

        fireEvent.keyDown(document, { key: "c" });
        fireEvent.keyDown(document, { key: "d" });

        expect(handler).not.toHaveBeenCalled();
    });

    // Enabled/Disabled
    it("should not call handler when disabled", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("Escape", handler, { enabled: false }));

        fireEvent.keyDown(document, { key: "Escape" });

        expect(handler).not.toHaveBeenCalled();
    });

    it("should call handler when enabled is true", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("Escape", handler, { enabled: true }));

        fireEvent.keyDown(document, { key: "Escape" });

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should toggle enabled state dynamically", () => {
        const handler = vi.fn();

        const { rerender } = renderHook(
            ({ enabled }) => useKeypress("Escape", handler, { enabled }),
            { initialProps: { enabled: true } },
        );

        // Enabled - should call handler
        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler).toHaveBeenCalledTimes(1);

        // Disable
        rerender({ enabled: false });

        // Should not call handler
        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler).toHaveBeenCalledTimes(1); // Still 1, not 2

        // Re-enable
        rerender({ enabled: true });

        // Should call handler again
        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler).toHaveBeenCalledTimes(2);
    });

    // Cleanup
    it("should cleanup event listeners on unmount", () => {
        const handler = vi.fn();
        const removeEventListenerSpy = vi.spyOn(
            document,
            "removeEventListener",
        );

        const { unmount } = renderHook(() => useKeypress("Escape", handler));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
        );

        removeEventListenerSpy.mockRestore();
    });

    it("should not trigger handler after unmount", () => {
        const handler = vi.fn();

        const { unmount } = renderHook(() => useKeypress("Escape", handler));

        unmount();

        fireEvent.keyDown(document, { key: "Escape" });

        expect(handler).not.toHaveBeenCalled();
    });

    // Handler Updates
    it("should use updated handler", () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        const { rerender } = renderHook(
            ({ handler }) => useKeypress("Escape", handler),
            { initialProps: { handler: handler1 } },
        );

        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).not.toHaveBeenCalled();

        // Update handler
        rerender({ handler: handler2 });

        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler1).toHaveBeenCalledTimes(1); // Still 1
        expect(handler2).toHaveBeenCalledTimes(1); // Now called
    });

    // Key Updates
    it("should listen to updated keys", () => {
        const handler = vi.fn();

        const { rerender } = renderHook(
            ({ keys }) => useKeypress(keys, handler),
            { initialProps: { keys: "Escape" } },
        );

        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler).toHaveBeenCalledTimes(1);

        // Update to different key
        rerender({ keys: "Enter" });

        fireEvent.keyDown(document, { key: "Escape" }); // Old key
        expect(handler).toHaveBeenCalledTimes(1); // Not called

        fireEvent.keyDown(document, { key: "Enter" }); // New key
        expect(handler).toHaveBeenCalledTimes(2); // Called
    });

    // Special Keys
    it("should handle arrow keys", () => {
        const handler = vi.fn();
        renderHook(() =>
            useKeypress(
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
                handler,
            ),
        );

        fireEvent.keyDown(document, { key: "ArrowUp" });
        fireEvent.keyDown(document, { key: "ArrowDown" });
        fireEvent.keyDown(document, { key: "ArrowLeft" });
        fireEvent.keyDown(document, { key: "ArrowRight" });

        expect(handler).toHaveBeenCalledTimes(4);
    });

    it("should handle space key", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(" ", handler));

        fireEvent.keyDown(document, { key: " " });

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should handle function keys", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(["F1", "F2", "F12"], handler));

        fireEvent.keyDown(document, { key: "F1" });
        fireEvent.keyDown(document, { key: "F2" });
        fireEvent.keyDown(document, { key: "F12" });

        expect(handler).toHaveBeenCalledTimes(3);
    });

    it("should handle number keys", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(["1", "2", "3"], handler));

        fireEvent.keyDown(document, { key: "1" });
        fireEvent.keyDown(document, { key: "2" });
        fireEvent.keyDown(document, { key: "3" });

        expect(handler).toHaveBeenCalledTimes(3);
    });

    it("should handle letter keys", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress(["a", "b", "z"], handler));

        fireEvent.keyDown(document, { key: "a" });
        fireEvent.keyDown(document, { key: "b" });
        fireEvent.keyDown(document, { key: "z" });

        expect(handler).toHaveBeenCalledTimes(3);
    });

    // Event Object
    it("should pass KeyboardEvent to handler", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("Escape", handler));

        fireEvent.keyDown(document, { key: "Escape" });

        const event = handler.mock.calls[0][0];
        expect(event).toBeInstanceOf(KeyboardEvent);
        expect(event.key).toBe("Escape");
    });

    it("should pass event with modifier keys info", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("s", handler));

        fireEvent.keyDown(document, {
            key: "s",
            ctrlKey: true,
            shiftKey: false,
            altKey: false,
            metaKey: false,
        });

        const event = handler.mock.calls[0][0];
        expect(event.ctrlKey).toBe(true);
        expect(event.shiftKey).toBe(false);
    });

    // Custom Target
    it("should listen on custom target element", () => {
        const handler = vi.fn();
        const customElement = document.createElement("div");
        document.body.appendChild(customElement);

        renderHook(() =>
            useKeypress("Escape", handler, { target: customElement }),
        );

        // Event on document should not trigger
        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler).not.toHaveBeenCalled();

        // Event on custom element should trigger
        fireEvent.keyDown(customElement, { key: "Escape" });
        expect(handler).toHaveBeenCalledTimes(1);

        document.body.removeChild(customElement);
    });

    it("should listen on custom target element", () => {
        const handler = vi.fn();
        const customElement = document.createElement("div");
        document.body.appendChild(customElement);

        renderHook(() =>
            useKeypress("Escape", handler, { target: customElement }),
        );

        // Event on document should not trigger
        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler).not.toHaveBeenCalled();

        // Event on custom element should trigger
        fireEvent.keyDown(customElement, { key: "Escape" });
        expect(handler).toHaveBeenCalledTimes(1);

        document.body.removeChild(customElement);
    });

    // Edge Cases
    it("should handle empty string key", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("", handler));

        fireEvent.keyDown(document, { key: "" });

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should handle empty array", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress([], handler));

        fireEvent.keyDown(document, { key: "Escape" });

        expect(handler).not.toHaveBeenCalled();
    });

    it("should handle rapid key presses", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("a", handler));

        for (let i = 0; i < 100; i++) {
            fireEvent.keyDown(document, { key: "a" });
        }

        expect(handler).toHaveBeenCalledTimes(100);
    });

    it("should not interfere with other key listeners", () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        renderHook(() => useKeypress("Escape", handler1));
        renderHook(() => useKeypress("Enter", handler2));

        fireEvent.keyDown(document, { key: "Escape" });
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).not.toHaveBeenCalled();

        fireEvent.keyDown(document, { key: "Enter" });
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);
    });

    it("should handle case-sensitive keys", () => {
        const handler = vi.fn();
        renderHook(() => useKeypress("a", handler));

        fireEvent.keyDown(document, { key: "a" });
        expect(handler).toHaveBeenCalledTimes(1);

        // Capital A should not trigger (different key)
        fireEvent.keyDown(document, { key: "A" });
        expect(handler).toHaveBeenCalledTimes(1); // Still 1
    });

    // Real-World Scenarios
    it("should work with modal close scenario", () => {
        const onClose = vi.fn();
        const isOpen = true;

        renderHook(() => useKeypress("Escape", onClose, { enabled: isOpen }));

        fireEvent.keyDown(document, { key: "Escape" });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should work with dropdown navigation scenario", () => {
        const onNavigate = vi.fn();
        const isOpen = true;

        renderHook(() =>
            useKeypress(["ArrowUp", "ArrowDown"], onNavigate, {
                enabled: isOpen,
            }),
        );

        fireEvent.keyDown(document, { key: "ArrowUp" });
        fireEvent.keyDown(document, { key: "ArrowDown" });

        expect(onNavigate).toHaveBeenCalledTimes(2);
    });

    it("should work with save shortcut scenario", () => {
        const onSave = vi.fn((e: KeyboardEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        });

        renderHook(() => useKeypress("s", onSave));

        const event = new KeyboardEvent("keydown", {
            key: "s",
            ctrlKey: true,
            cancelable: true,
        });

        document.dispatchEvent(event);

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(event.defaultPrevented).toBe(true);
    });
});
