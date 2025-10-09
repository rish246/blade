import React, { useState } from "react";
import Card from "../Card";
import Box from "../Box";
import Button from "../Button";
import { ThemeProvider, useTheme } from "../../theme/theme-provider";

export default {
    title: "UI/Core/Card",
    tags: ["autodocs"],
};

/** Helper wrapper to make stories theme-aware */
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Box
            p="md"
            style={{ backgroundColor: theme.colors.bg, minHeight: "100vh" }}
        >
            <Button
                variant="secondary"
                onClick={toggleTheme}
                style={{ marginBottom: "1rem" }}
            >
                Toggle Theme
            </Button>
            {children}
        </Box>
    );
};

/* ----------------- BASIC VARIANTS ----------------- */

export const Default = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card>This is a simple card with default styling.</Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const Elevated = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card variant="elevated">
                This is an elevated card with a shadow.
            </Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const Outlined = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card variant="outlined">
                This is an outlined card with a subtle border.
            </Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const Filled = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card variant="filled">
                This is a filled card with a solid surface background.
            </Card>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ----------------- STRUCTURED CARDS ----------------- */

export const WithHeaderAndFooter = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card
                variant="outlined"
                header={<strong>Card Header</strong>}
                footer={<em>Card Footer</em>}
            >
                This card includes a header and footer for structured content.
            </Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const WithMedia = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card
                variant="elevated"
                header={<strong>Cute Kitten</strong>}
                footer="Adopt one today!"
                media={
                    <img
                        src="https://placekitten.com/400/200"
                        alt="Kitten"
                        style={{
                            width: "100%",
                            display: "block",
                            objectFit: "cover",
                            borderRadius: "inherit",
                        }}
                    />
                }
            >
                This card demonstrates a media section with text below.
            </Card>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ----------------- INTERACTIVE STATES ----------------- */

export const Hoverable = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card hoverable>Hover over this card to see the hover effect.</Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const Clickable = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card hoverable onClick={() => alert("Card clicked!")}>
                This card is clickable — try clicking it!
            </Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const Loading = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card loading>You shouldn’t see this text — card is loading.</Card>
        </ThemeWrapper>
    </ThemeProvider>
);

export const Disabled = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Card disabled>This card is disabled and non-interactive.</Card>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ----------------- SHOWCASE ALL VARIANTS ----------------- */

export const AllVariants = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Box style={{ display: "grid", gap: "1rem" }}>
                <Card variant="default">Default</Card>
                <Card variant="elevated">Elevated</Card>
                <Card variant="outlined">Outlined</Card>
                <Card variant="filled">Filled</Card>
            </Box>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ----------------- INTERACTIVE PLAYGROUND ----------------- */

export const Playground = () => {
    const [variant, setVariant] = useState<
        "default" | "elevated" | "outlined" | "filled"
    >("default");
    const [hoverable, setHoverable] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <ThemeProvider>
            <ThemeWrapper>
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Box>
                        <label>
                            Variant:&nbsp;
                            <select
                                value={variant}
                                onChange={(e) =>
                                    setVariant(e.target.value as any)
                                }
                            >
                                <option value="default">Default</option>
                                <option value="elevated">Elevated</option>
                                <option value="outlined">Outlined</option>
                                <option value="filled">Filled</option>
                            </select>
                        </label>
                    </Box>

                    <Box>
                        <label>
                            <input
                                type="checkbox"
                                checked={hoverable}
                                onChange={(e) => setHoverable(e.target.checked)}
                            />
                            &nbsp;Hoverable
                        </label>
                    </Box>

                    <Box>
                        <label>
                            <input
                                type="checkbox"
                                checked={disabled}
                                onChange={(e) => setDisabled(e.target.checked)}
                            />
                            &nbsp;Disabled
                        </label>
                    </Box>

                    <Box>
                        <label>
                            <input
                                type="checkbox"
                                checked={loading}
                                onChange={(e) => setLoading(e.target.checked)}
                            />
                            &nbsp;Loading
                        </label>
                    </Box>

                    <Card
                        variant={variant}
                        hoverable={hoverable}
                        disabled={disabled}
                        loading={loading}
                    >
                        This is a dynamic Card with variant:{" "}
                        <strong>{variant}</strong>
                    </Card>
                </Box>
            </ThemeWrapper>
        </ThemeProvider>
    );
};

export const PaddingVariants = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Box
                style={{
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
            >
                <Card padding="none">
                    <strong>Padding: none</strong>
                    <p>No padding — content touches edges.</p>
                </Card>

                <Card padding="sm">
                    <strong>Padding: sm</strong>
                    <p>Small padding for compact layouts.</p>
                </Card>

                <Card padding="md">
                    <strong>Padding: md</strong>
                    <p>Default padding for general use.</p>
                </Card>

                <Card padding="lg">
                    <strong>Padding: lg</strong>
                    <p>Larger padding for spacious layouts.</p>
                </Card>

                <Card padding="xl">
                    <strong>Padding: xl</strong>
                    <p>Extra large padding for emphasis or empty states.</p>
                </Card>
            </Box>
        </ThemeWrapper>
    </ThemeProvider>
);
