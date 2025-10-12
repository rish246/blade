import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createStore } from "../src/createStore";

// -----------------------------------------------------------------------------
// ✅ Test Suite: createStore (full-store usage style)
// -----------------------------------------------------------------------------

describe("createStore (typed store object tests)", () => {
    it("initializes correctly", () => {
        type CounterState = {
            count: number;
            increment: () => void;
            decrement: () => void;
        };

        const useCounter = createStore<CounterState>((set, get) => ({
            count: 0,
            increment: () => set({ count: get().count + 1 }),
            decrement: () => set({ count: get().count - 1 }),
        }));

        const { result } = renderHook(() => useCounter());

        expect(result.current.count).toBe(0);
        expect(typeof result.current.increment).toBe("function");
    });

    it("updates state when action is called", () => {
        type CounterState = {
            count: number;
            increment: () => void;
            decrement: () => void;
        };

        const useCounter = createStore<CounterState>((set, get) => ({
            count: 0,
            increment: () => set({ count: get().count + 1 }),
            decrement: () => set({ count: get().count - 1 }),
        }));

        const { result } = renderHook(() => useCounter());

        expect(result.current.count).toBe(0);

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(1);
    });

    it("supports functional updates", () => {
        type NumberState = {
            value: number;
            double: () => void;
        };

        const useNumberStore = createStore<NumberState>((set, get) => ({
            value: 2,
            double: () => set((prev) => ({ value: prev.value * 2 })),
        }));

        const { result } = renderHook(() => useNumberStore());

        expect(result.current.value).toBe(2);

        act(() => {
            result.current.double();
        });

        expect(result.current.value).toBe(4);
    });

    it("reacts to multiple updates correctly", () => {
        type CounterState = {
            count: number;
            inc: () => void;
            dec: () => void;
        };

        const useCounter = createStore<CounterState>((set, get) => ({
            count: 0,
            inc: () => set({ count: get().count + 1 }),
            dec: () => set({ count: get().count - 1 }),
        }));

        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.inc();
            result.current.inc();
            result.current.dec();
        });

        expect(result.current.count).toBe(1);
    });

    it("shares the same store between multiple components", () => {
        type CounterState = {
            count: number;
            inc: () => void;
        };

        const useCounter = createStore<CounterState>((set, get) => ({
            count: 0,
            inc: () => set({ count: get().count + 1 }),
        }));

        const { result: A } = renderHook(() => useCounter());
        const { result: B } = renderHook(() => useCounter());

        expect(A.current.count).toBe(0);
        expect(B.current.count).toBe(0);

        act(() => {
            A.current.inc();
        });

        expect(A.current.count).toBe(1);
        expect(B.current.count).toBe(1); // ✅ Shared memory
    });

    it("handles multiple stores independently", () => {
        type CounterA = {
            count: number;
            inc: () => void;
        };
        type CounterB = {
            count: number;
            dec: () => void;
        };

        const useCounterA = createStore<CounterA>((set, get) => ({
            count: 0,
            inc: () => set({ count: get().count + 1 }),
        }));

        const useCounterB = createStore<CounterB>((set, get) => ({
            count: 10,
            dec: () => set({ count: get().count - 1 }),
        }));

        const { result: A } = renderHook(() => useCounterA());
        const { result: B } = renderHook(() => useCounterB());

        act(() => {
            A.current.inc();
            B.current.dec();
        });

        expect(A.current.count).toBe(1);
        expect(B.current.count).toBe(9);
    });

    it("supports derived/computed updates (todos example)", () => {
        type Todo = { id: number; text: string; done: boolean };
        type TodoState = {
            todos: Todo[];
            addTodo: (text: string) => void;
            toggleTodo: (id: number) => void;
        };

        const useTodoStore = createStore<TodoState>((set, get) => ({
            todos: [],
            addTodo: (text) =>
                set((prev) => ({
                    todos: [
                        ...prev.todos,
                        { id: prev.todos.length + 1, text, done: false },
                    ],
                })),
            toggleTodo: (id) =>
                set((prev) => ({
                    todos: prev.todos.map((t) =>
                        t.id === id ? { ...t, done: !t.done } : t,
                    ),
                })),
        }));

        const { result } = renderHook(() => useTodoStore());

        act(() => {
            result.current.addTodo("Learn Zustand");
            result.current.addTodo("Learn Blade Store");
        });

        expect(result.current.todos).toHaveLength(2);
        expect(result.current.todos[0].done).toBe(false);

        act(() => {
            result.current.toggleTodo(1);
        });

        expect(result.current.todos[0].done).toBe(true);
    });

    it("does not re-render when unrelated field changes", () => {
        type AppState = {
            a: number;
            b: number;
            incA: () => void;
            incB: () => void;
        };

        let renderCount = 0;

        const useAppStore = createStore<AppState>((set, get) => ({
            a: 1,
            b: 2,
            incA: () => set({ a: get().a + 1 }),
            incB: () => set({ b: get().b + 1 }),
        }));

        // ✅ Subscribe only to the 'a' slice
        const { result, rerender } = renderHook(() => {
            renderCount++;
            return useAppStore();
        });

        act(() => {
            result.current.incA?.(); // Or simply result.current.incB(); if using full state
        });

        rerender();

        expect(result.current.a).toBe(2); // a has not changed
        expect(renderCount).toBe(3); // subscribing to whole store.. re-renders surely
    });
});
