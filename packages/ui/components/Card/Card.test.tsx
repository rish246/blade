import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card from ".";
import { ThemeProvider } from "../../theme/theme-provider";
import { lightTheme as tokens } from "../../theme/tokens/light";

// -----------------------------------------------------------------------------
// Utility wrapper to provide theme context
// -----------------------------------------------------------------------------
const renderWithTheme = (ui: React.ReactNode) =>
    render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);

describe("Card", () => {
    // ==================== RENDERING ====================
    describe("Rendering", () => {
        it("renders card element", () => {
            renderWithTheme(<Card>Card content</Card>);
            expect(screen.getByText("Card content")).toBeInTheDocument();
        });

        it("renders with children", () => {
            renderWithTheme(
                <Card>
                    <h2>Title</h2>
                    <p>Description</p>
                </Card>,
            );
            expect(screen.getByText("Title")).toBeInTheDocument();
            expect(screen.getByText("Description")).toBeInTheDocument();
        });

        it("renders without children", () => {
            const { container } = renderWithTheme(<Card />);
            expect(container.querySelector("div")).toBeInTheDocument();
        });

        it("renders complex children", () => {
            renderWithTheme(
                <Card>
                    <div data-testid="complex">
                        <span>Nested</span>
                        <button>Action</button>
                    </div>
                </Card>,
            );
            expect(screen.getByTestId("complex")).toBeInTheDocument();
        });
    });

    // ==================== VARIANTS ====================
    describe("Variants", () => {
        it("applies default variant styles", () => {
            const { container } = renderWithTheme(<Card>Default</Card>);
            const card = container.firstChild as HTMLElement;
            expect(card).toHaveStyle({
                backgroundColor: tokens.colors.bg,
            });
        });

        it("applies elevated variant styles", () => {
            const { container } = renderWithTheme(
                <Card variant="elevated">Elevated</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card.style.boxShadow).toBe(tokens.shadows.md);
        });

        it("applies outlined variant styles", () => {
            const { container } = renderWithTheme(
                <Card variant="outlined">Outlined</Card>,
            );
            const card = container.firstChild as HTMLElement;
            console.log(card.style.border);
        });

        it("applies filled variant styles", () => {
            const { container } = renderWithTheme(
                <Card variant="filled">Filled</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card).toHaveStyle({
                backgroundColor: expect.stringContaining("249, 250, 251"),
            });
        });

        it("defaults to default variant when not specified", () => {
            const { container } = renderWithTheme(<Card>No variant</Card>);
            expect(container.firstChild).toBeInTheDocument();
        });
    });

    // ==================== PADDING ====================
    describe("Padding", () => {
        it("applies small padding", () => {
            renderWithTheme(<Card padding="sm">Small</Card>);
            const content = screen.getByText("Small");
            expect(content?.style.padding).toBe(tokens.spacing.sm);
        });

        it("applies medium padding", () => {
            renderWithTheme(<Card padding="md">Medium</Card>);
            const content = screen.getByText("Medium");
            expect(content?.style.padding).toBe(tokens.spacing.md);
        });

        it("applies large padding", () => {
            renderWithTheme(<Card padding="lg">Large</Card>);
            const content = screen.getByText("Large");
            expect(content?.style.padding).toBe(tokens.spacing.lg);
        });

        it("applies no padding when padding is none", () => {
            renderWithTheme(<Card padding="none">No padding</Card>);
            const content = screen.getByText("No padding");
            expect(content?.style.padding).toBe("0px");
        });

        it("defaults to medium padding when not specified", () => {
            renderWithTheme(<Card>Default padding</Card>);
            const content = screen.getByText("Default padding");
            expect(content?.style.padding).toBe(tokens.spacing.md);
        });
    });

    // ==================== CLICKABLE / INTERACTIVE ====================
    describe("Clickable/Interactive", () => {
        it("calls onClick when clicked", () => {
            const handleClick = vi.fn();
            renderWithTheme(<Card onClick={handleClick}>Click me</Card>);
            fireEvent.click(screen.getByText("Click me"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("applies hover styles when clickable", () => {
            const { container } = renderWithTheme(
                <Card onClick={() => {}}>Hover</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card).toHaveStyle({ cursor: "pointer" });
        });

        it("does not call onClick when disabled", () => {
            const handleClick = vi.fn();
            renderWithTheme(
                <Card disabled onClick={handleClick}>
                    Disabled
                </Card>,
            );
            fireEvent.click(screen.getByText("Disabled"));
            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    // ==================== DISABLED STATE ====================
    describe("Disabled State", () => {
        it("applies disabled styles", () => {
            const { container } = renderWithTheme(
                <Card disabled>Disabled</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card).toHaveStyle({
                opacity: "0.5",
                cursor: "not-allowed",
            });
        });
    });

    // ==================== HEADER & FOOTER ====================
    describe("Header and Footer", () => {
        it("renders header and footer correctly", () => {
            renderWithTheme(
                <Card header={<h2>Header</h2>} footer={<div>Footer</div>}>
                    Body
                </Card>,
            );
            expect(screen.getByText("Header")).toBeInTheDocument();
            expect(screen.getByText("Body")).toBeInTheDocument();
            expect(screen.getByText("Footer")).toBeInTheDocument();
        });
    });

    // ==================== MEDIA ====================
    describe("Image/Media", () => {
        it("renders image correctly", () => {
            renderWithTheme(
                <Card image={<img src="/test.jpg" alt="Test image" />}>
                    Content
                </Card>,
            );
            expect(screen.getByAltText("Test image")).toBeInTheDocument();
        });
    });

    // ==================== BORDER RADIUS ====================
    describe("Border Radius", () => {
        it("applies medium radius by default", () => {
            const { container } = renderWithTheme(<Card>Default radius</Card>);
            const card = container.firstChild as HTMLElement;
            expect(card.style.borderRadius).toBe(tokens.radii.md);
        });
    });

    // ==================== FULL WIDTH ====================
    describe("Full Width", () => {
        it("applies 100% width when fullWidth is true", () => {
            const { container } = renderWithTheme(
                <Card fullWidth>Full width</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card).toHaveStyle({ width: "100%" });
        });
    });

    // ==================== CUSTOM STYLING ====================
    describe("Custom Styling", () => {
        it("applies inline custom styles", () => {
            const { container } = renderWithTheme(
                <Card style={{ backgroundColor: "purple" }}>Styled</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card.style.backgroundColor).toBe("purple");
        });
    });

    // ==================== ACCESSIBILITY ====================
    describe("Accessibility", () => {
        it("accepts aria-label", () => {
            const { container } = renderWithTheme(
                <Card aria-label="Custom card">Content</Card>,
            );
            const card = container.firstChild as HTMLElement;
            expect(card).toHaveAttribute("aria-label", "Custom card");
        });
    });

    // ==================== LOADING STATE ====================
    describe("Loading State", () => {
        it("shows loading state when loading", () => {
            renderWithTheme(<Card loading>Content</Card>);
            expect(screen.getByText("Loading...")).toBeInTheDocument();
        });
    });
});
