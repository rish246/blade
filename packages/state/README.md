# 🧠 Blade State Library — API Design Document

## 📋 1. Overview

**Blade State** is a lightweight, type-safe state management library for React.
It provides an ergonomic API for creating and consuming stores within React components.
It is designed to:

- Be **local-first** (scoped to component or module),
- Be **framework-independent** (just React),
- Offer **typed selectors** and **actions**,
- Support **middleware extensions** (stretch goal),
- Work without external dependencies like Redux or Zustand.

---

## 🧩 2. Core Concepts

| Concept                    | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| **Store**                  | A container that holds and manages a state object.                      |
| **Selector**               | A function that extracts a portion of the state for usage.              |
| **Action**                 | A function that updates the state through the provided setter.          |
| **Middleware** _(stretch)_ | Functions that can intercept and enhance state updates (e.g., logging). |

---

## 🧪 3. Design Goals

| Goal              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| **Type Safety**   | Leverage TypeScript generics for accurate state typing.      |
| **Simplicity**    | Small API surface, inspired by Zustand.                      |
| **Performance**   | Components re-render only when their selected slice changes. |
| **Extensibility** | Middleware system for logging or debugging.                  |

---

## ⚙️ 4. Public API Specification

This section defines the **complete interface** of the Blade Local State Library.

---

### 🏗️ **`createStore(initializer: StoreInitializer, middlewares?: Middleware[]): UseStore`**

**Description:**
Creates a new store instance — an independent state container with its own lifecycle and subscription model.
Each store manages its internal state in memory and exposes a React hook (`useStore`) to access it.

---

#### **Signature**

```ts
function createStore<T extends object>(initializer: StoreInitializer<T>, middlewares?: Middleware<T>[]): UseStore<T>;
```

---

#### **Parameters**

| Parameter     | Type              | Required | Description                                                                                                                                              |
| ------------- | ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initializer` | `(set, get) => T` | ✅       | A function that defines the initial state and actions for the store. Receives two arguments — `set` (to update state) and `get` (to read current state). |
| `middlewares` | `Middleware<T>[]` | ❌       | An optional array of middleware functions that wrap the `set` method for side-effects (e.g., logging, persistence).                                      |

---

#### **Returns**

| Type          | Description                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| `UseStore<T>` | A typed React hook function used to access and select state from the created store. |

---

#### **Example**

```tsx
type CounterState = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

const useCounterStore = createStore<CounterState>((set, get) => ({
    count: 0,
    increment: () => set({ count: get().count + 1 }),
    decrement: () => set({ count: get().count - 1 }),
}));

// Usage in component
function Counter() {
    const count = useCounterStore((s) => s.count);
    const inc = useCounterStore((s) => s.increment);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={inc}>+</button>
        </div>
    );
}
```

---

### 🪝 **`useStore(selector?: Selector<T>): U`**

**Description:**
A React hook returned from `createStore`.
It allows React components to **subscribe to the store**, optionally selecting a subset of the state to avoid unnecessary re-renders.

---

#### **Signature**

```ts
type UseStore<T> = <U>(selector?: Selector<T>) => U;
```

---

#### **Parameters**

| Parameter  | Type              | Required | Description                                                                                                        |
| ---------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `selector` | `(state: T) => U` | ❌       | A function that extracts a slice or value from the store’s state. If omitted, the entire store object is returned. |

---

#### **Returns**

| Type | Description                                                                      |
| ---- | -------------------------------------------------------------------------------- |
| `U`  | The selected portion of the state, or the full state if no selector is provided. |

---

#### **Example**

```tsx
const open = useToggleStore((s) => s.open);
const toggle = useToggleStore((s) => s.toggle);
```

or, to access full state:

```tsx
const { open, toggle } = useToggleStore();
```

---

### 🧩 **`Middleware` (Stretch Goal)**

**Description:**
A middleware is a higher-order function that wraps the store’s internal `set` method to intercept, modify, or log state updates.
This pattern allows side-effects (like logging, persistence, or analytics) to be attached declaratively.

---

#### **Signature**

```ts
type Middleware<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => StoreSetter<T>;
```

---

#### **Parameters**

| Parameter | Type                  | Description                                |                                      |
| --------- | --------------------- | ------------------------------------------ | ------------------------------------ |
| `set`     | `(partial: Partial<T> | ((prev: T) => Partial<T>)) => void`        | Function used to update store state. |
| `get`     | `() => T`             | Function used to read current store state. |                                      |

---

#### **Returns**

| Type             | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `StoreSetter<T>` | A wrapped `set` function that replaces the store’s default state updater. |

---

#### **Example (Logger Middleware)**

```ts
const logger: Middleware<any> = (set, get) => (update) => {
    console.log("Prev State:", get());
    set(update);
    console.log("Next State:", get());
};

