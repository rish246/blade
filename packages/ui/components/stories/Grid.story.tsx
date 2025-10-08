import React from "react";
import Grid from "../Grid";
import GridItem from "../GridItem";
import { ThemeProvider, useTheme } from "../../theme/theme-provider";
import Box from "../Box";
import Button from "../Button";

export default {
    title: "UI/Layout/Grid",
    tags: ["autodocs"],
};

// Helper item for visualization
const Item = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
        <Box
            p="md"
            rounded="sm"
            style={{
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.muted}`,
                textAlign: "center",
                fontWeight: 500,
                color: theme.colors.text,
            }}
        >
            {children}
        </Box>
    );
};

// Theme Wrapper for stories
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Box
            p="md"
            style={{
                background: theme.colors.bg,
                color: theme.colors.text,
                minHeight: "100vh",
            }}
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

/* ------------------------------------------------------------------
   🧱 Basic Grid
------------------------------------------------------------------ */
export const BasicGrid = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={3} gap="md">
                {[...Array(6)].map((_, i) => (
                    <Item key={i}>Item {i + 1}</Item>
                ))}
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   📏 Grid with Different Gaps
------------------------------------------------------------------ */
export const GridWithGaps = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={4} gap="lg">
                {[...Array(8)].map((_, i) => (
                    <Item key={i}>Gap {i + 1}</Item>
                ))}
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   🧩 Responsive Grid
------------------------------------------------------------------ */
export const ResponsiveGrid = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="md">
                {[...Array(8)].map((_, i) => (
                    <Item key={i}>Responsive {i + 1}</Item>
                ))}
            </Grid>
            <Box style={{ fontSize: "14px" }}>
                Resize the viewport to see columns adjust: 1 (sm), 2 (md), 4
                (lg)
            </Box>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   🧭 Grid Alignment
------------------------------------------------------------------ */
export const GridWithAlignment = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid
                columns={3}
                align="center"
                justify="between"
                gap="md"
                style={{ height: "300px" }}
            >
                <Item>A</Item>
                <Item>B</Item>
                <Item>C</Item>
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   📐 Row and Column Gaps
------------------------------------------------------------------ */
export const GridWithRowAndColGaps = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={3} rowGap="lg" colGap="sm">
                {[...Array(6)].map((_, i) => (
                    <Item key={i}>Item {i + 1}</Item>
                ))}
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   🧮 Column Spans
------------------------------------------------------------------ */
export const GridWithColumnSpans = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={4} gap="md">
                <GridItem colSpan={2}>
                    <Item>colSpan = 2</Item>
                </GridItem>
                <GridItem>
                    <Item>1</Item>
                </GridItem>
                <GridItem>
                    <Item>2</Item>
                </GridItem>
                <GridItem colSpan={3}>
                    <Item>colSpan = 3</Item>
                </GridItem>
                <GridItem>
                    <Item>3</Item>
                </GridItem>
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   🧱 Row Spans
------------------------------------------------------------------ */
export const GridWithRowSpans = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={3} gap="md">
                <GridItem rowSpan={2}>
                    <Item>rowSpan = 2</Item>
                </GridItem>
                <GridItem>
                    <Item>2</Item>
                </GridItem>
                <GridItem>
                    <Item>3</Item>
                </GridItem>
                <GridItem>
                    <Item>4</Item>
                </GridItem>
                <GridItem>
                    <Item>5</Item>
                </GridItem>
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   🧩 Nested Grids
------------------------------------------------------------------ */
export const NestedGrids = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Grid columns={2} gap="lg">
                <GridItem>
                    <Item>Outer 1</Item>
                </GridItem>

                <GridItem>
                    <Grid columns={2} gap="sm">
                        <Item>Inner 1</Item>
                        <Item>Inner 2</Item>
                        <Item>Inner 3</Item>
                        <Item>Inner 4</Item>
                    </Grid>
                </GridItem>
            </Grid>
        </ThemeWrapper>
    </ThemeProvider>
);

/* ------------------------------------------------------------------
   🔄 Wrap vs No Wrap
------------------------------------------------------------------ */
export const GridWrapBehavior = () => (
    <ThemeProvider>
        <ThemeWrapper>
            <Box>
                <Box m="sm" style={{ fontWeight: 600 }}>
                    wrap = true (default)
                </Box>
                <Grid columns={3} wrap gap="sm">
                    {[...Array(8)].map((_, i) => (
                        <Item key={i}>Item {i + 1}</Item>
                    ))}
                </Grid>

                <Box style={{ fontWeight: 600 }}>wrap = false</Box>
                <Grid
                    columns={3}
                    wrap={false}
                    gap="sm"
                    style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                    }}
                >
                    {[...Array(8)].map((_, i) => (
                        <Item key={i}>Item {i + 1}</Item>
                    ))}
                </Grid>
            </Box>
        </ThemeWrapper>
    </ThemeProvider>
);
