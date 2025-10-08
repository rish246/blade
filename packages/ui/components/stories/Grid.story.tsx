import React from "react";
import Grid from "../Grid";
import GridItem from "../GridItem";

export default {
    title: "UI/Layout/Grid",
};

// Simple helper box for visualization
const Item = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: "#e3f2fd",
            border: "1px solid #90caf9",
            borderRadius: "4px",
            padding: "12px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 500,
        }}
    >
        {children}
    </div>
);

//
// 🧱 Basic Grid
//
export const BasicGrid = () => (
    <Grid
        columns={3}
        gap="md"
        style={{ background: "#fafafa", padding: "16px" }}
    >
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
    </Grid>
);

//
// 📏 Grid with Gaps
//
export const GridWithGaps = () => (
    <Grid
        columns={4}
        gap="lg"
        style={{
            background: "#f9fbe7",
            border: "1px solid #cddc39",
            padding: "16px",
        }}
    >
        {Array.from({ length: 8 }).map((_, i) => (
            <Item key={i}>Item {i + 1}</Item>
        ))}
    </Grid>
);

//
// 🧩 Responsive Grid
//
export const ResponsiveGrid = () => (
    <Grid
        columns={{ sm: 1, md: 2, lg: 4 }}
        gap="md"
        style={{
            background: "#fffde7",
            border: "1px solid #ffeb3b",
            padding: "16px",
        }}
    >
        {Array.from({ length: 6 }).map((_, i) => (
            <Item key={i}>Item {i + 1}</Item>
        ))}
    </Grid>
);

//
// 🧱 Grid with Alignment
//
export const GridWithAlignment = () => (
    <Grid
        columns={3}
        align="center"
        justify="between"
        gap="md"
        style={{
            background: "#fce4ec",
            border: "1px solid #f48fb1",
            padding: "16px",
            height: "300px",
        }}
    >
        <Item>A</Item>
        <Item>B</Item>
        <Item>C</Item>
    </Grid>
);

//
// 📐 Grid with Different Row and Column Gaps
//
export const GridWithRowAndColGaps = () => (
    <Grid
        columns={3}
        rowGap="lg"
        colGap="sm"
        style={{
            background: "#f3e5f5",
            border: "1px solid #ce93d8",
            padding: "16px",
        }}
    >
        {Array.from({ length: 6 }).map((_, i) => (
            <Item key={i}>Item {i + 1}</Item>
        ))}
    </Grid>
);

//
// 🧮 Grid with Column Spans
//
export const GridWithColumnSpans = () => (
    <Grid
        columns={4}
        gap="md"
        style={{
            background: "#e8f5e9",
            border: "1px solid #81c784",
            padding: "16px",
        }}
    >
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
);

//
// 🧭 Grid with Row Spans
//
export const GridWithRowSpans = () => (
    <Grid
        columns={3}
        gap="md"
        style={{
            background: "#f1f8e9",
            border: "1px solid #aed581",
            padding: "16px",
        }}
    >
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
);

//
// 🧱 Nested Grids
//
export const NestedGrids = () => (
    <Grid
        columns={2}
        gap="lg"
        style={{
            background: "#fbe9e7",
            border: "1px solid #ffab91",
            padding: "16px",
        }}
    >
        <GridItem>
            <Item>Outer 1</Item>
        </GridItem>

        <GridItem>
            <Grid
                columns={2}
                gap="sm"
                style={{
                    background: "#ffffff",
                    border: "1px solid #ccc",
                    padding: "8px",
                }}
            >
                <Item>Inner 1</Item>
                <Item>Inner 2</Item>
                <Item>Inner 3</Item>
                <Item>Inner 4</Item>
            </Grid>
        </GridItem>
    </Grid>
);

//
// 🔄 Grid Wrap vs No Wrap
//
export const GridWrapBehavior = () => (
    <>
        <h4 style={{ marginBottom: "8px" }}>wrap = true (default)</h4>
        <Grid
            columns={3}
            wrap
            style={{
                background: "#e0f7fa",
                padding: "16px",
                marginBottom: "24px",
            }}
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <Item key={i}>Item {i + 1}</Item>
            ))}
        </Grid>

        <h4 style={{ marginBottom: "8px" }}>wrap = false</h4>
        <Grid
            columns={3}
            wrap={false}
            style={{
                background: "#fce4ec",
                padding: "16px",
                overflowX: "auto",
                border: "1px solid #f48fb1",
            }}
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <Item key={i}>Item {i + 1}</Item>
            ))}
        </Grid>
    </>
);
