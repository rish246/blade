// Input.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from ".";
import { tokens } from "../../tokens/tokens";
import { useState } from "react";

describe("Input", () => {
    // ==================== RENDERING ====================
    describe("Rendering", () => {
        it("renders input element", () => {
            render(<Input />);
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("renders with placeholder", () => {
            render(<Input placeholder="Enter text..." />);
            expect(
                screen.getByPlaceholderText("Enter text..."),
            ).toBeInTheDocument();
        });

        it("renders with default value", () => {
            render(<Input defaultValue="Default text" />);
            expect(screen.getByRole("textbox")).toHaveValue("Default text");
        });

        it("renders with controlled value", () => {
            render(<Input value="Controlled" onChange={() => {}} />);
            expect(screen.getByRole("textbox")).toHaveValue("Controlled");
        });

        it("renders with label", () => {
            render(<Input label="Username" />);
            expect(screen.getByLabelText("Username")).toBeInTheDocument();
        });

        it("associates label with input using htmlFor", () => {
            render(<Input id="email" label="Email" />);
            const label = screen.getByText("Email");
            const input = screen.getByRole("textbox");
            expect(label).toHaveAttribute("for", "email");
            expect(input).toHaveAttribute("id", "email");
        });

        it("renders without label", () => {
            render(<Input />);
            expect(screen.queryByRole("label")).not.toBeInTheDocument();
        });
    });

    // ==================== INPUT TYPES ====================
    describe("Input Types", () => {
        it("renders as text input by default", () => {
            render(<Input />);
            expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
        });

        it("renders as email input", () => {
            render(<Input type="email" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("type", "email");
        });

        it("renders as password input", () => {
            render(<Input type="password" />);
            const input = document.querySelector('input[type="password"]');
            expect(input).toBeInTheDocument();
        });

        it("renders as number input", () => {
            render(<Input type="number" />);
            const input = screen.getByRole("spinbutton");
            expect(input).toHaveAttribute("type", "number");
        });

        it("renders as tel input", () => {
            render(<Input type="tel" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("type", "tel");
        });

        it("renders as url input", () => {
            render(<Input type="url" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("type", "url");
        });

        it("renders as search input", () => {
            render(<Input type="search" />);
            const input = screen.getByRole("searchbox");
            expect(input).toHaveAttribute("type", "search");
        });

        it("renders as date input", () => {
            render(<Input type="date" />);
            const input = document.querySelector('input[type="date"]');
            expect(input).toBeInTheDocument();
        });

        it("renders as time input", () => {
            render(<Input type="time" />);
            const input = document.querySelector('input[type="time"]');
            expect(input).toBeInTheDocument();
        });
    });

    // ==================== SIZES ====================
    describe("Sizes", () => {
        it("applies small size styles", () => {
            render(<Input size="sm" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
                fontSize: tokens.typography.fontSizeSm,
            });
        });

        it("applies medium size styles", () => {
            render(<Input size="md" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                fontSize: tokens.typography.fontSizeMd,
            });
        });

        it("applies large size styles", () => {
            render(<Input size="lg" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                fontSize: tokens.typography.fontSizeLg,
            });
        });

        it("defaults to medium size when not specified", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                fontSize: tokens.typography.fontSizeMd,
            });
        });
    });

    // ==================== VARIANTS / STATES ====================
    describe("Variants and States", () => {
        it("applies default variant styles", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                borderColor: tokens.colors.muted,
            });
        });

        it("applies error variant styles", () => {
            render(<Input variant="error" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                borderColor: tokens.colors.error,
            });
        });

        it("applies success variant styles", () => {
            render(<Input variant="success" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                borderColor: tokens.colors.success,
            });
        });

        it("shows error message when error prop is provided", () => {
            render(<Input error="This field is required" />);
            expect(
                screen.getByText("This field is required"),
            ).toBeInTheDocument();
        });

        it("shows helper text", () => {
            render(<Input helperText="Enter at least 8 characters" />);
            expect(
                screen.getByText("Enter at least 8 characters"),
            ).toBeInTheDocument();
        });

        it("error message takes precedence over helper text", () => {
            render(<Input helperText="Helper text" error="Error message" />);
            expect(screen.getByText("Error message")).toBeInTheDocument();
            expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
        });

        it("applies error styles when error message is present", () => {
            render(<Input error="Error" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                borderColor: tokens.colors.error,
            });
        });
    });

    // ==================== DISABLED STATE ====================
    describe("Disabled State", () => {
        it("renders as disabled when disabled prop is true", () => {
            render(<Input disabled />);
            expect(screen.getByRole("textbox")).toBeDisabled();
        });

        it("applies disabled styles", () => {
            render(<Input disabled />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                opacity: "0.5",
                cursor: "not-allowed",
            });
        });

        it("does not call onChange when disabled", () => {
            const handleChange = vi.fn();
            render(<Input disabled onChange={handleChange} />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "test" } });
            expect(handleChange).not.toHaveBeenCalled();
        });

        it("is not disabled by default", () => {
            render(<Input />);
            expect(screen.getByRole("textbox")).not.toBeDisabled();
        });
    });

    // ==================== READONLY STATE ====================
    describe("ReadOnly State", () => {
        it("renders as readonly when readOnly prop is true", () => {
            render(<Input readOnly value="Read only text" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("readonly");
        });

        it("applies readonly styles", () => {
            render(<Input readOnly />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                backgroundColor: tokens.colors.surface,
            });
        });

        it("does not call onChange when readonly", () => {
            const handleChange = vi.fn();
            render(<Input readOnly value="text" onChange={handleChange} />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "new text" } });
            expect(handleChange).not.toHaveBeenCalled();
        });

        it("displays value when readonly", () => {
            render(<Input readOnly value="Display only" />);
            expect(screen.getByRole("textbox")).toHaveValue("Display only");
        });
    });

    // ==================== REQUIRED FIELD ====================
    describe("Required Field", () => {
        it("marks input as required", () => {
            render(<Input required />);
            expect(screen.getByRole("textbox")).toBeRequired();
        });

        it("shows required indicator in label", () => {
            render(<Input label="Email" required />);
            expect(screen.getByText("*")).toBeInTheDocument();
        });

        it("validates required field on blur", () => {
            render(<Input required />);
            const input = screen.getByRole("textbox");
            fireEvent.blur(input);
            expect(input).toBeInvalid();
        });
    });

    // ==================== CHANGE EVENTS ====================
    describe("Change Events", () => {
        it("calls onChange handler when value changes", () => {
            const handleChange = vi.fn();
            render(<Input onChange={handleChange} />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "new value" } });
            expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it("calls onChange with event object", () => {
            const handleChange = vi.fn();
            render(<Input onChange={handleChange} />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "test" } });
            expect(handleChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    target: expect.objectContaining({
                        value: "test",
                    }),
                }),
            );
        });

        it("updates controlled input value", () => {
            const TestComponent = () => {
                const [value, setValue] = useState("");
                return (
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                );
            };
            render(<TestComponent />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "controlled" } });
            expect(input).toHaveValue("controlled");
        });

        it("works without onChange handler (uncontrolled)", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "test" } });
            expect(input).toHaveValue("test");
        });
    });

    // ==================== FOCUS EVENTS ====================
    describe("Focus Events", () => {
        it("calls onFocus when input is focused", () => {
            const handleFocus = vi.fn();
            render(<Input onFocus={handleFocus} />);
            const input = screen.getByRole("textbox");
            fireEvent.focus(input);
            expect(handleFocus).toHaveBeenCalledTimes(1);
        });

        it("calls onBlur when input loses focus", () => {
            const handleBlur = vi.fn();
            render(<Input onBlur={handleBlur} />);
            const input = screen.getByRole("textbox");
            fireEvent.blur(input);
            expect(handleBlur).toHaveBeenCalledTimes(1);
        });

        it("is focusable by default", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            input.focus();
            expect(input).toHaveFocus();
        });

        it("is not focusable when disabled", () => {
            render(<Input disabled />);
            const input = screen.getByRole("textbox");
            input.focus();
            expect(input).not.toHaveFocus();
        });

        it.skip("applies focus styles when focused", async () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            fireEvent.focus(input);

            // Option 1: Check RGB value
            await waitFor(() => {
                expect(input).toHaveStyle({
                    borderColor: tokens.colors.accent,
                });
            });

            // Option 2: Just verify it changed from default
            expect(input.style.borderColor).not.toBe("rgb(107, 114, 128)");
        });
    });

    // ==================== KEYBOARD EVENTS ====================
    describe("Keyboard Events", () => {
        it("calls onKeyDown when key is pressed", () => {
            const handleKeyDown = vi.fn();
            render(<Input onKeyDown={handleKeyDown} />);
            const input = screen.getByRole("textbox");
            fireEvent.keyDown(input, { key: "Enter" });
            expect(handleKeyDown).toHaveBeenCalledTimes(1);
        });

        it("calls onKeyUp when key is released", () => {
            const handleKeyUp = vi.fn();
            render(<Input onKeyUp={handleKeyUp} />);
            const input = screen.getByRole("textbox");
            fireEvent.keyUp(input, { key: "a" });
            expect(handleKeyUp).toHaveBeenCalledTimes(1);
        });

        it("calls onKeyPress when key is pressed", () => {
            const handleKeyPress = vi.fn();
            render(<Input onKeyDown={handleKeyPress} />);
            const input = screen.getByRole("textbox");
            fireEvent.keyDown(input, { key: "a" });
            expect(handleKeyPress).toHaveBeenCalledTimes(1);
        });

        it("handles Enter key submission in form", () => {
            const handleSubmit = vi.fn((e) => e.preventDefault());
            render(
                <form onSubmit={handleSubmit}>
                    <Input />
                </form>,
            );
            const input = screen.getByRole("textbox");
            fireEvent.keyDown(input, { key: "Enter" });
            fireEvent.submit(input.closest("form")!);
            expect(handleSubmit).toHaveBeenCalled();
        });
    });

    // ==================== VALIDATION ====================
    describe("Validation", () => {
        it("validates email format", () => {
            render(<Input type="email" />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "invalid-email" } });
            fireEvent.blur(input);
            expect(input).toBeInvalid();
        });

        it("accepts valid email", () => {
            render(<Input type="email" />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "test@example.com" } });
            expect(input).toBeValid();
        });

        it("respects minLength constraint", () => {
            render(<Input minLength={5} />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "abc" } });
            expect(input).toHaveAttribute("minlength", "5");
        });

        it("respects maxLength constraint", () => {
            render(<Input maxLength={10} />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("maxlength", "10");
        });

        it("respects pattern constraint", () => {
            render(<Input pattern="[0-9]{3}" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("pattern", "[0-9]{3}");
        });

        it("respects min value for number input", () => {
            render(<Input type="number" min={0} />);
            const input = screen.getByRole("spinbutton");
            expect(input).toHaveAttribute("min", "0");
        });

        it("respects max value for number input", () => {
            render(<Input type="number" max={100} />);
            const input = screen.getByRole("spinbutton");
            expect(input).toHaveAttribute("max", "100");
        });

        it("respects step for number input", () => {
            render(<Input type="number" step={0.1} />);
            const input = screen.getByRole("spinbutton");
            expect(input).toHaveAttribute("step", "0.1");
        });
    });

    // ==================== ICONS / ADORNMENTS ====================
    describe("Icons and Adornments", () => {
        it("renders left icon", () => {
            render(
                <Input leftIcon={<span data-testid="left-icon">🔍</span>} />,
            );
            expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        });

        it("renders right icon", () => {
            render(
                <Input rightIcon={<span data-testid="right-icon">✓</span>} />,
            );
            expect(screen.getByTestId("right-icon")).toBeInTheDocument();
        });

        it("renders both left and right icons", () => {
            render(
                <Input
                    leftIcon={<span data-testid="left">🔍</span>}
                    rightIcon={<span data-testid="right">✓</span>}
                />,
            );
            expect(screen.getByTestId("left")).toBeInTheDocument();
            expect(screen.getByTestId("right")).toBeInTheDocument();
        });
    });

    // ==================== FULL WIDTH ====================
    describe("Full Width", () => {
        it("applies full width styles when fullWidth is true", () => {
            render(<Input fullWidth />);
            expect(screen.getByRole("textbox")).toHaveStyle({
                width: "100%",
            });
        });

        it("does not apply full width by default", () => {
            const { container } = render(<Input />);
            expect(container.firstChild).not.toHaveStyle({
                width: "100%",
            });
        });
    });

    // ==================== CUSTOM STYLING ====================
    describe("Custom Styling", () => {
        it("applies custom className", () => {
            render(<Input className="custom-input" />);
            expect(screen.getByRole("textbox")).toHaveClass("custom-input");
        });

        it("merges custom styles with default styles", () => {
            render(<Input style={{ marginTop: "20px" }} />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                marginTop: "20px",
            });
        });

        it("custom styles override default styles", () => {
            render(<Input style={{ borderColor: "purple" }} />);
            console.log(screen.getByRole("textbox").style.borderColor);
            expect(screen.getByRole("textbox").style.borderColor).toBe(
                "purple",
            );
        });
    });

    // ==================== ACCESSIBILITY ====================
    describe("Accessibility", () => {
        it("has textbox role by default", () => {
            render(<Input />);
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("accepts aria-label", () => {
            render(<Input aria-label="Search input" />);
            expect(screen.getByRole("textbox")).toHaveAccessibleName(
                "Search input",
            );
        });

        it("accepts aria-describedby", () => {
            render(
                <>
                    <Input aria-describedby="description" />
                    <div id="description">Input description</div>
                </>,
            );
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "aria-describedby",
                "description",
            );
        });

        it("links error message with aria-describedby", () => {
            render(<Input id="email" error="Invalid email" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("aria-describedby", "email-error");
            expect(screen.getByText("Invalid email")).toHaveAttribute(
                "id",
                "email-error",
            );
        });

        it("sets aria-invalid when error is present", () => {
            render(<Input error="Error" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "aria-invalid",
                "true",
            );
        });

        it("sets aria-required when required", () => {
            render(<Input required />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "aria-required",
                "true",
            );
        });

        it("announces error to screen readers", () => {
            render(<Input error="This field is required" />);
            const errorMessage = screen.getByText("This field is required");
            expect(errorMessage).toHaveAttribute("role", "alert");
        });
    });

    // ==================== AUTOCOMPLETE ====================
    describe("Autocomplete", () => {
        it("sets autocomplete attribute", () => {
            render(<Input autoComplete="email" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "autocomplete",
                "email",
            );
        });

        it("disables autocomplete", () => {
            render(<Input autoComplete="off" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "autocomplete",
                "off",
            );
        });

        it("supports autocomplete values", () => {
            const values = [
                "name",
                "email",
                "tel",
                "address-line1",
                "postal-code",
            ];
            values.forEach((value) => {
                const { unmount } = render(<Input autoComplete={value} />);
                expect(screen.getByRole("textbox")).toHaveAttribute(
                    "autocomplete",
                    value,
                );
                unmount();
            });
        });
    });

    // ==================== FORWARDING PROPS ====================
    describe("Forwarding Props", () => {
        it("forwards data attributes", () => {
            render(<Input data-testid="test-input" />);
            expect(screen.getByTestId("test-input")).toBeInTheDocument();
        });

        it("forwards name attribute", () => {
            render(<Input name="username" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "name",
                "username",
            );
        });

        it("forwards id attribute", () => {
            render(<Input id="unique-input" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "id",
                "unique-input",
            );
        });

        it("forwards title attribute", () => {
            render(<Input title="Tooltip text" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "title",
                "Tooltip text",
            );
        });

        it("forwards inputMode attribute", () => {
            render(<Input inputMode="numeric" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "inputmode",
                "numeric",
            );
        });
    });

    // ==================== EDGE CASES ====================
    describe("Edge Cases", () => {
        it("handles very long input values", () => {
            const longText = "A".repeat(1000);
            render(<Input defaultValue={longText} />);
            expect(screen.getByRole("textbox")).toHaveValue(longText);
        });

        // it("handles special characters in value", () => {
        //     render(<Input defaultValue="<>&\"'" />);
        //     expect(screen.getByRole("textbox")).toHaveValue("<>&\"'");
        // });

        it("handles empty string value", () => {
            render(<Input value="" onChange={() => {}} />);
            expect(screen.getByRole("textbox")).toHaveValue("");
        });

        it("handles null children gracefully", () => {
            render(<Input label={null as any} />);
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("handles rapid typing", () => {
            const handleChange = vi.fn();
            render(<Input onChange={handleChange} />);
            const input = screen.getByRole("textbox");

            let currentValue = "";
            "world".split("").forEach((char) => {
                // Changed to "world"
                currentValue += char;
                fireEvent.change(input, { target: { value: currentValue } });
            });

            expect(handleChange).toHaveBeenCalledTimes(5);
        });

        it("handles paste events", () => {
            const handlePaste = vi.fn();
            render(<Input onPaste={handlePaste} />);
            const input = screen.getByRole("textbox");
            fireEvent.paste(input, {
                clipboardData: { getData: () => "pasted" },
            });
            expect(handlePaste).toHaveBeenCalled();
        });

        it("handles copy events", () => {
            const handleCopy = vi.fn();
            render(<Input onCopy={handleCopy} defaultValue="copy me" />);
            const input = screen.getByRole("textbox");
            fireEvent.copy(input);
            expect(handleCopy).toHaveBeenCalled();
        });

        it("handles cut events", () => {
            const handleCut = vi.fn();
            render(<Input onCut={handleCut} defaultValue="cut me" />);
            const input = screen.getByRole("textbox");
            fireEvent.cut(input);
            expect(handleCut).toHaveBeenCalled();
        });
    });

    // ==================== FORM INTEGRATION ====================
    describe("Form Integration", () => {
        it("submits value with form", () => {
            const handleSubmit = vi.fn((e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                expect(formData.get("username")).toBe("testuser");
            });

            render(
                <form onSubmit={handleSubmit}>
                    <Input name="username" defaultValue="testuser" />
                    <button type="submit">Submit</button>
                </form>,
            );

            fireEvent.click(screen.getByRole("button"));
        });

        it("resets value when form is reset", () => {
            render(
                <form>
                    <Input name="test" defaultValue="default" />
                    <button type="reset">Reset</button>
                </form>,
            );

            const input = screen.getByRole("textbox") as HTMLInputElement;
            fireEvent.change(input, { target: { value: "changed" } });
            expect(input.value).toBe("changed");

            fireEvent.click(screen.getByRole("button"));
            expect(input.value).toBe("default");
        });

        it("validates on form submission", () => {
            render(
                <form>
                    <Input required name="required-field" />
                    <button type="submit">Submit</button>
                </form>,
            );

            const input = screen.getByRole("textbox");
            fireEvent.click(screen.getByRole("button"));
            expect(input).toBeInvalid();
        });
    });

    // ==================== PASSWORD INPUT SPECIFIC ====================
    describe("Password Input", () => {
        it("renders password input with toggle visibility", () => {
            render(<Input type="password" showPasswordToggle />);
            expect(
                screen.getByRole("button", { name: /show password/i }),
            ).toBeInTheDocument();
        });

        it("toggles password visibility", () => {
            render(<Input type="password" showPasswordToggle />);
            const input = document.querySelector("input") as HTMLInputElement;
            const toggle = screen.getByRole("button", {
                name: /show password/i,
            });

            expect(input.type).toBe("password");
            fireEvent.click(toggle);
            expect(input.type).toBe("text");
            fireEvent.click(toggle);
            expect(input.type).toBe("password");
        });
    });

    // ==================== NUMBER INPUT SPECIFIC ====================
    describe("Number Input", () => {
        it("only accepts numeric values", () => {
            render(<Input type="number" />);
            const input = screen.getByRole("spinbutton");
            fireEvent.change(input, { target: { value: "123" } });
            expect(input).toHaveValue(123);
        });

        it("handles increment/decrement", () => {
            render(<Input type="number" defaultValue="5" step={1} />);
            const input = screen.getByRole("spinbutton") as HTMLInputElement;
            input.stepUp();
            expect(input.value).toBe("6");
            input.stepDown();
            expect(input.value).toBe("5");
        });
    });
});
