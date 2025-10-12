import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createStore } from "../src/createStore";
import { MiddleWare } from "../src/types";

// -----------------------------------------------------------------------------
// ✅ Test Suite: createStore (full-store usage style)
// -----------------------------------------------------------------------------
describe("createStore", () => {
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

    describe("createStore with middleware", () => {
        it("runs middleware before and after state updates", () => {
            type CounterState = { count: number; inc: () => void };

            const logs: string[] = [];

            const logger: MiddleWare<CounterState> = (set, get) => (update) => {
                logs.push(`before: ${get().count}`);
                set(update);
                logs.push(`after: ${get().count}`);
            };

            const useCounter = createStore<CounterState>(
                (set, get) => ({
                    count: 0,
                    inc: () => set({ count: get().count + 1 }),
                }),
                [logger],
            );

            const { result } = renderHook(() => useCounter());

            act(() => {
                result.current.inc();
            });

            expect(result.current.count).toBe(1);
            expect(logs).toEqual(["before: 0", "after: 1"]);
        });

        it("runs multiple middlewares in correct nested order", () => {
            type State = { value: number; inc: () => void };
            const calls: string[] = [];

            const mw1: MiddleWare<State> = (set, get) => (update) => {
                calls.push("mw1-before");
                set(update);
                calls.push("mw1-after");
            };

            const mw2: MiddleWare<State> = (set, get) => (update) => {
                calls.push("mw2-before");
                set(update);
                calls.push("mw2-after");
            };

            const useStore = createStore<State>(
                (set, get) => ({
                    value: 0,
                    inc: () => set({ value: get().value + 1 }),
                }),
                [mw1, mw2],
            );

            const { result } = renderHook(() => useStore());

            act(() => result.current.inc());

            expect(calls).toEqual([
                "mw1-before",
                "mw2-before",
                "mw2-after",
                "mw1-after",
            ]);
        });

        it("middleware can read updated state via get()", () => {
            type Counter = { count: number; inc: () => void };

            const spy = vi.fn();

            const tracker: MiddleWare<Counter> = (set, get) => (update) => {
                set(update);
                spy(get().count);
            };

            const useCounter = createStore<Counter>(
                (set, get) => ({
                    count: 0,
                    inc: () => set({ count: get().count + 1 }),
                }),
                [tracker],
            );

            const { result } = renderHook(() => useCounter());

            act(() => {
                result.current.inc();
                result.current.inc();
            });

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenLastCalledWith(2);
        });

        it("logger middleware logs to console", () => {
            type Counter = { count: number; inc: () => void };

            const consoleSpy = vi
                .spyOn(console, "log")
                .mockImplementation(() => {});

            const logger: MiddleWare<Counter> = (set, get) => (update) => {
                console.log("before", { count: get().count });
                set(update);
                console.log("after", { count: get().count });
            };

            const useCounter = createStore<Counter>(
                (set, get) => ({
                    count: 0,
                    inc: () => set({ count: get().count + 1 }),
                }),
                [logger],
            );

            const { result } = renderHook(() => useCounter());
            act(() => result.current.inc());

            expect(consoleSpy).toHaveBeenCalledWith("before", { count: 0 });
            expect(consoleSpy).toHaveBeenCalledWith("after", { count: 1 });

            consoleSpy.mockRestore();
        });
    });
});
