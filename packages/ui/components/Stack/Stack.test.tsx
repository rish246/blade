import { render, screen } from "@testing-library/react";
import Stack from "./index";
import { tokens } from "../../tokens/tokens";

describe("Stack", () => {
    it("renders children", () => {
        render(
            <Stack>
                <span>One</span>
                <span>Two</span>
            </Stack>,
        );
        expect(screen.getByText("One")).toBeInTheDocument();
        expect(screen.getByText("Two")).toBeInTheDocument();
    });

    it("applies default flex properties", () => {
        const { container } = render(<Stack>Default</Stack>);
        expect(container.firstChild).toHaveStyle({
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            gap: tokens.spacing.sm,
        });
    });

    it("respects custom direction, align, justify, wrap", () => {
        const { container } = render(
            <Stack
                direction="column"
                align="flex-start"
                justify="flex-end"
                wrap="wrap"
            >
                Custom
            </Stack>,
        );
        expect(container.firstChild).toHaveStyle({
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            flexWrap: "wrap",
        });
    });

    it("applies token gap", () => {
        const { container } = render(
            <Stack gap={tokens.spacing.lg}>Gap test</Stack>,
        );
        expect(container.firstChild).toHaveStyle({
            gap: tokens.spacing.lg,
        });
    });

    it("merges inline styles with defaults", () => {
        const { getByText } = render(
            <Stack style={{ padding: "10px", margin: "5px" }}>Styled</Stack>,
        );

        const element = getByText("Styled");

        expect(element).toHaveStyle("display: flex");
        expect(element).toHaveStyle("padding: 10px");
        expect(element).toHaveStyle("margin: 5px");
    });

    it("applies className", () => {
        const { container } = render(
            <Stack className="custom-class">Class test</Stack>,
        );
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
