export const tokens = {
    colors: {
        bg: "#ffffff", // page background
        surface: "#f9fafb", // card / elevated surfaces
        text: "#111827", // primary text
        muted: "#6b7280", // secondary text
        accent: "#2563eb", // brand / CTA buttons
        success: "#10b981", // success state
        warning: "#f59e0b", // warning state
        error: "#ef4444", // error state
        none: "",
        transparent: "transparent",
    },

    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
    },

    radii: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        full: "9999px",
    },

    typography: {
        fontFamily: "'Inter', sans-serif",

        // Font sizes - now includes heading sizes
        fontSizeSm: "14px",
        fontSizeMd: "16px",
        fontSizeLg: "20px",
        fontSizeXl: "24px", // ✅ Added for h3
        fontSize2xl: "32px", // ✅ Added for h2
        fontSize3xl: "40px", // ✅ Added for h1

        // Line heights - now includes heading line heights
        lineHeightSm: "20px",
        lineHeightMd: "24px",
        lineHeightLg: "28px",
        lineHeightXl: "32px", // ✅ Added for h3
        lineHeight2xl: "40px", // ✅ Added for h2
        lineHeight3xl: "48px", // ✅ Added for h1

        // Font weights
        fontWeightNormal: "400",
        fontWeightMedium: "500",
        fontWeightBold: "700",
    },

    shadows: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.15)",
    },
} as const;

// Types for autocompletion
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type RadiusToken = keyof typeof tokens.radii;
export type TypographyToken = keyof typeof tokens.typography;
export type ShadowToken = keyof typeof tokens.shadows;
export type TokenCategory = keyof typeof tokens;
