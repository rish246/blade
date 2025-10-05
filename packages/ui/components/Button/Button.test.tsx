// Button.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";
import { tokens } from "../../tokens/tokens";

describe("Button", () => {
    // ==================== RENDERING ====================
    describe("Rendering", () => {
        it("renders with children text", () => {
            render(<Button>Click me</Button>);
            expect(
                screen.getByRole("button", { name: "Click me" }),
            ).toBeInTheDocument();
        });

        it("renders with JSX children", () => {
            render(
                <Button>
                    <span>Icon</span>
                    <span>Text</span>
                </Button>,
            );
            expect(screen.getByText("Icon")).toBeInTheDocument();
            expect(screen.getByText("Text")).toBeInTheDocument();
        });

        it("renders without children", () => {
            render(<Button aria-label="Empty button" />);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });
    });

    // ==================== VARIANTS ====================
    describe("Variants", () => {
        it("applies primary variant styles", () => {
            render(<Button variant="primary">Primary</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveStyle({
                backgroundColor: tokens.colors.accent,
            });
        });

        it("applies secondary variant styles", () => {
            render(<Button variant="secondary">Secondary</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveStyle({
                backgroundColor: tokens.colors.surface,
            });
        });

        it("applies outline variant styles", () => {
            render(<Button variant="outline">Outline</Button>);
            const button = screen.getByRole("button");
            expect(button.style.backgroundColor).toBe(
                tokens.colors.transparent,
            );
        });

        it("applies ghost variant styles", () => {
            render(<Button variant="ghost">Ghost</Button>);
            const button = screen.getByRole("button");
            expect(button.style.backgroundColor).toBe(
                tokens.colors.transparent,
            );
        });

        it("applies danger variant styles", () => {
            render(<Button variant="danger">Danger</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveStyle({
                backgroundColor: tokens.colors.error,
            });
        });

        it("defaults to primary variant when not specified", () => {
            render(<Button>Default</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveStyle({
                backgroundColor: tokens.colors.accent,
            });
        });
    });

    // // ==================== SIZES ====================
    // describe("Sizes", () => {
    //     it("applies small size styles", () => {
    //         render(<Button size="sm">Small</Button>);
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveStyle({
    //             padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    //             fontSize: tokens.typography.fontSizeSm,
    //         });
    //     });

    //     it("applies medium size styles", () => {
    //         render(<Button size="md">Medium</Button>);
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveStyle({
    //             padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    //             fontSize: tokens.typography.fontSizeMd,
    //         });
    //     });

    //     it("applies large size styles", () => {
    //         render(<Button size="lg">Large</Button>);
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveStyle({
    //             padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    //             fontSize: tokens.typography.fontSizeLg,
    //         });
    //     });

    //     it("defaults to medium size when not specified", () => {
    //         render(<Button>Default Size</Button>);
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveStyle({
    //             fontSize: tokens.typography.fontSizeMd,
    //         });
    //     });
    // });

    // // ==================== DISABLED STATE ====================
    // describe("Disabled State", () => {
    //     it("renders as disabled when disabled prop is true", () => {
    //         render(<Button disabled>Disabled</Button>);
    //         const button = screen.getByRole("button");
    //         expect(button).toBeDisabled();
    //     });

    //     it("applies disabled styles", () => {
    //         render(<Button disabled>Disabled</Button>);
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveStyle({
    //             opacity: "0.5",
    //             cursor: "not-allowed",
    //         });
    //     });

    //     it("does not call onClick when disabled", async () => {
    //         const handleClick = vi.fn();
    //         render(
    //             <Button disabled onClick={handleClick}>
    //                 Disabled
    //             </Button>,
    //         );
    //         const button = screen.getByRole("button");
    //         await userEvent.click(button);
    //         expect(handleClick).not.toHaveBeenCalled();
    //     });

    //     it("prevents keyboard interaction when disabled", () => {
    //         const handleClick = vi.fn();
    //         render(
    //             <Button disabled onClick={handleClick}>
    //                 Disabled
    //             </Button>,
    //         );
    //         const button = screen.getByRole("button");
    //         fireEvent.keyDown(button, { key: "Enter" });
    //         fireEvent.keyDown(button, { key: " " });
    //         expect(handleClick).not.toHaveBeenCalled();
    //     });

    //     it("is not disabled by default", () => {
    //         render(<Button>Enabled</Button>);
    //         expect(screen.getByRole("button")).not.toBeDisabled();
    //     });
    // });

    // // ==================== LOADING STATE ====================
    // describe("Loading State", () => {
    //     it("shows loading indicator when loading", () => {
    //         render(<Button loading>Loading</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "aria-busy",
    //             "true",
    //         );
    //     });

    //     it("disables button when loading", () => {
    //         render(<Button loading>Loading</Button>);
    //         expect(screen.getByRole("button")).toBeDisabled();
    //     });

    //     it("does not call onClick when loading", async () => {
    //         const handleClick = vi.fn();
    //         render(
    //             <Button loading onClick={handleClick}>
    //                 Loading
    //             </Button>,
    //         );
    //         await userEvent.click(screen.getByRole("button"));
    //         expect(handleClick).not.toHaveBeenCalled();
    //     });

    //     it("shows loading spinner", () => {
    //         render(<Button loading>Loading</Button>);
    //         // Assuming you have a loading spinner with test id or aria-label
    //         expect(screen.getByRole("button")).toContainHTML("Loading");
    //     });

    //     it("hides button text when loading and loadingText is not provided", () => {
    //         render(<Button loading>Click me</Button>);
    //         const button = screen.getByRole("button");
    //         // Text should be visually hidden but accessible
    //         expect(button).toBeInTheDocument();
    //     });

    //     it("shows custom loading text when provided", () => {
    //         render(
    //             <Button loading loadingText="Please wait...">
    //                 Submit
    //             </Button>,
    //         );
    //         expect(screen.getByText("Please wait...")).toBeInTheDocument();
    //     });
    // });

    // // ==================== FULL WIDTH ====================
    // describe("Full Width", () => {
    //     it("applies full width styles when fullWidth is true", () => {
    //         render(<Button fullWidth>Full Width</Button>);
    //         expect(screen.getByRole("button")).toHaveStyle({
    //             width: "100%",
    //         });
    //     });

    //     it("does not apply full width by default", () => {
    //         render(<Button>Normal Width</Button>);
    //         expect(screen.getByRole("button")).not.toHaveStyle({
    //             width: "100%",
    //         });
    //     });
    // });

    // // ==================== CLICK INTERACTIONS ====================
    // describe("Click Interactions", () => {
    //     it("calls onClick handler when clicked", async () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Click me</Button>);
    //         await userEvent.click(screen.getByRole("button"));
    //         expect(handleClick).toHaveBeenCalledTimes(1);
    //     });

    //     it("calls onClick with event object", async () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Click me</Button>);
    //         await userEvent.click(screen.getByRole("button"));
    //         expect(handleClick).toHaveBeenCalledWith(
    //             expect.objectContaining({
    //                 type: "click",
    //             }),
    //         );
    //     });

    //     it("handles multiple clicks", async () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Click me</Button>);
    //         const button = screen.getByRole("button");
    //         await userEvent.click(button);
    //         await userEvent.click(button);
    //         await userEvent.click(button);
    //         expect(handleClick).toHaveBeenCalledTimes(3);
    //     });

    //     it("works without onClick handler", async () => {
    //         render(<Button>No handler</Button>);
    //         await userEvent.click(screen.getByRole("button"));
    //         // Should not throw error
    //     });
    // });

    // // ==================== KEYBOARD INTERACTIONS ====================
    // describe("Keyboard Interactions", () => {
    //     it("triggers onClick when Enter key is pressed", () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Press Enter</Button>);
    //         const button = screen.getByRole("button");
    //         fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
    //         expect(handleClick).toHaveBeenCalledTimes(1);
    //     });

    //     it("triggers onClick when Space key is pressed", () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Press Space</Button>);
    //         const button = screen.getByRole("button");
    //         fireEvent.keyDown(button, { key: " ", code: "Space" });
    //         expect(handleClick).toHaveBeenCalledTimes(1);
    //     });

    //     it("does not trigger onClick for other keys", () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Other Keys</Button>);
    //         const button = screen.getByRole("button");
    //         fireEvent.keyDown(button, { key: "a" });
    //         fireEvent.keyDown(button, { key: "Tab" });
    //         expect(handleClick).not.toHaveBeenCalled();
    //     });

    //     it("is focusable by default", () => {
    //         render(<Button>Focusable</Button>);
    //         const button = screen.getByRole("button");
    //         button.focus();
    //         expect(button).toHaveFocus();
    //     });

    //     it("is not focusable when disabled", () => {
    //         render(<Button disabled>Not Focusable</Button>);
    //         const button = screen.getByRole("button");
    //         button.focus();
    //         expect(button).not.toHaveFocus();
    //     });
    // });

    // // ==================== CUSTOM STYLING ====================
    // describe("Custom Styling", () => {
    //     it("applies custom className", () => {
    //         render(<Button className="custom-class">Custom Class</Button>);
    //         expect(screen.getByRole("button")).toHaveClass("custom-class");
    //     });

    //     it("merges custom styles with default styles", () => {
    //         render(
    //             <Button
    //                 style={{ marginTop: "20px", backgroundColor: "purple" }}
    //             >
    //                 Custom Styles
    //             </Button>,
    //         );
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveStyle({
    //             marginTop: "20px",
    //             backgroundColor: "purple",
    //         });
    //     });

    //     it("custom styles override default styles", () => {
    //         render(
    //             <Button variant="primary" style={{ backgroundColor: "orange" }}>
    //                 Override
    //             </Button>,
    //         );
    //         expect(screen.getByRole("button")).toHaveStyle({
    //             backgroundColor: "orange",
    //         });
    //     });
    // });

    // // ==================== ACCESSIBILITY ====================
    // describe("Accessibility", () => {
    //     it("has button role by default", () => {
    //         render(<Button>Accessible</Button>);
    //         expect(screen.getByRole("button")).toBeInTheDocument();
    //     });

    //     it("accepts aria-label", () => {
    //         render(<Button aria-label="Custom label">Icon Only</Button>);
    //         expect(screen.getByRole("button")).toHaveAccessibleName(
    //             "Custom label",
    //         );
    //     });

    //     it("accepts aria-describedby", () => {
    //         render(
    //             <>
    //                 <Button aria-describedby="description">Button</Button>
    //                 <div id="description">Button description</div>
    //             </>,
    //         );
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "aria-describedby",
    //             "description",
    //         );
    //     });

    //     it("sets aria-disabled when disabled", () => {
    //         render(<Button disabled>Disabled</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "aria-disabled",
    //             "true",
    //         );
    //     });

    //     it("sets aria-busy when loading", () => {
    //         render(<Button loading>Loading</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "aria-busy",
    //             "true",
    //         );
    //     });

    //     it("announces loading state to screen readers", () => {
    //         render(
    //             <Button loading loadingText="Loading data">
    //                 Submit
    //             </Button>,
    //         );
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "aria-busy",
    //             "true",
    //         );
    //         expect(screen.getByText("Loading data")).toBeInTheDocument();
    //     });

    //     it("supports custom ARIA attributes", () => {
    //         render(
    //             <Button aria-pressed="true" aria-expanded="false">
    //                 Toggle
    //             </Button>,
    //         );
    //         const button = screen.getByRole("button");
    //         expect(button).toHaveAttribute("aria-pressed", "true");
    //         expect(button).toHaveAttribute("aria-expanded", "false");
    //     });
    // });

    // // ==================== FORWARDING PROPS ====================
    // describe("Forwarding Props", () => {
    //     it("forwards data attributes", () => {
    //         render(<Button data-testid="test-button">Data Attrs</Button>);
    //         expect(screen.getByTestId("test-button")).toBeInTheDocument();
    //     });

    //     it("forwards type attribute", () => {
    //         render(<Button type="submit">Submit</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "type",
    //             "submit",
    //         );
    //     });

    //     it("forwards name attribute", () => {
    //         render(<Button name="submit-button">Named</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "name",
    //             "submit-button",
    //         );
    //     });

    //     it("forwards value attribute", () => {
    //         render(<Button value="button-value">Value</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "value",
    //             "button-value",
    //         );
    //     });

    //     it("forwards id attribute", () => {
    //         render(<Button id="unique-button">ID</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "id",
    //             "unique-button",
    //         );
    //     });

    //     it("forwards title attribute", () => {
    //         render(<Button title="Tooltip text">Hover me</Button>);
    //         expect(screen.getByRole("button")).toHaveAttribute(
    //             "title",
    //             "Tooltip text",
    //         );
    //     });
    // });

    // // ==================== FORM INTEGRATION ====================
    // describe("Form Integration", () => {
    //     it("submits form when type is submit", () => {
    //         const handleSubmit = vi.fn((e) => e.preventDefault());
    //         render(
    //             <form onSubmit={handleSubmit}>
    //                 <Button type="submit">Submit</Button>
    //             </form>,
    //         );
    //         fireEvent.click(screen.getByRole("button"));
    //         expect(handleSubmit).toHaveBeenCalledTimes(1);
    //     });

    //     it("resets form when type is reset", () => {
    //         render(
    //             <form>
    //                 <input defaultValue="test" />
    //                 <Button type="reset">Reset</Button>
    //             </form>,
    //         );
    //         const input = screen.getByRole("textbox") as HTMLInputElement;
    //         fireEvent.change(input, { target: { value: "changed" } });
    //         expect(input.value).toBe("changed");

    //         fireEvent.click(screen.getByRole("button"));
    //         expect(input.value).toBe("test");
    //     });

    //     it("does not submit form when type is button", () => {
    //         const handleSubmit = vi.fn();
    //         render(
    //             <form onSubmit={handleSubmit}>
    //                 <Button type="button">Button</Button>
    //             </form>,
    //         );
    //         fireEvent.click(screen.getByRole("button"));
    //         expect(handleSubmit).not.toHaveBeenCalled();
    //     });

    //     it("does not submit form when disabled", () => {
    //         const handleSubmit = vi.fn();
    //         render(
    //             <form onSubmit={handleSubmit}>
    //                 <Button type="submit" disabled>
    //                     Submit
    //                 </Button>
    //             </form>,
    //         );
    //         fireEvent.click(screen.getByRole("button"));
    //         expect(handleSubmit).not.toHaveBeenCalled();
    //     });
    // });

    // // ==================== LINK BUTTON ====================
    // describe("Link Button (as anchor)", () => {
    //     it("renders as anchor tag with href", () => {
    //         render(
    //             <Button as="a" href="https://example.com">
    //                 Link
    //             </Button>,
    //         );
    //         const link = screen.getByRole("link");
    //         expect(link).toHaveAttribute("href", "https://example.com");
    //     });

    //     it("opens in new tab when target is _blank", () => {
    //         render(
    //             <Button as="a" href="https://example.com" target="_blank">
    //                 External Link
    //             </Button>,
    //         );
    //         const link = screen.getByRole("link");
    //         expect(link).toHaveAttribute("target", "_blank");
    //     });

    //     it("includes rel='noopener noreferrer' for security", () => {
    //         render(
    //             <Button
    //                 as="a"
    //                 href="https://example.com"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 Secure Link
    //             </Button>,
    //         );
    //         expect(screen.getByRole("link")).toHaveAttribute(
    //             "rel",
    //             "noopener noreferrer",
    //         );
    //     });
    // });

    // // ==================== EDGE CASES ====================
    // describe("Edge Cases", () => {
    //     it("handles rapid successive clicks", async () => {
    //         const handleClick = vi.fn();
    //         render(<Button onClick={handleClick}>Rapid Click</Button>);
    //         const button = screen.getByRole("button");

    //         await userEvent.click(button);
    //         await userEvent.click(button);
    //         await userEvent.click(button);
    //         await userEvent.click(button);
    //         await userEvent.click(button);

    //         expect(handleClick).toHaveBeenCalledTimes(5);
    //     });

    //     it("handles async onClick handlers", async () => {
    //         const handleClick = vi.fn(async () => {
    //             await new Promise((resolve) => setTimeout(resolve, 100));
    //         });

    //         render(<Button onClick={handleClick}>Async</Button>);
    //         await userEvent.click(screen.getByRole("button"));

    //         await waitFor(() => {
    //             expect(handleClick).toHaveBeenCalledTimes(1);
    //         });
    //     });

    //     it("handles onClick that throws error", async () => {
    //         const handleClick = vi.fn(() => {
    //             throw new Error("Test error");
    //         });
    //         const consoleSpy = vi
    //             .spyOn(console, "error")
    //             .mockImplementation(() => {});

    //         render(<Button onClick={handleClick}>Error</Button>);

    //         // Should not crash the app
    //         await userEvent.click(screen.getByRole("button"));

    //         consoleSpy.mockRestore();
    //     });

    //     it("handles null children gracefully", () => {
    //         render(<Button>{null}</Button>);
    //         expect(screen.getByRole("button")).toBeInTheDocument();
    //     });

    //     it("handles undefined children gracefully", () => {
    //         render(<Button>{undefined}</Button>);
    //         expect(screen.getByRole("button")).toBeInTheDocument();
    //     });

    //     it("handles empty string children", () => {
    //         render(<Button>{""}</Button>);
    //         expect(screen.getByRole("button")).toBeInTheDocument();
    //     });

    //     it("handles boolean children gracefully", () => {
    //         render(<Button>{true}</Button>);
    //         expect(screen.getByRole("button")).toBeInTheDocument();
    //     });

    //     it("handles number children", () => {
    //         render(<Button>{42}</Button>);
    //         expect(
    //             screen.getByRole("button", { name: "42" }),
    //         ).toBeInTheDocument();
    //     });

    //     it("handles very long text", () => {
    //         const longText = "A".repeat(1000);
    //         render(<Button>{longText}</Button>);
    //         expect(screen.getByRole("button")).toHaveTextContent(longText);
    //     });

    //     it("handles special characters in children", () => {
    //         render(<Button>{"<>&\"'"}</Button>);
    //         expect(screen.getByRole("button")).toHaveTextContent("<>&\"'");
    //     });
    // });

    // // ==================== COMBINATION TESTS ====================
    // describe("Prop Combinations", () => {
    //     it("handles disabled + loading together", () => {
    //         render(
    //             <Button disabled loading>
    //                 Both
    //             </Button>,
    //         );
    //         const button = screen.getByRole("button");
    //         expect(button).toBeDisabled();
    //         expect(button).toHaveAttribute("aria-busy", "true");
    //     });

    //     it("handles all size and variant combinations", () => {
    //         const variants = [
    //             "primary",
    //             "secondary",
    //             "outline",
    //             "ghost",
    //             "danger",
    //         ] as const;
    //         const sizes = ["sm", "md", "lg"] as const;

    //         variants.forEach((variant) => {
    //             sizes.forEach((size) => {
    //                 const { unmount } = render(
    //                     <Button variant={variant} size={size}>
    //                         {variant}-{size}
    //                     </Button>,
    //                 );
    //                 expect(screen.getByRole("button")).toBeInTheDocument();
    //                 unmount();
    //             });
    //         });
    //     });

    //     it("handles fullWidth with different sizes", () => {
    //         const sizes = ["sm", "md", "lg"] as const;

    //         sizes.forEach((size) => {
    //             const { unmount } = render(
    //                 <Button fullWidth size={size}>
    //                     Full {size}
    //                 </Button>,
    //             );
    //             expect(screen.getByRole("button")).toHaveStyle({
    //                 width: "100%",
    //             });
    //             unmount();
    //         });
    //     });
    // });

    // // ==================== PERFORMANCE ====================
    // describe("Performance", () => {
    //     it("does not re-render unnecessarily", () => {
    //         const renderSpy = vi.fn();

    //         const TestButton = (props: any) => {
    //             renderSpy();
    //             return <Button {...props}>Test</Button>;
    //         };

    //         const { rerender } = render(<TestButton />);
    //         expect(renderSpy).toHaveBeenCalledTimes(1);

    //         // Re-render with same props should not cause button to re-render
    //         rerender(<TestButton />);
    //         // Note: This test depends on your memoization strategy
    //     });
    // });
});
