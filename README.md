# 🌌 Blade

**Blade** is a collaborative design and prototyping platform — inspired by Figma and Notion — built as a capstone project to master **modern frontend engineering challenges**.

## 🚀 Features

- ⚡ Realtime collaboration (CRDT + WebSocket).
- 🌍 Offline-first editing with IndexedDB + Service Worker.
- 🧩 Plugin architecture (extend the editor with custom tools).
- 🎨 Component library (drag & drop reusable UI components).
- 📝 Version history with time-travel.
- ♿ Accessibility (WCAG AA compliance).
- 📦 Monorepo powered by pnpm.

## 📂 Monorepo Structure

```text
blade/
├── apps/       # Frontend & backend apps
│ ├── web/      # Main React + Vite app
│ └── server/   # (Optional) API + WebSocket server
├── packages/   # Shared libraries (UI, CRDT, plugins, state, utils)
├── tests/      # Integration & e2e tests
├── configs/    # Shared configs (eslint, prettier,tsconfig)
```

## 🛠 Getting Started

```bash

# Install dependencies
pnpm install

# Run web app
pnpm --filter @blade/web dev

```

Open http://localhost:5173 to view the app.

## 🤝 Contributing

See CONTRIBUTING.md
