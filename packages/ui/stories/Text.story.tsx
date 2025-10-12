import React from "react";
import Text from "../components/Text";
import Box from "../components/Box";
import Button from "../components/Button";
import { ThemeProvider, useTheme } from "../theme/theme-provider";

export default {
    title: "UI/Primitive/Text",
};

/** 🌓 Theme Toggle Button */
const ThemeToggle: React.FC = () => {
    const { themeName, toggleTheme } = useTheme();
    return (
        <Button variant="outline" onClick={toggleTheme}>
            Switch to {themeName === "light" ? "Dark" : "Light"} Theme
        </Button>
    );
};

/** 💠 Common Wrapper for stories */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="light">
        <Box
            p="xl"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: "2.2rem",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ThemeToggle />
            {children}
        </Box>
    </ThemeProvider>
);

// ========================================
// 🧱 Stories
// ========================================

export const BasicText = () => (
    <Wrapper>
        <Text>This is a basic text element.</Text>
    </Wrapper>
);

export const NestedText = () => (
    <Wrapper>
        <Text>
            Parent Text —{" "}
            <Text as="span" color="accent" weight="bold">
                Nested Accent Text
            </Text>
        </Text>
    </Wrapper>
);

export const Headings = () => (
    <Wrapper>
        <Box
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
            <Text as="h1">Heading 1</Text>
            <Text as="h2">Heading 2</Text>
            <Text as="h3">Heading 3</Text>
            <Text as="h4">Heading 4</Text>
            <Text as="h5">Heading 5</Text>
            <Text as="h6">Heading 6</Text>
        </Box>
    </Wrapper>
);

export const ColoredText = () => (
    <Wrapper>
        <Box
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
            <Text color="accent">Accent text color</Text>
            <Text color="error">Error text color</Text>
            <Text color="success">Success text color</Text>
            <Text color="muted">Muted text color</Text>
        </Box>
    </Wrapper>
);

export const TypographyVariants = () => (
    <Wrapper>
        <Box
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
            <Text size="sm" weight="medium">
                Small text, regular weight
            </Text>
            <Text size="md" weight="medium">
                Medium text, medium weight
            </Text>
            <Text size="lg" weight="bold">
                Large text, bold weight
            </Text>
            <Text size="xl" weight="bold">
                Extra large text, semibold
            </Text>
        </Box>
    </Wrapper>
);

export const Alignment = () => (
    <Wrapper>
        <Box style={{ width: "400px" }}>
            <Text align="left">Left aligned text</Text>
            <Text align="center">Center aligned text</Text>
            <Text align="right">Right aligned text</Text>
            <Text align="justify">
                Justified text: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
            </Text>
        </Box>
    </Wrapper>
);

export const CustomStyles = () => (
    <Wrapper>
        <Text
            style={{
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "var(--accent-color, #2563eb)",
            }}
            weight="bold"
            size="lg"
        >
            Custom styled text with inline overrides
        </Text>
    </Wrapper>
);

export const DarkModeText = () => (
    <ThemeProvider initialTheme="dark">
        <Box
            p="xl"
            style={{
                minHeight: "100vh",
                backgroundColor: "var(--background-color, #111827)",
                color: "var(--text-color, #fff)",
            }}
        >
            <Text as="h2">Dark Theme Example</Text>
            <Text color="muted">
                Muted color adjusts automatically in dark mode.
            </Text>
            <Text color="accent">Accent color in dark mode.</Text>
        </Box>
    </ThemeProvider>
);
