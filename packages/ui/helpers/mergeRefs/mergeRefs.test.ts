import { createRef, useRef } from "react";
import { vi } from "vitest";
import { expect, describe, it } from "vitest";
import { mergeRefs } from ".";
import { renderHook } from "@testing-library/react";

describe("mergeRefs", () => {
    it("Should merge ref objects into single", () => {
        // let create 2 ref objects
        const ref1 = createRef<HTMLDivElement>();
        const ref2 = createRef<HTMLDivElement>();

        const div1 = document.createElement("div");
        document.body.appendChild(div1);

        const mergedRef = mergeRefs<HTMLDivElement | null>(ref1, ref2);
        mergedRef(div1);

        expect(ref1.current).toBe(div1);
        expect(ref2.current).toBe(div1);
    });

    it("Should not point to single div without merge", () => {
        // let create 2 ref objects
        const ref1 = createRef<HTMLDivElement>();
        const ref2 = createRef<HTMLDivElement>();
        const div1 = document.createElement("div");
        document.body.appendChild(div1);

        ref1.current = div1;

        expect(ref1.current).toBe(div1);
        expect(ref2.current).not.toBe(div1);
    });

    it("should merge callback refs", () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        const callback3 = vi.fn();

        const div1 = document.createElement("div");
        document.body.appendChild(div1);

        const merged = mergeRefs(callback1, callback2, callback3);
        merged(div1);

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
        expect(callback3).toHaveBeenCalledTimes(1);
    });

    it("should merge callback and object refs", () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        const ref1 = createRef<HTMLDivElement>();

        const div1 = document.createElement("div");
        document.body.appendChild(div1);

        const merged = mergeRefs(callback1, callback2, ref1);
        merged(div1);

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
        expect(ref1.current).toBe(div1);
    });

    it("should handle empty array input", () => {
        const div1 = document.createElement("div");
        document.body.appendChild(div1);
        const callback1 = vi.fn();

        const merged = mergeRefs();
        merged(div1);

        expect(callback1).not.toHaveBeenCalled();
    });

    it("should not throw when called multiple times rapidly", () => {
        const ref = createRef<HTMLDivElement>();
        const element = document.createElement("div");
        const mergedRef = mergeRefs(ref);

        expect(() => {
            for (let i = 0; i < 100; i++) {
                mergedRef(element);
            }
        }).not.toThrow();

        expect(ref.current).toBe(element);
    });

    it("should work in realistic component scenario", () => {
        const { result } = renderHook(() => {
            const internalRef = useRef<HTMLDivElement>(null);
            const forwardedRef = useRef<HTMLDivElement>(null);

            return {
                internalRef,
                forwardedRef,
                mergedRef: mergeRefs(internalRef, forwardedRef),
            };
        });

        const element = document.createElement("div");
        result.current.mergedRef(element);

        // Both refs should have the element
        expect(result.current.internalRef.current).toBe(element);
        expect(result.current.forwardedRef.current).toBe(element);

        // Cleanup
        result.current.mergedRef(null);
        expect(result.current.internalRef.current).toBe(null);
        expect(result.current.forwardedRef.current).toBe(null);
    });
});
