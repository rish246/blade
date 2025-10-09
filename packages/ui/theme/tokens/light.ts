import { Theme } from "../Theme";
import { baseTheme } from "./base";

/**
 * 🌞 Light Theme
 * --------------------------------------------------------------------------
 * The default color scheme — bright surfaces, dark text, soft shadows.
 * Extends the base theme with light-mode specific color values.
 */
export const lightTheme: Theme = {
    ...baseTheme,

    colors: {
        ...baseTheme.colors,

        // Core backgrounds
        bg: "#ffffff", // Page background
        surface: "#f9fafb", // Card / surfaces

        // Text
        text: "#111827", // Primary text (near-black)
        muted: "#6b7280", // Secondary text

        // Brand / accent
        accent: "#2563eb", // Blue-600 (vivid brand color)
        // Semantic states
        success: "#10b981", // Green-500
        warning: "#f59e0b", // Amber-500
        error: "#ef4444", // Red-500

        // Utility

        none: "",
        transparent: "transparent",
    },
} as const;

export type LightTheme = typeof lightTheme;
