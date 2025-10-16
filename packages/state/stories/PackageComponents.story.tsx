import { useState } from "react";
import { createStore } from "../src/createStore";
import {
    Card,
    Container,
    Input,
    Button,
    ThemeProvider,
    Text,
    Stack,
    useTheme,
} from "@blade/ui";

export default {
    title: "State/Testing/CustomComponentTodoList",
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

const stackStyle = { width: "100%" };

export const TodoList = () => {
    const { todos, addTodo, removeTodo } = useTodo<TodoListState>();

    return (
        <ThemeProvider initialTheme="light">
            <Container title="Todo List" maxWidth={"md"}>
                <ThemeToggle />

                <Stack direction="column">
                    <InputArea onAdd={addTodo} />

                    <Stack
                        direction="column"
                        style={stackStyle} // ✅ Stable reference
                    >
                        {todos.map((todo) => (
                            <Card key={todo.name} fullWidth>
                                <Stack justify="space-around">
                                    <Text as="p">{todo.name}</Text>
                                    <Button onClick={() => removeTodo(todo)}>
                                        X
                                    </Button>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

const InputArea = ({ onAdd }: { onAdd: (todo: Todo) => void }) => {
    const [curTodo, setCurTodo] = useState("");

    return (
        <Stack>
            <Input
                size="md"
                value={curTodo}
                onChange={(e) => setCurTodo(e.target.value)}
            />
            <Button
                variant="outline"
                onClick={() => {
                    onAdd({
                        name: curTodo,
                        isCompleted: false,
                    });
                }}
            >
                +
            </Button>
        </Stack>
    );
};

const ThemeToggle = () => {
    const { toggleTheme } = useTheme();
    return <Button onClick={toggleTheme}>Toggle</Button>;
};
