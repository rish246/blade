import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Modal from ".";
import { ThemeProvider } from "../../theme/theme-provider";

/** Utility to render modal within theme context */
const renderWithTheme = (ui: React.ReactNode) =>
    render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);

describe("Modal", () => {
    // ==================== RENDERING ====================
    describe("Rendering", () => {
        it("renders modal when isOpen is true", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}}>
                    Modal content
                </Modal>,
            );
            expect(screen.getByText("Modal content")).toBeInTheDocument();
        });

        it("does not render modal when isOpen is false", () => {
            renderWithTheme(
                <Modal isOpen={false} onClose={() => {}}>
                    Modal content
                </Modal>,
            );
            expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
        });

        it("renders with title", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}} title="Modal Title">
                    Content
                </Modal>,
            );
            expect(screen.getByText("Modal Title")).toBeInTheDocument();
        });

        it("renders with footer", () => {
            renderWithTheme(
                <Modal
                    isOpen={true}
                    onClose={() => {}}
                    footer={<button>Action</button>}
                >
                    Content
                </Modal>,
            );
            expect(
                screen.getByRole("button", { name: "Action" }),
            ).toBeInTheDocument();
        });
    });

    // ==================== CLOSE BUTTON ====================
    describe("Close Button", () => {
        it("shows close button by default", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(
                screen.getByRole("button", { name: /close modal/i }),
            ).toBeInTheDocument();
        });

        it("calls onClose when close button is clicked", () => {
            const handleClose = vi.fn();
            renderWithTheme(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            fireEvent.click(
                screen.getByRole("button", { name: /close modal/i }),
            );
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
    });

    // ==================== OVERLAY CLICK ====================
    describe("Overlay Click", () => {
        it("closes modal when overlay is clicked by default", () => {
            const handleClose = vi.fn();
            renderWithTheme(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            fireEvent.click(screen.getByRole("dialog"));
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("does not close on overlay click when closeOnOverlayClick is false", () => {
            const handleClose = vi.fn();
            renderWithTheme(
                <Modal
                    isOpen={true}
                    onClose={handleClose}
                    closeOnOverlayClick={false}
                >
                    Content
                </Modal>,
            );
            fireEvent.click(screen.getByRole("dialog"));
            expect(handleClose).not.toHaveBeenCalled();
        });
    });

    // ==================== ESC KEY ====================
    describe("ESC Key", () => {
        it("closes modal when ESC is pressed", () => {
            const handleClose = vi.fn();
            renderWithTheme(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("does not close when closeOnEsc is false", () => {
            const handleClose = vi.fn();
            renderWithTheme(
                <Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>
                    Content
                </Modal>,
            );
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).not.toHaveBeenCalled();
        });
    });

    // ==================== SIZES ====================
    describe("Sizes", () => {
        it.each([
            ["sm", "400px"],
            ["md", "600px"],
            ["lg", "800px"],
            ["xl", "1200px"],
        ])("applies %s size correctly", (size, expectedWidth) => {
            const { container } = renderWithTheme(
                <Modal isOpen={true} onClose={() => {}} size={size as any}>
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxWidth: expectedWidth });
        });

        it("applies full size", () => {
            const { container } = renderWithTheme(
                <Modal isOpen={true} onClose={() => {}} size="full">
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({
                maxWidth: "100%",
                width: "100%",
                height: "100%",
            });
        });
    });

    // ==================== BODY SCROLL LOCK ====================
    describe("Body Scroll Lock", () => {
        beforeEach(() => {
            document.body.style.overflow = "";
        });

        afterEach(() => {
            document.body.style.overflow = "";
        });

        it("prevents body scroll when open", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(document.body.style.overflow).toBe("hidden");
        });

        it("restores body scroll when closed", () => {
            const { rerender } = renderWithTheme(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(document.body.style.overflow).toBe("hidden");
            rerender(
                <ThemeProvider initialTheme="light">
                    <Modal isOpen={false} onClose={() => {}}>
                        Content
                    </Modal>
                </ThemeProvider>,
            );
            expect(document.body.style.overflow).toBe("unset");
        });
    });

    // ==================== ACCESSIBILITY ====================
    describe("Accessibility", () => {
        it("has dialog role and aria-modal", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveAttribute("aria-modal", "true");
        });

        it("sets aria-labelledby when title provided", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}} title="Modal Title">
                    Content
                </Modal>,
            );
            const dialog = screen.getByRole("dialog");
            const heading = screen.getByText("Modal Title");
            expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
        });
    });

    // ==================== CUSTOM STYLING ====================
    describe("Custom Styling", () => {
        it("applies custom className", () => {
            const { container } = renderWithTheme(
                <Modal
                    isOpen={true}
                    onClose={() => {}}
                    className="custom-modal"
                >
                    Content
                </Modal>,
            );
            const modal = container.querySelector(".custom-modal");
            expect(modal).toBeInTheDocument();
        });
    });

    // ==================== EDGE CASES ====================
    describe("Edge Cases", () => {
        it("handles null children gracefully", () => {
            renderWithTheme(
                <Modal isOpen={true} onClose={() => {}}>
                    {null}
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("handles multiple onClose triggers", () => {
            const handleClose = vi.fn();
            renderWithTheme(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            const closeBtn = screen.getByRole("button", {
                name: /close modal/i,
            });
            fireEvent.click(closeBtn);
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).toHaveBeenCalledTimes(2);
        });
    });
});
