import { renderHook, act } from "@testing-library/react";
import { createStore } from "../src/createStore";
import { describe, it, expect } from "vitest";

describe("createStore", () => {
    describe("createStore", () => {
        it("initializes correctly", async () => {
            type CountState = {
                count: number;
                increment: () => void;
                decrement: () => void;
            };

            const useStore = createStore<CountState>((set, get) => ({
                count: 0,
                increment: () => set({ count: get().count + 1 }),
                decrement: () => set({ count: get().count - 1 }),
            }));

            // ✅ Use the hook *inside* React context with renderHook
            const { result } = renderHook(() => useStore());
            // // Test initial state
            expect(result.current.count).toBe(0);

            // // Test increment
            act(() => {
                result.current.increment();
            });

            expect(result.current.count).toBe(1);

            // Test decrement
            act(() => {
                result.current.decrement();
            });

            expect(result.current.count).toBe(0);
        });
    });
});
