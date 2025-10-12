import React from "react";
import Button from "../components/Button";
import { ThemeProvider, useTheme } from "../theme/theme-provider";
import Box from "../components/Box";

// -----------------------------------------------------------------------------
// 🔆 Theme Wrapper — Provides theme context + toggle switch for stories
// -----------------------------------------------------------------------------
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider initialTheme="light">
            <div
                style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <ThemeToggle />
                {children}
            </div>
        </ThemeProvider>
    );
};

const ThemeToggle = () => {
    const { themeName, toggleTheme } = useTheme();
    return (
        <Button
            variant="outline"
            onClick={toggleTheme}
            style={{ alignSelf: "flex-start" }}
        >
            Switch to {themeName === "light" ? "dark" : "light"} mode
        </Button>
    );
};

// -----------------------------------------------------------------------------
// 📘 Story Metadata
// -----------------------------------------------------------------------------
export default {
    title: "UI/Primitive/Button",
    component: Button,
};

// -----------------------------------------------------------------------------
// 🧱 Stories
// -----------------------------------------------------------------------------

export const DefaultButton = () => (
    <ThemeWrapper>
        <Button>Click Me</Button>
    </ThemeWrapper>
);

export const Variants = () => (
    <ThemeWrapper>
        <Box
            style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
            }}
        >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
        </Box>
    </ThemeWrapper>
);

export const Sizes = () => (
    <ThemeWrapper>
        <Box
            style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
            }}
        >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </Box>
    </ThemeWrapper>
);

export const FullWidthButton = () => (
    <ThemeWrapper>
        <Box style={{ width: "100%" }}>
            <Button fullWidth>Full Width</Button>
        </Box>
    </ThemeWrapper>
);

export const DisabledAndLoading = () => (
    <ThemeWrapper>
        <Box style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button disabled>Disabled</Button>
            <Button loading>Loading...</Button>
            <Button loading loadingText="Please wait...">
                Submit
            </Button>
            <Button disabled loading>
                Disabled + Loading
            </Button>
        </Box>
    </ThemeWrapper>
);

export const WithIcons = () => (
    <ThemeWrapper>
        <Box style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button>
                <span role="img" aria-label="bolt">
                    ⚡
                </span>{" "}
                Flash
            </Button>
            <Button variant="outline">
                <span role="img" aria-label="download">
                    ⬇️
                </span>{" "}
                Download
            </Button>
            <Button variant="danger">
                <span role="img" aria-label="trash">
                    🗑️
                </span>{" "}
                Delete
            </Button>
        </Box>
    </ThemeWrapper>
);

export const InteractiveStates = () => (
    <ThemeWrapper>
        <Box style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button>Hover me</Button>
            <Button variant="outline">Focus me</Button>
            <Button variant="danger">Active me</Button>
        </Box>
    </ThemeWrapper>
);

export const CustomStyling = () => (
    <ThemeWrapper>
        <Box style={{ display: "flex", gap: "12px" }}>
            <Button style={{ backgroundColor: "#6d28d9", color: "white" }}>
                Custom Color
            </Button>
            <Button
                variant="secondary"
                style={{
                    border: "2px dashed #10b981",
                    color: "#10b981",
                    background: "transparent",
                }}
            >
                Dashed Border
            </Button>
        </Box>
    </ThemeWrapper>
);

export const LinkButton = () => (
    <ThemeWrapper>
        <Box style={{ display: "flex", gap: "12px" }}>
            <Button as="a" href="https://example.com" target="_blank">
                External Link
            </Button>
            <Button as="a" href="#section">
                Jump to Section
            </Button>
        </Box>
    </ThemeWrapper>
);
