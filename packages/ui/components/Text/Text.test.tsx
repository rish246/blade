import { render, screen } from "@testing-library/react";
import Text from "./index";
import { ThemeProvider } from "../../theme/theme-provider";
import { baseTheme as tokens } from "../../theme/tokens";

/** Utility to render Text inside ThemeProvider */
const renderWithTheme = (ui: React.ReactNode) =>
    render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);

describe("Text", () => {
    it("renders children", () => {
        renderWithTheme(<Text>Hello Blade</Text>);
        expect(screen.getByText("Hello Blade")).toBeInTheDocument();
    });

    it("renders as default span", () => {
        renderWithTheme(<Text>Hello</Text>);
        const el = screen.getByText("Hello");
        expect(el.tagName.toLowerCase()).toBe("span");
    });

    it("supports rendering as another element", () => {
        renderWithTheme(<Text as="h1">Heading</Text>);
        const el = screen.getByRole("heading", { name: "Heading" });
        expect(el.tagName.toLowerCase()).toBe("h1");
    });

    it("applies default typography styles", () => {
        renderWithTheme(<Text>Default</Text>);
        const el = screen.getByText("Default");
        expect(el).toHaveStyle({
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSizeMd,
            lineHeight: tokens.typography.lineHeightMd,
            fontWeight: tokens.typography.fontWeightNormal,
            textAlign: "left",
        });
    });

    it("applies size, weight and color tokens", () => {
        renderWithTheme(
            <Text size="lg" weight="bold" color="accent" align="center">
                Custom
            </Text>,
        );
        const el = screen.getByText("Custom");
        expect(el).toHaveStyle({
            fontSize: tokens.typography.fontSizeLg,
            lineHeight: tokens.typography.lineHeightLg,
            fontWeight: tokens.typography.fontWeightBold,
            color: tokens.colors.accent,
            textAlign: "center",
        });
    });

    it("merges inline styles with token styles", () => {
        renderWithTheme(
            <Text style={{ letterSpacing: "2px" }} weight="medium">
                Styled
            </Text>,
        );
        const el = screen.getByText("Styled");
        expect(el).toHaveStyle({
            fontWeight: tokens.typography.fontWeightMedium,
            letterSpacing: "2px",
        });
    });

    it("forwards extra props (like aria-label)", () => {
        renderWithTheme(<Text aria-label="labelled-text">Test</Text>);
        const el = screen.getByLabelText("labelled-text");
        expect(el).toBeInTheDocument();
    });

    it("overrides token styles with custom style", () => {
        renderWithTheme(
            <Text
                size="md"
                style={{
                    fontSize: "18px",
                    color: "purple",
                }}
            >
                Override
            </Text>,
        );
        const el = screen.getByText("Override");
        expect(el.style.color).toBe("purple");
        expect(el).toHaveStyle({
            fontSize: "18px",
        });
    });

    it("renders correctly in dark mode theme", () => {
        render(
            <ThemeProvider initialTheme="dark">
                <Text color="text">Dark Mode Text</Text>
            </ThemeProvider>,
        );
        expect(screen.getByText("Dark Mode Text")).toBeInTheDocument();
    });
});
