// Modal.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Modal from ".";

describe("Modal", () => {
    // ==================== RENDERING ====================
    describe("Rendering", () => {
        it("renders modal when isOpen is true", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Modal content
                </Modal>,
            );
            expect(screen.getByText("Modal content")).toBeInTheDocument();
        });

        it("does not render modal when isOpen is false", () => {
            render(
                <Modal isOpen={false} onClose={() => {}}>
                    Modal content
                </Modal>,
            );
            expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
        });

        it("renders with title", () => {
            render(
                <Modal isOpen={true} onClose={() => {}} title="Modal Title">
                    Content
                </Modal>,
            );
            expect(screen.getByText("Modal Title")).toBeInTheDocument();
        });

        it("renders without title", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.queryByRole("heading")).not.toBeInTheDocument();
        });

        it("renders with footer", () => {
            render(
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

        it("renders without footer", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            // Only close button should exist if showCloseButton is true
            const buttons = screen.getAllByRole("button");
            expect(buttons).toHaveLength(1); // Only close button
        });

        it("renders complex children", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    <div data-testid="complex">
                        <h3>Heading</h3>
                        <p>Paragraph</p>
                    </div>
                </Modal>,
            );
            expect(screen.getByTestId("complex")).toBeInTheDocument();
        });
    });

    // ==================== CLOSE BUTTON ====================
    describe("Close Button", () => {
        it("shows close button by default", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(
                screen.getByRole("button", { name: /close modal/i }),
            ).toBeInTheDocument();
        });

        it("hides close button when showCloseButton is false", () => {
            render(
                <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
                    Content
                </Modal>,
            );
            expect(
                screen.queryByRole("button", { name: /close modal/i }),
            ).not.toBeInTheDocument();
        });

        it("calls onClose when close button is clicked", () => {
            const handleClose = vi.fn();
            render(
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
            render(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            const dialog = screen.getByRole("dialog");
            fireEvent.click(dialog);
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("does not close when content is clicked", () => {
            const handleClose = vi.fn();
            render(
                <Modal isOpen={true} onClose={handleClose}>
                    <div data-testid="content">Content</div>
                </Modal>,
            );
            fireEvent.click(screen.getByTestId("content"));
            expect(handleClose).not.toHaveBeenCalled();
        });

        it("does not close on overlay click when closeOnOverlayClick is false", () => {
            const handleClose = vi.fn();
            render(
                <Modal
                    isOpen={true}
                    onClose={handleClose}
                    closeOnOverlayClick={false}
                >
                    Content
                </Modal>,
            );
            const dialog = screen.getByRole("dialog");
            fireEvent.click(dialog);
            expect(handleClose).not.toHaveBeenCalled();
        });
    });

    // ==================== ESC KEY ====================
    describe("ESC Key", () => {
        it("closes modal when ESC is pressed by default", () => {
            const handleClose = vi.fn();
            render(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("does not close on ESC when closeOnEsc is false", () => {
            const handleClose = vi.fn();
            render(
                <Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>
                    Content
                </Modal>,
            );
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).not.toHaveBeenCalled();
        });

        it("does not respond to other keys", () => {
            const handleClose = vi.fn();
            render(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            fireEvent.keyDown(document, { key: "Enter" });
            fireEvent.keyDown(document, { key: "a" });
            expect(handleClose).not.toHaveBeenCalled();
        });

        it("cleans up event listener when unmounted", () => {
            const handleClose = vi.fn();
            const { unmount } = render(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            unmount();
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).not.toHaveBeenCalled();
        });
    });

    // ==================== SIZES ====================
    describe("Sizes", () => {
        it("applies small size", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}} size="sm">
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxWidth: "400px" });
        });

        it("applies medium size", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}} size="md">
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxWidth: "600px" });
        });

        it("applies large size", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}} size="lg">
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxWidth: "800px" });
        });

        it("applies extra large size", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}} size="xl">
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxWidth: "1200px" });
        });

        it("applies full size", () => {
            const { container } = render(
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

        it("defaults to medium size", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxWidth: "600px" });
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

        it("prevents body scroll when modal is open", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(document.body.style.overflow).toBe("hidden");
        });

        it("restores body scroll when modal is closed", () => {
            const { rerender } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(document.body.style.overflow).toBe("hidden");

            rerender(
                <Modal isOpen={false} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(document.body.style.overflow).toBe("unset");
        });

        it("restores body scroll when unmounted", () => {
            const { unmount } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(document.body.style.overflow).toBe("hidden");

            unmount();
            expect(document.body.style.overflow).toBe("unset");
        });
    });

    // ==================== ACCESSIBILITY ====================
    describe("Accessibility", () => {
        it("has dialog role", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("sets aria-modal to true", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toHaveAttribute(
                "aria-modal",
                "true",
            );
        });

        it("sets aria-labelledby when title is provided", () => {
            render(
                <Modal isOpen={true} onClose={() => {}} title="Modal Title">
                    Content
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toHaveAttribute(
                "aria-labelledby",
                "modal-title",
            );
            expect(screen.getByRole("heading")).toHaveAttribute(
                "id",
                "modal-title",
            );
        });

        it("does not set aria-labelledby when title is not provided", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.getByRole("dialog")).not.toHaveAttribute(
                "aria-labelledby",
            );
        });

        it("close button has aria-label", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(
                screen.getByRole("button", { name: /close modal/i }),
            ).toHaveAttribute("aria-label");
        });

        it("overlay has aria-hidden", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            const overlay = container.querySelector('[aria-hidden="true"]');
            expect(overlay).toBeInTheDocument();
        });
    });

    // ==================== CUSTOM STYLING ====================
    describe("Custom Styling", () => {
        it("applies custom className", () => {
            const { container } = render(
                <Modal
                    isOpen={true}
                    onClose={() => {}}
                    className="custom-modal"
                >
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(".custom-modal");
            expect(modalContent).toBeInTheDocument();
        });
    });

    // ==================== HEADER & FOOTER STRUCTURE ====================
    describe("Header and Footer Structure", () => {
        it("renders header with title and close button", () => {
            render(
                <Modal isOpen={true} onClose={() => {}} title="Test Title">
                    Content
                </Modal>,
            );
            expect(screen.getByText("Test Title")).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: /close modal/i }),
            ).toBeInTheDocument();
        });

        it("renders only close button when no title", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(
                screen.getByRole("button", { name: /close modal/i }),
            ).toBeInTheDocument();
            expect(screen.queryByRole("heading")).not.toBeInTheDocument();
        });

        it("does not render header when no title and showCloseButton is false", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
                    Content
                </Modal>,
            );
            // No header should be rendered
            expect(screen.queryByRole("heading")).not.toBeInTheDocument();
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("footer appears at bottom", () => {
            render(
                <Modal
                    isOpen={true}
                    onClose={() => {}}
                    footer={
                        <button data-testid="footer-btn">Footer Button</button>
                    }
                >
                    <div data-testid="content">Content</div>
                </Modal>,
            );
            const content = screen.getByTestId("content");
            const footerBtn = screen.getByTestId("footer-btn");
            expect(
                content.compareDocumentPosition(footerBtn) &
                    Node.DOCUMENT_POSITION_FOLLOWING,
            ).toBeTruthy();
        });
    });

    // ==================== OVERLAY STYLING ====================
    describe("Overlay", () => {
        it("renders overlay backdrop", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            const overlay = container.querySelector('[aria-hidden="true"]');
            expect(overlay).toHaveStyle({
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            });
        });
    });

    // ==================== SCROLLABLE CONTENT ====================
    describe("Scrollable Content", () => {
        it("body content is scrollable", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    <div data-testid="scrollable">
                        {Array.from({ length: 100 }, (_, i) => (
                            <p key={i}>Line {i}</p>
                        ))}
                    </div>
                </Modal>,
            );
            const scrollable = screen.getByTestId("scrollable").parentElement;
            expect(scrollable).toHaveStyle({ overflowY: "auto" });
        });

        it("modal has max height constraint", () => {
            const { container } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            const modalContent = container.querySelector(
                '[role="dialog"] > div:last-child',
            );
            expect(modalContent).toHaveStyle({ maxHeight: "90vh" });
        });
    });

    // ==================== EDGE CASES ====================
    describe("Edge Cases", () => {
        it("handles null children gracefully", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    {null}
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("handles undefined children gracefully", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    {undefined}
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("handles empty string children", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    {""}
                </Modal>,
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("handles multiple onClose calls", () => {
            const handleClose = vi.fn();
            render(
                <Modal isOpen={true} onClose={handleClose}>
                    Content
                </Modal>,
            );
            const closeBtn = screen.getByRole("button", {
                name: /close modal/i,
            });
            fireEvent.click(closeBtn);
            fireEvent.click(closeBtn);
            fireEvent.keyDown(document, { key: "Escape" });
            expect(handleClose).toHaveBeenCalledTimes(3);
        });

        it("handles very long content", () => {
            const longText = "A".repeat(10000);
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    {longText}
                </Modal>,
            );
            expect(screen.getByText(longText)).toBeInTheDocument();
        });
    });

    // ==================== LIFECYCLE ====================
    describe("Lifecycle", () => {
        it("opens and closes correctly", () => {
            const { rerender } = render(
                <Modal isOpen={false} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.queryByText("Content")).not.toBeInTheDocument();

            rerender(
                <Modal isOpen={true} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.getByText("Content")).toBeInTheDocument();

            rerender(
                <Modal isOpen={false} onClose={() => {}}>
                    Content
                </Modal>,
            );
            expect(screen.queryByText("Content")).not.toBeInTheDocument();
        });

        it("maintains content between open/close cycles", () => {
            const { rerender } = render(
                <Modal isOpen={true} onClose={() => {}}>
                    Original Content
                </Modal>,
            );
            expect(screen.getByText("Original Content")).toBeInTheDocument();

            rerender(
                <Modal isOpen={false} onClose={() => {}}>
                    Original Content
                </Modal>,
            );

            rerender(
                <Modal isOpen={true} onClose={() => {}}>
                    Original Content
                </Modal>,
            );
            expect(screen.getByText("Original Content")).toBeInTheDocument();
        });
    });

    // ==================== COMBINATION TESTS ====================
    describe("Prop Combinations", () => {
        it("handles all sizes with title and footer", () => {
            const sizes = ["sm", "md", "lg", "xl", "full"] as const;
            sizes.forEach((size) => {
                const { unmount } = render(
                    <Modal
                        isOpen={true}
                        onClose={() => {}}
                        size={size}
                        title="Title"
                        footer={<button>Action</button>}
                    >
                        {size} content
                    </Modal>,
                );
                expect(screen.getByText(`${size} content`)).toBeInTheDocument();
                unmount();
            });
        });

        it("handles closeOnOverlayClick false with closeOnEsc false", () => {
            const handleClose = vi.fn();
            render(
                <Modal
                    isOpen={true}
                    onClose={handleClose}
                    closeOnOverlayClick={false}
                    closeOnEsc={false}
                    showCloseButton={false}
                >
                    Content
                </Modal>,
            );

            // Try all close methods
            const dialog = screen.getByRole("dialog");
            fireEvent.click(dialog);
            fireEvent.keyDown(document, { key: "Escape" });

            // Should not close
            expect(handleClose).not.toHaveBeenCalled();
        });

        it("modal with all features enabled", () => {
            const handleClose = vi.fn();
            render(
                <Modal
                    isOpen={true}
                    onClose={handleClose}
                    title="Full Featured Modal"
                    footer={
                        <>
                            <button>Cancel</button>
                            <button>Confirm</button>
                        </>
                    }
                    size="lg"
                    closeOnOverlayClick={true}
                    closeOnEsc={true}
                    showCloseButton={true}
                >
                    <p>Modal with all features</p>
                </Modal>,
            );

            expect(screen.getByText("Full Featured Modal")).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: /close modal/i }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Cancel" }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Confirm" }),
            ).toBeInTheDocument();
        });
    });

    // ==================== FOCUS MANAGEMENT ====================
    describe("Focus Management", () => {
        it("renders focusable elements inside modal", () => {
            render(
                <Modal isOpen={true} onClose={() => {}}>
                    <input type="text" placeholder="Test input" />
                    <button>Test button</button>
                </Modal>,
            );

            expect(
                screen.getByPlaceholderText("Test input"),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "Test button" }),
            ).toBeInTheDocument();
        });
    });
});