const useCounterStore = createStore(
    (set, get) => ({
        count: 0,
        increment: () => set({ count: get().count + 1 }),
    }),
    [logger],
);
```

**Behavior:**
Whenever `set` is called, `logger` prints the state before and after the update.

---

### 🧱 Supporting Types

```ts
type StoreSetter<T> = (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
type StoreGetter<T> = () => T;
type Selector<T> = (state: T) => any;
type StoreInitializer<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => T;
type UseStore<T> = <U>(selector?: Selector<T>) => U;
type Middleware<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => StoreSetter<T>;
```

---

### 🧠 Example: Putting it All Together

```tsx
import { createStore } from "@blade/state";

// 1. Define store
type ThemeState = {
    theme: "light" | "dark";
    toggleTheme: () => void;
};

const useThemeStore = createStore<ThemeState>((set, get) => ({
    theme: "light",
    toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
}));

// 2. Consume store
function ThemeToggle() {
    const theme = useThemeStore((s) => s.theme);
    const toggle = useThemeStore((s) => s.toggleTheme);
    return <button onClick={toggle}>Switch to {theme === "light" ? "Dark" : "Light"} Mode</button>;
}
```

---

✅ **End Result:**
This section now fully defines:

- the API surface (`createStore`, `useStore`, `Middleware`),
- the types behind it,
- parameter/return contracts, and
- concrete examples of usage.

---

## 🧱 5. Example Usage

### 🔹 Basic Counter Store

```tsx
import { createStore } from "@blade/state";

type CounterState = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

export const useCounterStore = createStore<CounterState>((set, get) => ({
    count: 0,
    increment: () => set({ count: get().count + 1 }),
    decrement: () => set({ count: get().count - 1 }),
}));
```

Usage:

```tsx
function Counter() {
    const count = useCounterStore((s) => s.count);
    const increment = useCounterStore((s) => s.increment);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
        </div>
    );
}
```

---

### 🔹 Toggle Component Example

```tsx
const useToggleStore = createStore((set, get) => ({
    open: false,
    toggle: () => set({ open: !get().open }),
}));

function ToggleButton() {
    const open = useToggleStore((s) => s.open);
    const toggle = useToggleStore((s) => s.toggle);

    return <button onClick={toggle}>{open ? "ON" : "OFF"}</button>;
}
```

---

### 🔹 Middleware Example (Stretch)

```tsx
const logger: Middleware<any> = (set, get) => (update) => {
    console.log("Prev:", get());
    set(update);
    console.log("Next:", get());
};

const useStore = createStore((set) => ({ count: 0, inc: () => set({ count: 1 }) }), [logger]);
```

---

## 📜 6. Type Definitions (Proposed)

```ts
type StoreSetter<T> = (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
type StoreGetter<T> = () => T;
type Selector<T> = (state: T) => any;
type StoreInitializer<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => T;
type Middleware<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => StoreSetter<T>;

type UseStore<T> = <U>(selector: Selector<T>) => U;
```

---

## 📊 7. UML Diagrams

### **7.1 High-Level Class Diagram**

```
+-----------------------------+
|        createStore          |
+-----------------------------+
| - state: T                  |
| - listeners: Set<Function>  |
| - set(partial: Partial<T>)  |
| - get(): T                  |
| - subscribe(listener)       |
+-----------------------------+
| + useStore(selector): U     |
+-----------------------------+
```

---

### **7.2 Component Interaction Diagram**

```
Component
   |
   | calls useStore(selector)
   v
createStore
   |
   | manages -> state
   | notifies -> listeners
   v
React re-renders Component
```

---

### **7.3 Middleware Interaction (Stretch)**

```
+----------------------+
|     Middleware[]     |
+----------+-----------+
           |
           v
     +-----------+
     |  set()    | ---> modifies state
     +-----------+
           |
           v
   +-------------------+
   |    State Object   |
   +-------------------+
```

---

## 🧩 8. Folder Structure (Proposed)

```
/packages/state
 ├── src/
 │    ├── index.ts
 │    ├── createStore.ts
 │    └── types.ts
 ├── tests/
 │    └── createStore.test.ts
 ├── README.md
 └── package.json
```

---

## ✅ 9. Deliverables (for Day 15)

| Deliverable              | Description                                        |
| ------------------------ | -------------------------------------------------- |
| 📘 `README.md`           | API design, examples, and UML diagrams (this file) |
| 🧱 `types.ts`            | Type definitions for store, selector, middleware   |
| ⚙️ `createStore.ts`      | Implementation (next day’s task)                   |
| 🧪 `createStore.test.ts` | Basic tests for store behavior                     |
| 🧩 `package.json`        | To build and import `@blade/state`                 |

---

## 🚀 10. Future Extensions

| Feature                   | Description                                        |
| ------------------------- | -------------------------------------------------- |
| 🧩 Persistence Middleware | Save state to localStorage or IndexedDB.           |
| 🔁 Devtools Integration   | Hook into React Devtools or custom debugging.      |
| 🪶 Async Actions          | Support for async updates (Promises, async/await). |
| 🔐 Context Integration    | Scoped store instances via context providers.      |

---
