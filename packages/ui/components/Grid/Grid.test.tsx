import { act } from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Grid from ".";
import GridItem from "../GridItem";

const setScreenWidth = (width: number) => {
    act(() => {
        (window as any).innerWidth = width;
        window.dispatchEvent(new Event("resize"));
    });
};
describe("Grid Component", () => {
    beforeEach(() => {
        cleanup();
        setScreenWidth(1024);
    });

    it("renders children correctly", () => {
        render(
            <Grid columns={3}>
                <GridItem>1</GridItem>
                <GridItem>2</GridItem>
                <GridItem>3</GridItem>
            </Grid>,
        );
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("applies default grid styles", () => {
        render(<Grid columns={3}>Child</Grid>);
        const el = screen.getByText("Child");
        expect(el).toHaveStyle({
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
        });
    });

    it("applies gap correctly", () => {
        render(
            <Grid columns={2} gap="md">
                GapTest
            </Grid>,
        );
        const el = screen.getByText("GapTest");
        expect(el).toHaveStyle({
            gap: "16px",
        });
    });

    it("applies rowGap and colGap correctly", () => {
        render(
            <Grid columns={2} rowGap="lg" colGap="sm">
                GapTest
            </Grid>,
        );
        const el = screen.getByText("GapTest");
        expect(el).toHaveStyle({
            rowGap: "24px",
            columnGap: "8px",
        });
    });

    it("applies alignment and justification props", () => {
        render(
            <Grid columns={3} align="center" justify="between">
                AlignTest
            </Grid>,
        );
        const el = screen.getByText("AlignTest");
        expect(el).toHaveStyle({
            alignItems: "center",
            justifyContent: "space-between",
        });
    });

    it("sets grid-auto-flow based on wrap", () => {
        const { rerender } = render(
            <Grid columns={3} wrap>
                WrapTrue
            </Grid>,
        );
        const el = screen.getByText("WrapTrue");
        expect(el).toHaveStyle({
            gridAutoFlow: "row",
        });

        rerender(
            <Grid columns={3} wrap={false}>
                WrapFalse
            </Grid>,
        );
        expect(el).toHaveStyle({
            gridAutoFlow: "column",
        });
    });

    it("merges custom inline styles", () => {
        render(
            <Grid columns={3} style={{ background: "red", gap: "10px" }}>
                Styled
            </Grid>,
        );
        const el = screen.getByText("Styled");
        expect(el).toHaveStyle({
            background: "red",
            gap: "10px",
        });
    });

    it("supports responsive columns via breakpoints", async () => {
        render(<Grid columns={{ sm: 1, md: 2, lg: 4 }}>Responsive</Grid>);
        const el = screen.getByText("Responsive");

        setScreenWidth(500);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(1, 1fr)"),
        );

        setScreenWidth(800);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(2, 1fr)"),
        );

        setScreenWidth(1200);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(4, 1fr)"),
        );
    });

    it("falls back to full width if no responsive match", async () => {
        render(<Grid columns={{ sm: 1 }}>Fallback</Grid>);
        setScreenWidth(1600);
        const el = screen.getByText("Fallback");
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(1, 1fr)"),
        );
    });

    it("handles invalid props gracefully", () => {
        render(
            // @ts-expect-error invalid prop for testing
            <Grid columns="invalid">Invalid</Grid>,
        );
        const el = screen.getByText("Invalid");
        expect(el.style.display).toBe("grid");
    });

    it("passes through additional HTML props", () => {
        render(
            <Grid data-testid="grid" role="region" columns={2}>
                Region
            </Grid>,
        );
        const el = screen.getByTestId("grid");
        expect(el.getAttribute("role")).toBe("region");
    });

    it("cleans up resize listener on unmount", () => {
        const removeListener = vi.spyOn(window, "removeEventListener");
        const { unmount } = render(
            <Grid columns={{ sm: 1, md: 2 }}>Cleanup</Grid>,
        );
        unmount();
        expect(removeListener).toHaveBeenCalledWith(
            "resize",
            expect.any(Function),
        );
    });
});

describe("GridItem Component", () => {
    it("applies colSpan and rowSpan styles", () => {
        render(
            <Grid columns={3}>
                <GridItem colSpan={2} rowSpan={3}>
                    Item
                </GridItem>
            </Grid>,
        );
        const item = screen.getByText("Item");
        expect(item).toHaveStyle({
            gridColumn: "span 2",
            gridRow: "span 3",
        });
    });

    it("applies colStart and rowStart styles", () => {
        render(
            <Grid columns={3}>
                <GridItem colStart={2} rowStart={3}>
                    Item2
                </GridItem>
            </Grid>,
        );
        const item = screen.getByText("Item2");
        expect(item).toHaveStyle({
            gridColumnStart: "2",
            gridRowStart: "3",
        });
    });

    it("merges custom styles for GridItem", () => {
        render(
            <Grid columns={3}>
                <GridItem
                    style={{ backgroundColor: "blue", borderColor: "red" }}
                >
                    StyledItem
                </GridItem>
            </Grid>,
        );
        const item = screen.getByText("StyledItem");
        expect(item.style.backgroundColor).toBe("blue");
        expect(item.style.borderColor).toBe("red");
    });
});
