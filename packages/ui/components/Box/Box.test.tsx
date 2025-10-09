import { render } from "@testing-library/react";
import Box from ".";
import { ThemeProvider } from "../../theme/theme-provider/ThemeProvider";
import { lightTheme as tokens } from "../../theme/tokens/light";

describe("Box", () => {
    const renderWithTheme = (ui: React.ReactNode) =>
        render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);

    it("renders children", () => {
        const result = renderWithTheme(<Box>Hello world</Box>);
        expect(result.getByText("Hello world")).toBeInTheDocument();
    });

    it("applies default styling from theme", () => {
        const result = renderWithTheme(<Box>Hello</Box>);
        const rendered = result.getByText("Hello");

        expect(rendered).toBeInTheDocument();
        expect(rendered).toHaveStyle(`background: ${tokens.colors.bg}`);
        expect(rendered).toHaveStyle(`color: ${tokens.colors.text}`);
        expect(rendered).toHaveStyle("padding: 0px");
        expect(rendered).toHaveStyle("margin: 0px");
    });

    it("applies token-based styles from props", () => {
        const result = renderWithTheme(
            <Box p="md" m="lg" color="success" bg="accent">
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");

        expect(rendered).toHaveStyle(`background: ${tokens.colors.accent}`);
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle(`padding: ${tokens.spacing.md}`);
        expect(rendered).toHaveStyle(`margin: ${tokens.spacing.lg}`);
    });

    it("allows inline style override", () => {
        const result = renderWithTheme(
            <Box
                p="md"
                m="lg"
                color="success"
                bg="accent"
                style={{ background: "blue" }}
            >
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");

        // Inline style should override token value
        expect(rendered).toHaveStyle("background: blue");
        expect(rendered).toHaveStyle(`padding: ${tokens.spacing.md}`);
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle(`margin: ${tokens.spacing.lg}`);
    });

    it("accepts freeform width and height", () => {
        const result = renderWithTheme(
            <Box p="md" m="lg" color="success" bg="accent" h="100px" w="50%">
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");

        expect(rendered).toHaveStyle(`padding: ${tokens.spacing.md}`);
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle(`margin: ${tokens.spacing.lg}`);
        expect(rendered).toHaveStyle("height: 100px");
        expect(rendered).toHaveStyle("width: 50%");
    });

    it("accepts numeric width and height", () => {
        const result = renderWithTheme(
            <Box h={100} w={50}>
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");

        expect(rendered).toHaveStyle("height: 100px");
        expect(rendered).toHaveStyle("width: 50px");
    });

    it("passes accessibility attributes", () => {
        const result = renderWithTheme(
            <Box
                p="md"
                m="lg"
                color="success"
                bg="accent"
                h="100px"
                w="50%"
                aria-label="My Label"
            >
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");

        expect(rendered).toHaveStyle(`padding: ${tokens.spacing.md}`);
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle(`margin: ${tokens.spacing.lg}`);
        expect(rendered).toHaveStyle("height: 100px");
        expect(rendered).toHaveStyle("width: 50%");

        const labelEl = result.getByLabelText("My Label");
        expect(labelEl).toBeInTheDocument();
    });
});
