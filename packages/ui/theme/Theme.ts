/**
 * 🎨 Theme Type — Manual Definition
 * ----------------------------------------------------------------------------
 * This describes the *shape* of all design tokens available in the system.
 * It is manually written to ensure type safety and flexibility, even if
 * the runtime theme objects change later.
 */

export type Theme = {
    colors: {
        bg: string; // Page background
        surface: string; // Card / elevated surfaces
        text: string; // Primary text
        muted: string; // Secondary text
        accent: string; // Brand or primary CTA
        success: string; // Success state
        warning: string; // Warning state
        error: string; // Error state
        none: string; // Empty color (no fill)
        transparent: string; // Transparent background
    };

    spacing: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };

    radii: {
        sm: string;
        md: string;
        lg: string;
        full: string;
    };

    typography: {
        fontFamily: string;

        // Font sizes
        fontSizeSm: string;
        fontSizeMd: string;
        fontSizeLg: string;
        fontSizeXl: string;
        fontSize2xl: string;
        fontSize3xl: string;

        // Line heights
        lineHeightSm: string;
        lineHeightMd: string;
        lineHeightLg: string;
        lineHeightXl: string;
        lineHeight2xl: string;
        lineHeight3xl: string;

        // Font weights
        fontWeightNormal: string;
        fontWeightMedium: string;
        fontWeightBold: string;
    };

    shadows: {
        sm: string;
        md: string;
        lg: string;
    };
};

// -----------------------------------------------------------------------------
// 🧩 Token category shorthand types
// -----------------------------------------------------------------------------

export type ColorToken =
    | "bg"
    | "surface"
    | "text"
    | "muted"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "none"
    | "transparent";

export type SpacingToken = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type RadiusToken = "sm" | "md" | "lg" | "full";

export type TypographyToken =
    | "fontFamily"
    | "fontSizeSm"
    | "fontSizeMd"
    | "fontSizeLg"
    | "fontSizeXl"
    | "fontSize2xl"
    | "fontSize3xl"
    | "lineHeightSm"
    | "lineHeightMd"
    | "lineHeightLg"
    | "lineHeightXl"
    | "lineHeight2xl"
    | "lineHeight3xl"
    | "fontWeightNormal"
    | "fontWeightMedium"
    | "fontWeightBold";

export type ShadowToken = "sm" | "md" | "lg";

// -----------------------------------------------------------------------------
// 🌗 Theme modes
// -----------------------------------------------------------------------------

export type ThemeMode = "light" | "dark";
