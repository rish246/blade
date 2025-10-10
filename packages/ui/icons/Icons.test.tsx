import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Icon from ".";
import { baseTheme } from "../theme/tokens";

describe("Icon Component", () => {
    it("renders the correct icon based on name", () => {
        render(<Icon name="Search" data-testid="icon" />);
        const wrapper = screen.getByTestId("icon");
        expect(wrapper).toBeInTheDocument();

        // Check for SVG or Lucide symbol (SVGR output may vary)
        const svg = wrapper.firstChild;
        expect(svg).not.toBeNull();
    });

    it("renders with default size and color", () => {
        render(<Icon name="User" />);
        const wrapper = screen.getByRole("img", { hidden: true });
        const svg = wrapper.querySelector("svg");
        expect(svg).toHaveAttribute("width", "24");
        expect(svg).toHaveAttribute("height", "24");
        expect(svg).toHaveAttribute("stroke", baseTheme.colors.accent);
    });

    it("applies custom size and color props", () => {
        render(<Icon name="Check" size={32} color="red" />);
        const wrapper = screen.getByRole("img", { hidden: true });
        const svg = wrapper.querySelector("svg");
        expect(svg).toHaveAttribute("width", "32");
        expect(svg).toHaveAttribute("height", "32");
        expect(svg).toHaveAttribute("stroke", "red");
    });

    it("renders with custom className", () => {
        const { container } = render(<Icon name="Menu" className="my-icon" />);
        expect(container.firstChild).toHaveClass("my-icon");
    });

    it("merges custom styles with icon color", () => {
        const { container } = render(
            <Icon name="Info" style={{ marginTop: "10px", color: "blue" }} />,
        );
        const wrapper = container.firstChild;
        expect(wrapper).toHaveStyle({ marginTop: "10px" });

        // Ensure SVG stroke color reflects style
        const svg = wrapper.firstChild;
        expect(svg).toHaveAttribute("stroke", "blue");
    });

    // ==================== Accessibility ====================
    describe("Accessibility", () => {
        it("is aria-hidden by default (decorative icon)", () => {
            render(<Icon name="Heart" />);
            const wrapper = screen.getByRole("img", { hidden: true });
            expect(wrapper).toHaveAttribute("aria-hidden", "true");
        });

        it("renders with aria-label when provided", () => {
            render(<Icon name="TriangleAlert" aria-label="Warning" />);
            const wrapper = screen.getByLabelText("Warning");
            expect(wrapper).toBeInTheDocument();
            expect(wrapper).toHaveAttribute("role", "img");
            expect(wrapper).toHaveAttribute("aria-hidden", "false");
        });

        it("overrides aria-hidden when explicitly set", () => {
            render(
                <Icon name="User" aria-hidden={false} aria-label="User Icon" />,
            );
            const wrapper = screen.getByLabelText("User Icon");
            expect(wrapper).toHaveAttribute("aria-hidden", "false");
        });

        it("sets role='img' for screen readers", () => {
            render(<Icon name="Info" />);
            const wrapper = screen.getByRole("img", { hidden: true });
            expect(wrapper).toBeInTheDocument();
        });

        it("applies focusable='false' to the inner svg", () => {
            render(<Icon name="Trash" />);
            const wrapper = screen.getByRole("img", { hidden: true });
            const svg = wrapper.querySelector("svg");
            expect(svg).toHaveAttribute("focusable", "false");
        });
    });

    // ==================== Invalid Icons ====================
    describe("Invalid Icons", () => {
        it("returns null and warns when invalid icon name is passed", () => {
            const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const { container } = render(<Icon name={"Nonexistent" as any} />);
            expect(container.firstChild).toBeNull();
            expect(spy).toHaveBeenCalledWith(
                expect.stringContaining("⚠️ Icon not found: Nonexistent"),
            );
            spy.mockRestore();
        });
    });
});
