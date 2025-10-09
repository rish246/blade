import { Theme } from "../Theme";
import { baseTheme } from "./base";

/**
 * 🌚 Dark Theme
 * --------------------------------------------------------------------------
 * A deep, high-contrast variant optimized for low-light environments.
 * Extends the base theme with dark-mode specific color values.
 */
export const darkTheme: Theme = {
    ...baseTheme,

    colors: {
        ...baseTheme.colors,

        // Core backgrounds
        bg: "#0f172a", // Slate-900 — main background
        surface: "#1e293b", // Slate-800 — elevated surfaces

        // Text
        text: "#f1f5f9", // Light text
        muted: "#94a3b8", // Muted / secondary text

        // Brand / accent
        accent: "#3b82f6", // Blue-500

        // Semantic states
        success: "#22c55e", // Green-500
        warning: "#facc15", // Yellow-400
        error: "#f87171", // Red-400

        none: "",
        transparent: "transparent",
    },
} as const;

export type DarkTheme = typeof darkTheme;
