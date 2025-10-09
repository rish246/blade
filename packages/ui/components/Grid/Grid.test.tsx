import { act } from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Grid from ".";
import GridItem from "../GridItem";
import { ThemeProvider } from "../../theme/theme-provider";

/* ------------------ HELPERS ------------------ */
const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);
};

const triggerResize = async (width: number) => {
    await act(async () => {
        (window as any).innerWidth = width;
        window.dispatchEvent(new Event("resize"));
    });
    await waitFor(() => expect(true).toBe(true));
};

/* ------------------ TESTS ------------------ */
describe("Grid Component", () => {
    beforeEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("renders children correctly", () => {
        renderWithTheme(
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
        renderWithTheme(<Grid columns={3}>Child</Grid>);
        const el = screen.getByText("Child");
        expect(el).toHaveStyle({
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
        });
    });

    it("applies gap correctly", () => {
        renderWithTheme(
            <Grid columns={2} gap="md">
                GapTest
            </Grid>,
        );
        const el = screen.getByText("GapTest");
        expect(el).toHaveStyle({ gap: "16px" });
    });

    it("applies rowGap and colGap correctly", () => {
        renderWithTheme(
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
        renderWithTheme(
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

    it("sets grid-auto-flow based on wrap prop", () => {
        const { rerender } = renderWithTheme(
            <Grid columns={3} wrap>
                WrapTrue
            </Grid>,
        );
        const el = screen.getByText("WrapTrue");
        expect(el).toHaveStyle({ gridAutoFlow: "row" });

        rerender(
            <ThemeProvider initialTheme="light">
                <Grid columns={3} wrap={false}>
                    WrapFalse
                </Grid>
            </ThemeProvider>,
        );
        expect(el).toHaveStyle({ gridAutoFlow: "column" });
    });

    it("merges custom inline styles", () => {
        renderWithTheme(
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
        renderWithTheme(
            <Grid columns={{ sm: 1, md: 2, lg: 4 }}>Responsive</Grid>,
        );
        const el = screen.getByText("Responsive");

        await triggerResize(500);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(1, 1fr)"),
        );

        await triggerResize(800);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(2, 1fr)"),
        );

        await triggerResize(1200);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(4, 1fr)"),
        );
    });

    it("falls back to full width if no responsive match", async () => {
        renderWithTheme(<Grid columns={{ sm: 1 }}>Fallback</Grid>);
        const el = screen.getByText("Fallback");
        await triggerResize(1600);
        await waitFor(() =>
            expect(el.style.gridTemplateColumns).toBe("repeat(1, 1fr)"),
        );
    });

    it("handles invalid props gracefully", () => {
        renderWithTheme(
            // @ts-expect-error invalid prop for testing
            <Grid columns="invalid">Invalid</Grid>,
        );
        const el = screen.getByText("Invalid");
        expect(el.style.display).toBe("grid");
    });

    it("passes through additional HTML props", () => {
        renderWithTheme(
            <Grid data-testid="grid" role="region" columns={2}>
                Region
            </Grid>,
        );
        const el = screen.getByTestId("grid");
        expect(el.getAttribute("role")).toBe("region");
    });

    it("cleans up resize listener on unmount", () => {
        const removeListener = vi.spyOn(window, "removeEventListener");
        const { unmount } = renderWithTheme(
            <Grid columns={{ sm: 1, md: 2 }}>Cleanup</Grid>,
        );
        unmount();
        expect(removeListener).toHaveBeenCalledWith(
            "resize",
            expect.any(Function),
        );
    });
});

/* ------------------ GRID ITEM TESTS ------------------ */

describe("GridItem Component", () => {
    it("applies colSpan and rowSpan styles", () => {
        renderWithTheme(
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
        renderWithTheme(
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
        renderWithTheme(
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
