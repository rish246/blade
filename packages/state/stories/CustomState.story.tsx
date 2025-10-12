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
