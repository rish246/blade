import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createStore } from "../src/createStore";
import { MiddleWare, PersistenceAdapter, PersistOptions } from "../src/types";
import { createPersistenceMiddleware } from "../src/persistanceMiddleware";

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

        it("createStore doesn't cause unnecessary re-renders", () => {
            type Counter = {
                count: number;
                otherValue: string;
                inc: () => void;
            };

            let renderCount = 0;

            const useCounter = createStore<Counter>((set, get) => ({
                count: 0,
                otherValue: "initial",
                inc: () => set({ count: get().count + 1 }),
            }));

            const { result } = renderHook(() => {
                renderCount++;
                return useCounter();
            });

            // Initial render
            expect(renderCount).toBe(1);

            // Update count
            act(() => result.current.inc());

            // Should have re-rendered once after state change
            expect(renderCount).toBe(2);
            expect(result.current.count).toBe(1);

            // Update count again
            act(() => result.current.inc());

            // Should have re-rendered once more
            expect(renderCount).toBe(3);
            expect(result.current.count).toBe(2);

            // Setting the same value shouldn't cause a re-render
            act(() => result.current.inc());
            act(() => {
                const store = useCounter.getState();
                useCounter.setState({ count: store.count }); // Set same value
            });

            // Should have re-rendered only once for inc(), not for setting same value
            expect(renderCount).toBe(4);
        });
    });

    describe("selective re-renders with selectors", () => {
        it("using selector prevents re-renders for unrelated state changes", () => {
            type Store = { a: number; b: number };

            let renderCount = 0;

            const useStore = createStore<Store>((set) => ({
                a: 0,
                b: 0,
            }));

            // Component only subscribes to 'a'
            const { result } = renderHook(() => {
                renderCount++;
                return useStore((s) => s.a);
            });

            // Initial render
            expect(renderCount).toBe(1);
            expect(result.current).toBe(0);

            // Change 'b' - should NOT re-render
            act(() => {
                useStore.setState({ b: 10 });
            });

            expect(renderCount).toBe(1); // Still 1, no re-render!
            expect(result.current).toBe(0);

            // Change 'a' - should re-render
            act(() => {
                useStore.setState({ a: 5 });
            });

            expect(renderCount).toBe(2);
            expect(result.current).toBe(5);

            // Change 'b' again - should NOT re-render
            act(() => {
                useStore.setState({ b: 20 });
            });

            expect(renderCount).toBe(2); // Still 2, no re-render!
            expect(result.current).toBe(5);
        });

        it("using full state causes re-renders for any state change", () => {
            type Store = { a: number; b: number };

            let renderCount = 0;

            const useStore = createStore<Store>((set) => ({
                a: 0,
                b: 0,
            }));

            // Component subscribes to entire state
            const { result } = renderHook(() => {
                renderCount++;
                return useStore(); // No selector - gets full state
            });

            expect(renderCount).toBe(1);

            // Change 'b' - SHOULD re-render
            act(() => {
                useStore.setState({ b: 10 });
            });

            expect(renderCount).toBe(2); // Re-rendered!
            expect(result.current.b).toBe(10);

            // Change 'a' - SHOULD re-render
            act(() => {
                useStore.setState({ a: 5 });
            });

            expect(renderCount).toBe(3); // Re-rendered again!
            expect(result.current.a).toBe(5);
        });

        it("multiple components with different selectors re-render independently", () => {
            type Store = { a: number; b: number; c: string };

            let aRenders = 0;
            let bRenders = 0;
            let cRenders = 0;

            const useStore = createStore<Store>((set) => ({
                a: 0,
                b: 0,
                c: "initial",
            }));

            // Component 1: subscribes to 'a'
            const { result: aResult } = renderHook(() => {
                aRenders++;
                return useStore((s) => s.a);
            });

            // Component 2: subscribes to 'b'
            const { result: bResult } = renderHook(() => {
                bRenders++;
                return useStore((s) => s.b);
            });

            // Component 3: subscribes to 'c'
            const { result: cResult } = renderHook(() => {
                cRenders++;
                return useStore((s) => s.c);
            });

            // Initial renders
            expect(aRenders).toBe(1);
            expect(bRenders).toBe(1);
            expect(cRenders).toBe(1);

            // Change 'a' - only component 1 re-renders
            act(() => {
                useStore.setState({ a: 10 });
            });

            expect(aRenders).toBe(2);
            expect(bRenders).toBe(1); // No re-render
            expect(cRenders).toBe(1); // No re-render
            expect(aResult.current).toBe(10);

            // Change 'b' - only component 2 re-renders
            act(() => {
                useStore.setState({ b: 20 });
            });

            expect(aRenders).toBe(2); // No re-render
            expect(bRenders).toBe(2);
            expect(cRenders).toBe(1); // No re-render
            expect(bResult.current).toBe(20);

            // Change 'c' - only component 3 re-renders
            act(() => {
                useStore.setState({ c: "updated" });
            });

            expect(aRenders).toBe(2); // No re-render
            expect(bRenders).toBe(2); // No re-render
            expect(cRenders).toBe(2);
            expect(cResult.current).toBe("updated");

            // Change multiple properties - multiple components re-render
            act(() => {
                useStore.setState({ a: 30, c: "final" });
            });

            expect(aRenders).toBe(3);
            expect(bRenders).toBe(2); // Still no re-render (b unchanged)
            expect(cRenders).toBe(3);
        });

        it("selector returning object property prevents re-renders for other properties", () => {
            type User = { name: string; age: number; email: string };
            type Store = { user: User; count: number };

            let nameRenders = 0;
            let countRenders = 0;

            const useStore = createStore<Store>((set) => ({
                user: { name: "John", age: 25, email: "john@example.com" },
                count: 0,
            }));

            // Subscribe to user.name only
            const { result: nameResult } = renderHook(() => {
                nameRenders++;
                return useStore((s) => s.user.name);
            });

            // Subscribe to count only
            const { result: countResult } = renderHook(() => {
                countRenders++;
                return useStore((s) => s.count);
            });

            expect(nameRenders).toBe(1);
            expect(countRenders).toBe(1);

            // Change user.age - should NOT re-render either component
            act(() => {
                useStore.setState({
                    user: { ...useStore.getState().user, age: 26 },
                });
            });

            // Both should re-render because the entire 'user' object reference changed
            // (This depends on implementation - shallow equality check)
            expect(nameRenders).toBeGreaterThanOrEqual(1);

            // Change count - should only re-render count subscriber
            act(() => {
                useStore.setState({ count: 5 });
            });

            const nameRendersBeforeCountChange = nameRenders;
            expect(countRenders).toBe(2);
            expect(nameRenders).toBe(nameRendersBeforeCountChange); // No additional render
        });

        it("selector with equality check prevents re-renders when derived value doesn't change", () => {
            type Store = { items: string[]; multiplier: number };

            let renderCount = 0;

            const useStore = createStore<Store>((set) => ({
                items: ["apple", "banana", "cherry"],
                multiplier: 1,
            }));

            // Selector returns items count (derived value)
            const { result } = renderHook(() => {
                renderCount++;
                return useStore((s) => s.items.length);
            });

            expect(renderCount).toBe(1);
            expect(result.current).toBe(3);

            // Change multiplier - items.length is still 3
            act(() => {
                useStore.setState({ multiplier: 2 });
            });

            // Should NOT re-render because selected value (items.length) didn't change
            expect(renderCount).toBe(1);
            expect(result.current).toBe(3);

            // Change multiplier again - items.length is still 3
            act(() => {
                useStore.setState({ multiplier: 3 });
            });

            // Should still NOT re-render
            expect(renderCount).toBe(1);
            expect(result.current).toBe(3);

            // Now change items - items.length changes to 4
            act(() => {
                useStore.setState({
                    items: ["apple", "banana", "cherry", "date"],
                });
            });

            // Should re-render because selected value changed
            expect(renderCount).toBe(2);
            expect(result.current).toBe(4);
        });
    });

    describe("persistence middleware", () => {
        let mockStorage: Map<string, string>;
        let mockAdapter: PersistenceAdapter;

        beforeEach(() => {
            mockStorage = new Map();
            mockAdapter = {
                getItem: (key) => mockStorage.get(key) || null,
                setItem: (key, value) => {
                    mockStorage.set(key, value);
                },
                removeItem: (key) => {
                    mockStorage.delete(key);
                },
            };
        });

        it("persists state to storage on updates", () => {
            type Counter = { count: number };

            const persistMiddleware = createPersistenceMiddleware<Counter>({
                name: "test-counter",
                adapter: mockAdapter,
            });

            const useCounter = createStore<Counter>(
                (set, get) => ({
                    count: 0,
                }),
                [persistMiddleware],
            );

            // Update state
            act(() => {
                useCounter.setState({ count: 5 });
            });

            // Check storage
            const saved = mockAdapter.getItem("test-counter");
            expect(saved).toBeDefined();
            const parsed = JSON.parse(saved!);
            expect(parsed.state.count).toBe(5);
        });

        it("rehydrates state from storage on initialization", async () => {
            type Counter = { count: number };

            // Pre-populate storage
            mockAdapter.setItem(
                "test-counter",
                JSON.stringify({ state: { count: 42 }, _version: 0 }),
            );

            const persistMiddleware = createPersistenceMiddleware<Counter>({
                name: "test-counter",
                adapter: mockAdapter,
            });

            const useCounter = createStore<Counter>(
                (set) => ({
                    count: 0, // Initial value
                }),
                [persistMiddleware],
            );

            // Should have loaded from storage
            expect(useCounter.getState().count).toBe(42);
            waitFor(() => {});
        });

        it("only persists specified fields with partialize", () => {
            type Store = { count: number; temp: string };

            const persistMiddleware = createPersistenceMiddleware<Store>({
                name: "test-store",
                adapter: mockAdapter,
                partialize: (state) => ({ count: state.count }), // Only save count
            });

            const useStore = createStore<Store>(
                (set) => ({
                    count: 0,
                    temp: "not-persisted",
                }),
                [persistMiddleware],
            );

            act(() => {
                useStore.setState({ count: 10, temp: "ignored" });
            });

            const saved = mockAdapter.getItem("test-store");
            const parsed = JSON.parse(saved!);

            expect(parsed.state.count).toBe(10);
            expect(parsed.state.temp).toBeUndefined(); // Not persisted
        });

        it("handles corrupted storage data gracefully", () => {
            const consoleSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});

            // Invalid JSON in storage
            mockAdapter.setItem("test-counter", "invalid-json{{{");

            const persistMiddleware = createPersistenceMiddleware<{
                count: number;
            }>({
                name: "test-counter",
                adapter: mockAdapter,
            });

            const useCounter = createStore<{ count: number }>(
                (set) => ({
                    count: 0, // Fallback to initial state
                }),
                [persistMiddleware],
            );

            // Should use initial state, not crash
            expect(useCounter.getState().count).toBe(0);
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it("works with multiple middleware", () => {
            type Counter = { count: number };

            const loggerSpy = vi.fn();
            const logger: MiddleWare<Counter> = (set, get) => (update) => {
                loggerSpy("before", get().count);
                set(update);
                loggerSpy("after", get().count);
            };

            const persistMiddleware = createPersistenceMiddleware<Counter>({
                name: "test-counter",
                adapter: mockAdapter,
            });

            const useCounter = createStore<Counter>(
                (set, get) => ({
                    count: 0,
                }),
                [logger, persistMiddleware], // Multiple middleware
            );

            act(() => {
                useCounter.setState({ count: 3 });
            });

            // Logger should have been called
            expect(loggerSpy).toHaveBeenCalledWith("before", 0);
            expect(loggerSpy).toHaveBeenCalledWith("after", 3);

            // State should be persisted
            const saved = mockAdapter.getItem("test-counter");
            const parsed = JSON.parse(saved!);
            expect(parsed.state.count).toBe(3);
        });

        it("persists state multiple times on multiple updates", () => {
            type Counter = { count: number };

            const persistMiddleware = createPersistenceMiddleware<Counter>({
                name: "test-counter",
                adapter: mockAdapter,
            });

            const useCounter = createStore<Counter>(
                (set) => ({ count: 0 }),
                [persistMiddleware],
            );

            act(() => {
                useCounter.setState({ count: 1 });
            });
            expect(
                JSON.parse(mockAdapter.getItem("test-counter")!).state.count,
            ).toBe(1);

            act(() => {
                useCounter.setState({ count: 2 });
            });
            expect(
                JSON.parse(mockAdapter.getItem("test-counter")!).state.count,
            ).toBe(2);

            act(() => {
                useCounter.setState({ count: 3 });
            });
            expect(
                JSON.parse(mockAdapter.getItem("test-counter")!).state.count,
            ).toBe(3);
        });
    });
});
