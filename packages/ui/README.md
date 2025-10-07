# 🧩 @blade/ui

A lightweight, composable, and developer-friendly **React + TypeScript UI library** built with **Tailwind CSS**.  
The library provides reusable, theme-aware building blocks — including **Box**, **Card**, **Input**, **Modal**, **Stack**, **Text**, and **Button** — all designed for speed, consistency, and flexibility.

---

## 🚀 Features

- ⚡ **Minimal and fast** – optimized for modern React setups
- 🧱 **Composable** – components designed to nest and combine seamlessly
- 💅 **TypeScript-first** – complete type safety with strong IntelliSense
- 🎨 **Tailwind-powered** – lightweight, utility-first styling
- 🧩 **Monorepo-ready** – easily integrates within design systems or internal UIs

---

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @blade/ui

# or with npm
npm install @blade/ui

# or with yarn
yarn add @blade/ui
```

Ensure you have **Tailwind CSS** configured in your project.  
If not, follow [Tailwind’s setup guide](https://tailwindcss.com/docs/guides/create-react-app).

---

## 🧱 Components Overview

### 🟣 Box

The `Box` component provides flexible layout control with padding, margin, and background options.

```tsx
export const BoxWithPaddingAndMargins = () => (
    <Box
        bg={"error"}
        color={"accent"}
        style={{
            border: "1px solid black",
        }}
        p={"md"}
        m={"lg"}
    >
        First Child
        <Box bg="accent" h={500} p="lg">
            Second
        </Box>
    </Box>
);
```

✅ **Key Props**

- `bg`: Background color (e.g., `"primary"`, `"error"`, `"accent"`)
- `color`: Text color
- `p`: Padding (`"sm" | "md" | "lg"`)
- `m`: Margin (`"sm" | "md" | "lg"`)
- `style`: Inline styles for custom CSS

---

### 🟣 Card

The `Card` component supports headers, media, and footers, perfect for structured content.

```tsx
<Card variant="elevated" header={<strong>Cute Kitten</strong>} footer="Adopt one today!" media={<img src="https://placekitten.com/400/200" alt="Kitten" style={{ width: "100%", display: "block" }} />}>
    This card demonstrates a media section with text below.
</Card>
```

✅ **Key Props**

- `variant`: `"flat"` | `"outlined"` | `"elevated"`
- `header`: JSX content rendered at the top
- `footer`: Footer text or JSX
- `media`: Image, video, or any media node

---

### 🟣 Input

The `Input` component supports labels, placeholders, and password visibility toggles.

```tsx
<Input type="password" label="Password" placeholder="••••••••" showPasswordToggle />
```

✅ **Key Props**

- `type`: Input type (e.g., `"text"`, `"password"`)
- `label`: Field label
- `placeholder`: Placeholder text
- `showPasswordToggle`: Toggles password visibility

---

### 🟣 Modal

A flexible modal dialog with header, footer, and form-friendly setup.

```tsx
<Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="User Registration"
    footer={
        <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
            <Button variant="primary" type="submit" form="registration-form">
                Submit
            </Button>
        </>
    }
/>
```

✅ **Key Props**

- `isOpen`: Controls visibility
- `onClose`: Close handler
- `title`: Modal title text
- `footer`: Footer JSX (buttons, actions, etc.)

---

### 🟣 Stack

The `Stack` component arranges children vertically or horizontally with alignment control.

```tsx
<Stack direction="column" align="center">
    <Text as="h1">Title</Text>
    <Text as="h2">Title</Text>
    <Text as="h3">Title</Text>
    <Text as="h4">Title</Text>
    <Text as="h5">Title</Text>
    <Text as="h6">Title</Text>
</Stack>
```

✅ **Key Props**

- `direction`: `"row"` | `"column"`
- `align`: `"start"` | `"center"` | `"end"`
- `gap`: `"none"` | `"sm"` | `"md"` | `"lg"`

---

### 🟣 Text

The `Text` component provides semantic typography with variants for headings and body text.

```tsx
export const CustomStyleText = () => (
    <Box>
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Box>
);
```

✅ **Key Props**

- `as`: Defines the HTML tag (e.g., `"h1"`, `"p"`, `"span"`)
- `variant`: `"title"`, `"subtitle"`, `"body"`, `"caption"`
- `color`: Text color variant

---

## 🧠 Development

To run locally in your monorepo:

```bash
pnpm dev
```

To explore stories via **Ladle**:

```bash
pnpm dlx ladle serve
```

---

## 🧰 Directory Structure

```
packages/ui/
│
├── components/
│   ├── Box/
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   ├── Stack/
│   ├── Text/
│   ├── Button/
│   └── index.ts
│
├── stories/            # Ladle stories
├── index.tsx           # Exports all components
└── README.md
```

---

## 🧑‍💻 Author

**Rishabh Katna**  
Senior Engineer @ Qualcomm | React & UI Systems Developer  
[LinkedIn](https://linkedin.com/in/rishabhkatna)

---

## 🪄 License

Licensed under the **MIT License**.
