import React from "react";
import Stack from "../Stack";
import Text from "../Text";
import Box from "../Box";
import Button from "../Button";
import { ThemeProvider, useTheme } from "../../theme/theme-provider";

export default {
    title: "UI/Primitive/Stack",
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
                gap: "2rem",
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

export const HorizontalStack = () => (
    <Wrapper>
        <Stack gap="md">
            <Text as="h1">Title</Text>
            <Text as="h2">Title</Text>
            <Text as="h3">Title</Text>
            <Text as="h4">Title</Text>
            <Text as="h5">Title</Text>
            <Text as="h6">Title</Text>
        </Stack>
    </Wrapper>
);

export const HorizontalStackJustifyContentCenter = () => (
    <Wrapper>
        <Stack justify="center" gap="sm" style={{ width: "100%" }}>
            <Text as="h3">Left</Text>
            <Text as="h3">Center</Text>
            <Text as="h3">Right</Text>
        </Stack>
    </Wrapper>
);

export const HorizontalStackJustifyContentSpaceBetween = () => (
    <Wrapper>
        <Stack justify="space-between" gap="md" style={{ width: "100%" }}>
            <Text as="h3">Left</Text>
            <Text as="h3">Middle</Text>
            <Text as="h3">Right</Text>
        </Stack>
    </Wrapper>
);

export const HorizontalStackCustomStyles = () => (
    <Wrapper>
        <Stack
            gap="sm"
            style={{
                padding: "1rem",
            }}
        >
            <Text as="h3">Styled</Text>
            <Text as="h3">Stack</Text>
            <Text as="h3">Example</Text>
        </Stack>
    </Wrapper>
);

export const HorizontalStackCustomGap = () => (
    <Wrapper>
        <Stack gap="4rem">
            <Text as="h3">Big</Text>
            <Text as="h3">Gap</Text>
            <Text as="h3">Stack</Text>
        </Stack>
    </Wrapper>
);

export const VerticalStack = () => (
    <Wrapper>
        <Stack direction="column" gap="sm">
            <Text as="h2">Vertical 1</Text>
            <Text as="h2">Vertical 2</Text>
            <Text as="h2">Vertical 3</Text>
        </Stack>
    </Wrapper>
);

export const VerticalStackAlignItemsCenter = () => (
    <Wrapper>
        <Stack
            direction="column"
            align="center"
            gap="xs"
            style={{ height: "200px" }}
        >
            <Text as="h3">Top</Text>
            <Text as="h3">Middle</Text>
            <Text as="h3">Bottom</Text>
        </Stack>
    </Wrapper>
);

export const VerticalStackWithButtons = () => (
    <Wrapper>
        <Stack direction="column" gap="md" align="center">
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
        </Stack>
    </Wrapper>
);
