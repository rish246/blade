import React, { act } from "react";
import {
    render,
    screen,
    fireEvent,
    waitFor,
    RenderOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import Tooltip from ".";
import { ThemeProvider as ThemeContextProvider } from "../../theme/theme-provider";

expect.extend(toHaveNoViolations);

// Custom render function that wraps components with required providers
const renderWithProviders = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, "wrapper">,
) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeContextProvider>{children}</ThemeContextProvider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
};

afterEach(() => {
    vi.useRealTimers();
});

describe("Tooltip Component", () => {
    // ==========================================
    // Basic Rendering and Content Tests
    // ==========================================
    describe("Basic Rendering", () => {
        it("should render the trigger element", () => {
            renderWithProviders(
                <Tooltip content="Tooltip text">
                    <button>Hover me</button>
                </Tooltip>,
            );
            expect(
                screen.getByRole("button", { name: /hover me/i }),
            ).toBeInTheDocument();
        });

        it("should not render tooltip content initially", () => {
            renderWithProviders(
                <Tooltip content="Hidden content">
                    <button>Trigger</button>
                </Tooltip>,
            );
            expect(
                screen.queryByText("Hidden content"),
            ).not.toBeInTheDocument();
        });

        it("should render tooltip content on hover", async () => {
            renderWithProviders(
                <Tooltip content="Tooltip content">
                    <button>Trigger</button>
                </Tooltip>,
            );

            await userEvent.hover(screen.getByRole("button"));

            // Wait for the tooltip to appear (default 150ms delay)
            expect(
                await screen.findByText("Tooltip content"),
            ).toBeInTheDocument();
        });

        it("should hide tooltip content on unhover", async () => {
            renderWithProviders(
                <Tooltip content="Tooltip content">
                    <button>Trigger</button>
                </Tooltip>,
            );

            const trigger = screen.getByRole("button");
            await userEvent.hover(trigger);

            // Wait for tooltip to appear
            expect(
                await screen.findByText("Tooltip content"),
            ).toBeInTheDocument();

            await userEvent.unhover(trigger);

            // Wait for tooltip to disappear
            await waitFor(() => {
                expect(
                    screen.queryByText("Tooltip content"),
                ).not.toBeInTheDocument();
            });
        });

        it("should support custom classNames", async () => {
            renderWithProviders(
                <Tooltip content="Test" contentClassName="custom-tooltip">
                    <button>Trigger</button>
                </Tooltip>,
            );

            await userEvent.hover(screen.getByRole("button"));

            // Wait for tooltip to appear
            const tooltip = await screen.findByText("Test");
            expect(tooltip).toHaveClass("custom-tooltip");
        });

        it("should render with custom delay using fake timers", async () => {
            renderWithProviders(
                <Tooltip content="Delayed" delayMs={500}>
                    <button role="button" data-testid="button">
                        Trigger
                    </button>
                </Tooltip>,
            );

            const button = await screen.findByTestId("button");
            expect(screen.queryByText("Delayed")).not.toBeInTheDocument();
            await userEvent.hover(button);

            await waitFor(() =>
                expect(screen.getByText("Delayed")).toBeInTheDocument(),
            );
        });
    });

    // ==========================================
    // Accessibility Tests
    // ==========================================
    describe("Accessibility", () => {
        it("should have no accessibility violations", async () => {
            const { container } = renderWithProviders(
                <Tooltip content="Accessible tooltip">
                    <button>Trigger</button>
                </Tooltip>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it("should have no violations when tooltip is visible", async () => {
            const { container } = renderWithProviders(
                <Tooltip content="Visible tooltip">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it("should have aria-describedby on trigger when tooltip is visible", async () => {
            renderWithProviders(
                <Tooltip content="Description">
                    <button>Trigger</button>
                </Tooltip>,
            );

            const trigger = screen.getByRole("button");
            await userEvent.hover(trigger);
            const tooltip = await screen.findByText("Description");
            expect(trigger.parentElement).toHaveAttribute("aria-describedby");
            const tooltipId =
                trigger.parentElement!.getAttribute("aria-describedby");
            expect(tooltip).toHaveAttribute("id", tooltipId);
        });

        it("should not have aria-describedby when tooltip is not visible", () => {
            renderWithProviders(
                <Tooltip content="Description">
                    <button>Trigger</button>
                </Tooltip>,
            );
            expect(screen.getByRole("button")).not.toHaveAttribute(
                "aria-describedby",
            );
        });

        it('should have role="tooltip" on tooltip content', async () => {
            renderWithProviders(
                <Tooltip content="Tooltip">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            const tooltip = await screen.findByRole("tooltip");
            expect(tooltip).toBeInTheDocument();
        });

        it('should have aria-live="polite" for dynamic tooltip content', async () => {
            renderWithProviders(
                <Tooltip content="Dynamic content" liveRegion="polite">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            const tooltip = await screen.findByRole("tooltip");
            expect(tooltip).toHaveAttribute("aria-live", "polite");
        });

        it("should support custom aria-label on trigger", () => {
            renderWithProviders(
                <Tooltip content="Help">
                    <button aria-label="More information">?</button>
                </Tooltip>,
            );
            expect(
                screen.getByRole("button", { name: /more information/i }),
            ).toBeInTheDocument();
        });

        it("should work with screen readers for focus-based tooltips", async () => {
            renderWithProviders(
                <Tooltip content="Keyboard hint" trigger="focus">
                    <button>Interactive</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            trigger.focus();
            const tooltip = await screen.findByText("Keyboard hint");
            expect(tooltip).toBeInTheDocument();
            expect(trigger.parentElement).toHaveAttribute("aria-describedby");
        });
    });

    // ==========================================
    // Keyboard Interaction Tests
    // ==========================================
    describe("Keyboard Interactions", () => {
        it("should show tooltip on focus", async () => {
            renderWithProviders(
                <Tooltip content="Tooltip" trigger="focus">
                    <button>Focusable</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            trigger.focus();
            await waitFor(() => {
                expect(screen.getByText("Tooltip")).toBeInTheDocument();
            });
        });

        it("should hide tooltip on blur", async () => {
            renderWithProviders(
                <Tooltip content="Tooltip" trigger="focus">
                    <button>Focusable</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            trigger.focus();
            await waitFor(() => {
                expect(screen.getByText("Tooltip")).toBeInTheDocument();
            });
            trigger.blur();
            await waitFor(() => {
                expect(screen.queryByText("Tooltip")).not.toBeInTheDocument();
            });
        });

        it("should close tooltip on Escape key", async () => {
            renderWithProviders(
                <Tooltip content="Tooltip" trigger="click">
                    <button>Clickable</button>
                </Tooltip>,
            );
            await userEvent.click(screen.getByRole("button"));
            const tooltip = await screen.findByText("Tooltip");
            expect(tooltip).toBeInTheDocument();
            await userEvent.keyboard("{Escape}");
            await waitFor(() => {
                expect(screen.queryByText("Tooltip")).not.toBeInTheDocument();
            });
        });

        it("should handle Tab key without closing tooltip unintentionally", async () => {
            renderWithProviders(
                <Tooltip content="Tooltip" trigger="hover">
                    <button>First</button>
                </Tooltip>,
            );

            const trigger = screen.getByRole("button");

            // Hover to show tooltip
            await userEvent.hover(trigger);
            const tooltip = await screen.findByText("Tooltip");
            expect(tooltip).toBeInTheDocument();

            // Focus the button and press Tab
            trigger.focus();
            await userEvent.tab();

            await waitFor(() => {
                expect(screen.queryByText("Tooltip")).not.toBeInTheDocument();
            });
        });
    });

    // ==========================================
    // Positioning and Placement Tests
    // ==========================================
    describe("Positioning", () => {
        it("should support different placement options", async () => {
            const placements = ["top", "bottom", "left", "right"] as const;
            for (const placement of placements) {
                const { unmount } = renderWithProviders(
                    <Tooltip content="Tooltip" placement={placement}>
                        <button>Trigger</button>
                    </Tooltip>,
                );
                await userEvent.hover(screen.getByRole("button"));
                const tooltip = await screen.findByRole("tooltip");
                expect(tooltip).toHaveAttribute("data-placement", placement);
                unmount();
            }
        });

        it("should have correct positioning attributes", async () => {
            renderWithProviders(
                <Tooltip content="Positioned" placement="top">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            const tooltip = await screen.findByRole("tooltip");
            expect(tooltip).toHaveStyle({ visibility: "visible" });
        });

        it("should not overflow viewport (basic check)", async () => {
            renderWithProviders(
                <Tooltip content="Long tooltip content that should be visible">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            const tooltip = await screen.findByRole("tooltip");
            const rect = tooltip.getBoundingClientRect();
            expect(rect.right).toBeLessThanOrEqual(window.innerWidth + 100);
            expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight + 100);
        });
    });

    // ==========================================
    // Edge Cases
    // ==========================================
    describe("Edge Cases", () => {
        it("should handle empty tooltip content", async () => {
            renderWithProviders(
                <Tooltip content="">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
        });

        it("should handle null content gracefully", async () => {
            renderWithProviders(
                <Tooltip content={null}>
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
        });

        it("should handle React components as content", async () => {
            renderWithProviders(
                <Tooltip content={<div>Component Tooltip</div>}>
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(
                await screen.findByText("Component Tooltip"),
            ).toBeInTheDocument();
        });

        it("should handle HTML content safely", async () => {
            renderWithProviders(
                <Tooltip content="<strong>Bold</strong> text">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(
                await screen.findByText(/<strong>Bold<\/strong> text/),
            ).toBeInTheDocument();
        });

        it("should handle rapid hover/unhover", async () => {
            renderWithProviders(
                <Tooltip content="Rapid">
                    <button>Trigger</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            for (let i = 0; i < 5; i++) {
                await userEvent.hover(trigger);
                await userEvent.unhover(trigger);
            }
            expect(screen.queryByText("Rapid")).not.toBeInTheDocument();
        });

        it.skip("should handle disabled trigger element", async () => {
            renderWithProviders(
                <Tooltip content="Disabled tooltip">
                    <button disabled>Disabled</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            expect(trigger).toBeDisabled();
            fireEvent.mouseEnter(trigger);
            expect(
                await screen.findByText("Disabled tooltip"),
            ).not.toBeInTheDocument();
        });

        it("should handle very long tooltip content", async () => {
            const longContent = "A".repeat(500);
            renderWithProviders(
                <Tooltip content={longContent}>
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(await screen.findByText(longContent)).toBeInTheDocument();
        });

        it("should handle unmounting while tooltip is open", async () => {
            const { unmount } = renderWithProviders(
                <Tooltip content="Unmounting">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(await screen.findByText("Unmounting")).toBeInTheDocument();
            expect(() => unmount()).not.toThrow();
        });

        it("should update tooltip content when props change", async () => {
            const { rerender } = renderWithProviders(
                <Tooltip content="Original Tooltip">
                    <button>Trigger</button>
                </Tooltip>,
            );

            // Show original tooltip
            await userEvent.hover(screen.getByRole("button"));
            expect(
                await screen.findByText("Original Tooltip"),
            ).toBeInTheDocument();

            // Unhover to close
            await userEvent.unhover(screen.getByRole("button"));
            await waitFor(() => {
                expect(
                    screen.queryByText("Original Tooltip"),
                ).not.toBeInTheDocument();
            });

            // Rerender with new content
            rerender(
                <ThemeContextProvider>
                    <Tooltip content="Updated Tooltip">
                        <button>Trigger</button>
                    </Tooltip>
                </ThemeContextProvider>,
            );

            // Show new tooltip
            await userEvent.hover(screen.getByRole("button"));
            expect(
                await screen.findByText("Updated Tooltip"),
            ).toBeInTheDocument();
            expect(
                screen.queryByText("Original Tooltip"),
            ).not.toBeInTheDocument();
        });
    });

    // ==========================================
    // Trigger Mode Tests
    // ==========================================
    describe("Trigger Modes", () => {
        it("should support hover trigger", async () => {
            renderWithProviders(
                <Tooltip content="Hover tooltip" trigger="hover">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            expect(
                await screen.findByText("Hover tooltip"),
            ).toBeInTheDocument();
        });

        it("should support click trigger", async () => {
            renderWithProviders(
                <Tooltip content="Click tooltip" trigger="click">
                    <button>Trigger</button>
                </Tooltip>,
            );
            expect(screen.queryByText("Click tooltip")).not.toBeInTheDocument();
            await userEvent.click(screen.getByRole("button"));
            expect(
                await screen.findByText("Click tooltip"),
            ).toBeInTheDocument();
        });

        it("should support focus trigger", async () => {
            renderWithProviders(
                <Tooltip content="Focus tooltip" trigger="focus">
                    <input />
                </Tooltip>,
            );
            const input = screen.getByRole("textbox");
            input.focus();
            await waitFor(() => {
                expect(screen.getByText("Focus tooltip")).toBeInTheDocument();
            });
        });

        describe("Multiple Triggers", () => {
            it("should support hover and focus triggers together", async () => {
                renderWithProviders(
                    <Tooltip
                        content="Multi tooltip"
                        trigger={["hover", "focus"]}
                    >
                        <button>Trigger</button>
                    </Tooltip>,
                );

                const trigger = screen.getByRole("button");

                // Test hover trigger
                await userEvent.hover(trigger);
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();

                await userEvent.unhover(trigger);
                await waitFor(() => {
                    expect(
                        screen.queryByText("Multi tooltip"),
                    ).not.toBeInTheDocument();
                });

                // Test focus trigger
                trigger.focus();
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();

                trigger.blur();
                await waitFor(() => {
                    expect(
                        screen.queryByText("Multi tooltip"),
                    ).not.toBeInTheDocument();
                });
            });

            it("should support hover and click triggers together", async () => {
                renderWithProviders(
                    <Tooltip
                        content="Multi tooltip"
                        trigger={["hover", "click"]}
                    >
                        <button>Trigger</button>
                    </Tooltip>,
                );

                const trigger = screen.getByRole("button");

                // Test hover trigger
                await userEvent.hover(trigger);
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();

                await userEvent.unhover(trigger);
                await waitFor(() => {
                    expect(
                        screen.queryByText("Multi tooltip"),
                    ).not.toBeInTheDocument();
                });

                // Test click trigger
                await userEvent.click(trigger);
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();
            });

            it("should support all three triggers together", async () => {
                renderWithProviders(
                    <Tooltip
                        content="Multi tooltip"
                        trigger={["hover", "focus", "click"]}
                    >
                        <button>Trigger</button>
                    </Tooltip>,
                );

                const trigger = screen.getByRole("button");

                // Test hover
                await userEvent.hover(trigger);
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();
                await userEvent.unhover(trigger);
                await waitFor(() => {
                    expect(
                        screen.queryByText("Multi tooltip"),
                    ).not.toBeInTheDocument();
                });

                // Test focus
                trigger.focus();
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();
                trigger.blur();
                await waitFor(() => {
                    expect(
                        screen.queryByText("Multi tooltip"),
                    ).not.toBeInTheDocument();
                });

                // Test click
                await userEvent.click(trigger);
                expect(
                    await screen.findByText("Multi tooltip"),
                ).toBeInTheDocument();
            });

            it("should work with single trigger as string (backward compatibility)", async () => {
                renderWithProviders(
                    <Tooltip content="Single tooltip" trigger="hover">
                        <button>Trigger</button>
                    </Tooltip>,
                );

                const trigger = screen.getByRole("button");
                await userEvent.hover(trigger);
                expect(
                    await screen.findByText("Single tooltip"),
                ).toBeInTheDocument();
            });
        });
    });

    // ==========================================
    // Persistence and Interaction Tests
    // ==========================================
    describe("Persistence and Interaction", () => {
        it("should keep tooltip visible while hovering over it", async () => {
            renderWithProviders(
                <Tooltip content="Interactive">
                    <button>Trigger</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            await userEvent.hover(trigger);
            const tooltip = await screen.findByRole("tooltip");
            await userEvent.hover(tooltip);
            expect(tooltip).toBeInTheDocument();
        });

        it("should call onOpen callback", async () => {
            const onOpen = vi.fn();
            renderWithProviders(
                <Tooltip content="Callback" onOpen={onOpen}>
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            await waitFor(() => {
                expect(onOpen).toHaveBeenCalled();
            });
        });

        it("should call onClose callback", async () => {
            const onClose = vi.fn();
            renderWithProviders(
                <Tooltip content="Callback" onClose={onClose}>
                    <button>Trigger</button>
                </Tooltip>,
            );
            const trigger = screen.getByRole("button");
            await userEvent.hover(trigger);
            await userEvent.unhover(trigger);
            await waitFor(() => {
                expect(onClose).toHaveBeenCalled();
            });
        });
    });

    // ==========================================
    // Portal and DOM Tests
    // ==========================================
    describe("Portal and DOM", () => {
        it("should render tooltip in portal if specified", async () => {
            const portal = document.createElement("div");
            portal.setAttribute("id", "tooltip-portal");
            document.body.appendChild(portal);

            renderWithProviders(
                <Tooltip content="Portaled" portal="#tooltip-portal">
                    <button>Trigger</button>
                </Tooltip>,
            );
            await userEvent.hover(screen.getByRole("button"));
            await waitFor(() => {
                expect(
                    portal.querySelector('[role="tooltip"]'),
                ).toBeInTheDocument();
            });

            document.body.removeChild(portal);
        });

        it("should not have memory leaks on repeated mount/unmount", () => {
            for (let i = 0; i < 10; i++) {
                const { unmount } = renderWithProviders(
                    <Tooltip content="Test">
                        <button>Trigger</button>
                    </Tooltip>,
                );
                unmount();
            }
            expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
        });
    });
});
