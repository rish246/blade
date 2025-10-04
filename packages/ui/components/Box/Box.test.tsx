import { render } from "@testing-library/react";
import Box from ".";
import { tokens } from "../../tokens/tokens";

describe("Box", () => {
    it("renders children", () => {
        const result = render(<Box>Hello world</Box>);
        expect(result.getByText("Hello world")).toBeInTheDocument();
    });

    it("default styling to the children", () => {
        const result = render(<Box>Hello</Box>);
        const rendered = result.getByText("Hello");
        expect(result.getByText("Hello")).toBeInTheDocument();

        expect(rendered).toHaveStyle(`background: ${tokens.colors.none}`);
        expect(rendered).toHaveStyle("padding:0");
        expect(rendered).toHaveStyle(`color: ${tokens.colors.text}`);
        expect(rendered).toHaveStyle("margin:0");
    });

    it("overriding default prop values", () => {
        const result = render(
            <Box p={"md"} m={"lg"} color={"success"} bg={"accent"}>
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");
        expect(result.getByText("Hello")).toBeInTheDocument();

        expect(rendered).toHaveStyle(`background: ${tokens.colors.accent}`);
        expect(rendered).toHaveStyle("padding: 16px");
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle("margin: 24px");
    });

    it("providing addition style object", () => {
        const result = render(
            <Box
                p={"md"}
                m={"lg"}
                color={"success"}
                bg={"accent"}
                style={{
                    background: "blue",
                }}
            >
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");
        expect(result.getByText("Hello")).toBeInTheDocument();

        expect(rendered).toHaveStyle("background: blue");
        expect(rendered).toHaveStyle("padding: 16px");
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle("margin: 24px");
    });

    it("providing freeform width and height", () => {
        const result = render(
            <Box
                p={"md"}
                m={"lg"}
                color={"success"}
                bg={"accent"}
                h={"100px"}
                w={"50%"}
            >
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");
        expect(result.getByText("Hello")).toBeInTheDocument();

        expect(rendered).toHaveStyle("padding: 16px");
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle("margin: 24px");

        expect(rendered).toHaveStyle("height: 100px");
        expect(rendered).toHaveStyle("width: 50%");
    });

    it("providing width and height as ints", () => {
        const result = render(
            <Box h={100} w={0.5}>
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");
        expect(result.getByText("Hello")).toBeInTheDocument();

        expect(rendered).toHaveStyle("height: 100px");
        expect(rendered).toHaveStyle("width: 0.5px");
    });

    it("passing accessibility attrs to the box", () => {
        const result = render(
            <Box
                p={"md"}
                m={"lg"}
                color={"success"}
                bg={"accent"}
                h={"100px"}
                w={"50%"}
                aria-label={"My Label"}
            >
                Hello
            </Box>,
        );
        const rendered = result.getByText("Hello");
        expect(result.getByText("Hello")).toBeInTheDocument();

        expect(rendered).toHaveStyle("padding: 16px");
        expect(rendered).toHaveStyle(`color: ${tokens.colors.success}`);
        expect(rendered).toHaveStyle("margin: 24px");

        expect(rendered).toHaveStyle("height: 100px");
        expect(rendered).toHaveStyle("width: 50%");

        const labelEl = result.getByLabelText("My Label");
        expect(labelEl).toBeInTheDocument();
    });
});
