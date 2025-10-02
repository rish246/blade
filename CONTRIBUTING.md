## 📄 `CONTRIBUTING.md`

# Contributing to Blade

Thanks for your interest in contributing to Blade! 🎉

## 📦 Setup

1. Clone the repo:
    ```bash
    git clone https://github.com/YOUR_USERNAME/blade.git
    cd blade
    ```

### Install dependencies:

```bash
pnpm install
```

### Run the dev server:

```bash
pnpm --filter @blade/web dev
```

### 🔀 Branching

```bash
main → stable branch

dev → active development

feature branches → feat/<feature-name>

bugfix branches → fix/<bug-description>

```

### 🧪 Testing

Run tests before committing:

```bash
pnpm test
```

### ✅ Commit Guidelines

Follow Conventional Commits
:

_feat_: add new component
_fix_: resolve offline sync bug
_docs_: update README

### 🙌 Pull Requests

1. Fork the repo, create a branch.

2. Make changes and add tests.

3. Open PR against dev.

4. Ensure CI checks pass.
