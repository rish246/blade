import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from ".";
import { ThemeProvider } from "../../theme/theme-provider";
import { useState } from "react";

/* Helper for theme-wrapped render */
const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);
};

describe("Input", () => {
    /* ==================== RENDERING ==================== */
    describe("Rendering", () => {
        it("renders input element", () => {
            renderWithTheme(<Input />);
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("renders with placeholder", () => {
            renderWithTheme(<Input placeholder="Enter text..." />);
            expect(
                screen.getByPlaceholderText("Enter text..."),
            ).toBeInTheDocument();
        });

        it("renders with default value", () => {
            renderWithTheme(<Input defaultValue="Default text" />);
            expect(screen.getByRole("textbox")).toHaveValue("Default text");
        });

        it("renders with controlled value", () => {
            renderWithTheme(<Input value="Controlled" onChange={() => {}} />);
            expect(screen.getByRole("textbox")).toHaveValue("Controlled");
        });

        it("renders with label", () => {
            renderWithTheme(<Input label="Username" />);
            expect(screen.getByLabelText("Username")).toBeInTheDocument();
        });

        it("associates label with input using htmlFor", () => {
            renderWithTheme(<Input id="email" label="Email" />);
            const label = screen.getByText("Email");
            const input = screen.getByRole("textbox");
            expect(label).toHaveAttribute("for", "email");
            expect(input).toHaveAttribute("id", "email");
        });

        it("renders without label", () => {
            renderWithTheme(<Input />);
            expect(screen.queryByRole("label")).not.toBeInTheDocument();
        });
    });

    /* ==================== INPUT TYPES ==================== */
    describe("Input Types", () => {
        it("renders as text input by default", () => {
            renderWithTheme(<Input />);
            expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
        });

        it("renders as email input", () => {
            renderWithTheme(<Input type="email" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("type", "email");
        });

        it("renders as password input", () => {
            renderWithTheme(<Input type="password" />);
            const input = document.querySelector('input[type="password"]');
            expect(input).toBeInTheDocument();
        });

        it("renders as number input", () => {
            renderWithTheme(<Input type="number" />);
            const input = screen.getByRole("spinbutton");
            expect(input).toHaveAttribute("type", "number");
        });
    });

    /* ==================== SIZES ==================== */
    describe("Sizes", () => {
        it("applies small size styles", () => {
            renderWithTheme(<Input size="sm" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({ fontSize: "14px" });
        });

        it("applies medium size styles", () => {
            renderWithTheme(<Input size="md" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({ fontSize: "16px" });
        });

        it("applies large size styles", () => {
            renderWithTheme(<Input size="lg" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({ fontSize: "20px" });
        });
    });

    /* ==================== VARIANTS / STATES ==================== */
    describe("Variants and States", () => {
        it("applies default variant styles", () => {
            renderWithTheme(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({ borderColor: "#6b7280" }); // muted
        });

        it("applies error variant styles", () => {
            renderWithTheme(<Input variant="error" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({ borderColor: "#ef4444" });
        });

        it("applies success variant styles", () => {
            renderWithTheme(<Input variant="success" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({ borderColor: "#10b981" });
        });

        it("shows error message when error prop is provided", () => {
            renderWithTheme(<Input error="This field is required" />);
            expect(
                screen.getByText("This field is required"),
            ).toBeInTheDocument();
        });
    });

    /* ==================== DISABLED STATE ==================== */
    describe("Disabled State", () => {
        it("renders as disabled", () => {
            renderWithTheme(<Input disabled />);
            expect(screen.getByRole("textbox")).toBeDisabled();
        });

        it("applies disabled styles", () => {
            renderWithTheme(<Input disabled />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveStyle({
                opacity: "0.5",
                cursor: "not-allowed",
            });
        });
    });

    /* ==================== CHANGE EVENTS ==================== */
    describe("Change Events", () => {
        it("calls onChange handler when value changes", () => {
            const handleChange = vi.fn();
            renderWithTheme(<Input onChange={handleChange} />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "new value" } });
            expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it("updates controlled input value", () => {
            const TestComp = () => {
                const [val, setVal] = useState("");
                return (
                    <Input
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                    />
                );
            };
            renderWithTheme(<TestComp />);
            const input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: "controlled" } });
            expect(input).toHaveValue("controlled");
        });
    });

    /* ==================== FOCUS EVENTS ==================== */
    describe("Focus Events", () => {
        it("calls onFocus when focused", () => {
            const handleFocus = vi.fn();
            renderWithTheme(<Input onFocus={handleFocus} />);
            const input = screen.getByRole("textbox");
            fireEvent.focus(input);
            expect(handleFocus).toHaveBeenCalledTimes(1);
        });
    });

    /* ==================== ACCESSIBILITY ==================== */
    describe("Accessibility", () => {
        it("has textbox role by default", () => {
            renderWithTheme(<Input />);
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("sets aria-invalid when error is present", () => {
            renderWithTheme(<Input error="Error" />);
            expect(screen.getByRole("textbox")).toHaveAttribute(
                "aria-invalid",
                "true",
            );
        });

        it("links error message with aria-describedby", () => {
            renderWithTheme(<Input id="email" error="Invalid email" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("aria-describedby", "email-error");
            expect(screen.getByText("Invalid email")).toHaveAttribute(
                "id",
                "email-error",
            );
        });
    });
});
