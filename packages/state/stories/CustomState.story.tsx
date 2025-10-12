import { useState } from "react";
import { createStore } from "../src/createStore";

export default {
    title: "State/Testing/Counter",
};

type CountState = {
    count: number;
    increment: () => void;
    decrement: () => void;
};
const useCount = createStore<CountState>((set, get) => {
    return {
        count: 0,
        increment: () => set({ count: get().count + 1 }),
        decrement: () => set({ count: get().count - 1 }),
    };
});

export const Default = () => {
    const { count, increment, decrement } = useCount<CountState>();
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

type Todo = {
    name: string;
    isCompleted: false;
};
type TodoListState = {
    todos: Todo[];
    addTodo: (newTodo: Todo) => void;
    removeTodo: (todo: Todo) => void;
};

const useTodo = createStore<TodoListState>((set, get) => {
    return {
        todos: [],
        addTodo: (todo: Todo) =>
            set((prev) => ({
                ...prev,
                todos: [...prev.todos, todo],
            })),
        removeTodo: (todo: Todo) =>
            set((prev) => ({
                ...prev,
                todos: prev.todos.filter((t) => t !== todo),
            })),
    };
});
export const TodoList = () => {
    const { todos, addTodo, removeTodo } = useTodo<TodoListState>();
    const [curTodo, setCurTodo] = useState("");
    return (
        <div>
            <input
                value={curTodo}
                onChange={(e) => setCurTodo(e.target.value)}
            />
            <button
                onClick={() => {
                    addTodo({
                        name: curTodo,
                        isCompleted: false,
                    });
                }}
            >
                +
            </button>

            <div>
                {todos.map((todo) => (
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <p>{todo.name}</p>
                        <button onClick={() => removeTodo(todo)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
