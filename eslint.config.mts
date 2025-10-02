import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
    {
        ignores: ["eslint.config.*", "vite.config.*", "node_modules", "dist"],
    },
    {
        files: ["**/*.{ts,tsx,mts}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: ["./apps/web/tsconfig.eslint.json"],
                tsconfigRootDir: process.cwd(),
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooks,
        },
        settings: {
            react: { version: "detect" },
        },
        rules: {
            indent: ["error", 4],
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "@typescript-eslint/no-unused-vars": ["warn"],
            "react/react-in-jsx-scope": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
];
