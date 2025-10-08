import React from "react";
import Box from "../Box";
import { ThemeProvider, useTheme } from "../../theme/theme-provider";

// -----------------------------------------------------------------------------
// A small helper component that wraps stories with ThemeProvider and
// includes a theme toggle button.
// -----------------------------------------------------------------------------
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider initialTheme="light">
            <ThemeToggle />
            <div style={{ marginTop: "16px" }}>{children}</div>
        </ThemeProvider>
    );
};

// Simple theme toggle button component
const ThemeToggle = () => {
    const { themeName, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: "none",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "14px",
            }}
        >
            Switch to {themeName === "light" ? "dark" : "light"} mode
        </button>
    );
};

// -----------------------------------------------------------------------------
// 📘 Storybook Metadata
// -----------------------------------------------------------------------------
export default {
    title: "UI/Primitive/Box",
};

// -----------------------------------------------------------------------------
// 🧱 Stories
// -----------------------------------------------------------------------------

export const BoxWithOneChild = () => (
    <ThemeWrapper>
        <Box p="md" bg="surface" color="text">
            Click Me
        </Box>
    </ThemeWrapper>
);

export const BoxWithMultipleChildren = () => (
    <ThemeWrapper>
        <Box bg="surface" color="text" p="md">
            First Child
            <Box bg="accent" color="onAccent" p="sm" m="sm">
                Second
            </Box>
        </Box>
    </ThemeWrapper>
);

export const BoxWithProps = () => (
    <ThemeWrapper>
        <Box
            bg="error"
            color="surface"
            style={{
                border: "1px solid black",
            }}
            p="md"
            m="md"
        >
            First Child
            <Box bg="accent" color="onAccent" p="sm" m="sm">
                Second
            </Box>
        </Box>
    </ThemeWrapper>
);

export const BoxWithWidthAndHeight = () => (
    <ThemeWrapper>
        <Box
            bg="accent"
            color="onAccent"
            style={{
                border: "1px solid black",
            }}
            w="100%"
            h={200}
            p="lg"
        >
            First Child
            <Box bg="surface" color="text" h="100%" p="md" m="sm">
                Second
            </Box>
        </Box>
    </ThemeWrapper>
);

export const BoxWithPaddingAndMargins = () => (
    <ThemeWrapper>
        <Box
            bg="surface"
            color="text"
            style={{
                border: "1px solid black",
            }}
            p="lg"
            m="lg"
        >
            First Child
            <Box bg="accent" color="onAccent" h={200} p="md">
                Second
            </Box>
        </Box>
    </ThemeWrapper>
);
