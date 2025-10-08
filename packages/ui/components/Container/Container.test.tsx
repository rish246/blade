import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import Container from ".";
import { vi } from "vitest";
import { breakpoints } from "../../utils/breakpoints";

// A simple store for the current screen width

const setScreenWidth = async (width: number) => {
    (window as any).innerWidth = width;
    window.dispatchEvent(new Event("resize"));
};

describe("Container Component", () => {
    beforeEach(async () => {
        cleanup();
        setScreenWidth(1024);
    });

    it("renders children properly", () => {
        render(<Container>Child content</Container>);
        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("applies default inline styles", () => {
        render(<Container>Default</Container>);
        const el = screen.getByText("Default");
        expect(el).toHaveStyle({
            width: "100%",
            maxWidth: "1280px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginLeft: "auto",
            marginRight: "auto",
        });
    });

    it("accepts custom maxWidth prop", () => {
        render(<Container maxWidth="md">Medium</Container>);
        const el = screen.getByText("Medium");
        expect(el).toHaveStyle({ maxWidth: "768px" });
    });

    it("disables centering when center=false", () => {
        render(<Container center={false}>Uncentered</Container>);
        const el = screen.getByText("Uncentered");
        expect(el.style.marginLeft).toBe("");
        expect(el.style.marginRight).toBe("");
    });

    it("applies padding variants correctly", () => {
        render(<Container padding="lg">Padding</Container>);
        const el = screen.getByText("Padding");
        expect(el).toHaveStyle({
            paddingLeft: "32px",
            paddingRight: "32px",
        });
    });

    it("applies margin variants correctly", () => {
        render(<Container marginY="lg">Margin</Container>);
        const el = screen.getByText("Margin");
        expect(el).toHaveStyle({
            marginTop: "32px",
            marginBottom: "32px",
        });
    });

    it("merges custom inline styles", () => {
        render(
            <Container
                style={{
                    backgroundColor: "red",
                    paddingLeft: "50px",
                }}
            >
                Styled
            </Container>,
        );
        const el = screen.getByText("Styled");
        expect(el.style.backgroundColor).toBe("red");
        expect(el).toHaveStyle({
            paddingLeft: "50px",
        });
    });

    describe("Responsive behavior", () => {
        it("updates maxWidth dynamically on resize", async () => {
            render(
                <Container
                    maxWidth={{ sm: "sm", md: "md", lg: "lg", xl: "xl" }}
                >
                    Responsive
                </Container>,
            );

            const el = screen.getByText("Responsive");

            // Small screen
            setScreenWidth(500);
            await waitFor(() => expect(el.style.maxWidth).toBe("640px"));

            // Medium screen
            setScreenWidth(800);
            await waitFor(() => expect(el.style.maxWidth).toBe("768px"));

            // Large screen
            setScreenWidth(1200);
            await waitFor(() => expect(el.style.maxWidth).toBe("1024px"));

            // Extra large screen
            setScreenWidth(1300);
            await waitFor(() => expect(el.style.maxWidth).toBe("1280px"));
        });

        it("falls back to full width when no matching breakpoint", () => {
            render(<Container maxWidth={{ sm: "sm" }}>Fallback</Container>);
            setScreenWidth(1600);
            const el = screen.getByText("Fallback");
            expect(el.style.maxWidth).toBe("100%");
        });
    });

    describe("Advanced scenarios", () => {
        it("updates inline styles when props change", () => {
            const { rerender } = render(
                <Container maxWidth="sm">Dynamic</Container>,
            );
            const el = screen.getByText("Dynamic");
            expect(el).toHaveStyle({ maxWidth: "640px" });

            rerender(<Container maxWidth="xl">Dynamic</Container>);
            expect(el).toHaveStyle({ maxWidth: "1280px" });
        });

        it("passes through additional HTML attributes", () => {
            render(
                <Container data-testid="container" role="region">
                    Accessible
                </Container>,
            );
            const el = screen.getByTestId("container");
            expect(el.getAttribute("role")).toBe("region");
        });

        it("handles multiple responsive breakpoints correctly", async () => {
            render(
                <Container
                    maxWidth={{ sm: "sm", md: "md", lg: "xl" }}
                    data-testid="multi"
                >
                    Multi
                </Container>,
            );
            const el = screen.getByText("Multi");

            setScreenWidth(breakpoints.sm);
            await waitFor(() => expect(el.style.maxWidth).toBe("640px"));

            setScreenWidth(breakpoints.lg);
            await waitFor(() => expect(el.style.maxWidth).toBe("1280px"));
        });

        it("memoizes styles and avoids recomputing unnecessarily", () => {
            const { rerender } = render(<Container>Memo</Container>);
            const el = screen.getByText("Memo");
            const initialStyle = el.getAttribute("style");

            rerender(<Container>Memo</Container>); // no prop change
            const rerenderedStyle = el.getAttribute("style");

            expect(initialStyle).toBe(rerenderedStyle);
        });

        it("cleans up resize listener on unmount", () => {
            const removeListener = vi.spyOn(window, "removeEventListener");
            const { unmount } = render(<Container>Cleanup</Container>);
            unmount();
            expect(removeListener).toHaveBeenCalledWith(
                "resize",
                expect.any(Function),
            );
        });
    });

    describe("Snapshot testing", () => {
        it("matches default render snapshot", () => {
            const { asFragment } = render(<Container>Snapshot</Container>);
            expect(asFragment()).toMatchSnapshot();
        });

        it("matches responsive config snapshot", () => {
            const { asFragment } = render(
                <Container maxWidth={{ sm: "sm", md: "xl" }}>
                    SnapshotResponsive
                </Container>,
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
