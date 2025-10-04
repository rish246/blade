import { render, screen } from "@testing-library/react";
import Text from "./index";
import { tokens } from "../../tokens/tokens";

describe("Text", () => {
    it("renders children", () => {
        render(<Text>Hello Blade</Text>);
        expect(screen.getByText("Hello Blade")).toBeInTheDocument();
    });

    it("renders as default span", () => {
        render(<Text>Hello</Text>);
        const el = screen.getByText("Hello");
        expect(el.tagName.toLowerCase()).toBe("span");
    });

    it("supports rendering as another element", () => {
        render(<Text as="h1">Heading</Text>);
        const el = screen.getByRole("heading", { name: "Heading" });
        expect(el.tagName.toLowerCase()).toBe("h1");
    });

    it("applies default typography styles", () => {
        render(<Text>Default</Text>);
        const el = screen.getByText("Default");

        // Check inline styles directly from the style attribute
        expect(el).toHaveStyle({
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSizeMd}px`, // Note: add 'px' if tokens are numbers
            lineHeight: `${tokens.typography.lineHeightMd}px`,
            fontWeight: `${tokens.typography.fontWeightNormal}`,
            textAlign: "left",
        });
    });

    it("applies size, weight and color tokens", () => {
        render(
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
        render(
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
        render(<Text aria-label="labelled-text">Test</Text>);
        const el = screen.getByLabelText("labelled-text");
        expect(el).toBeInTheDocument();
    });
});
