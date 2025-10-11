import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown, { DropdownProps } from ".";
import { ThemeProvider as ThemeContextProvider } from "../../theme/theme-provider";

// Custom render function that wraps components with required providers
const renderWithProviders = (ui: React.ReactElement, options?: any) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeContextProvider>{children}</ThemeContextProvider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
};

afterEach(async () => {
    vi.useRealTimers();
    // Wait for any pending animations/timeouts
    await waitFor(
        () => {
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        },
        { timeout: 500 },
    ).catch(() => {
        // Ignore timeout errors in cleanup
    });
});

const mockItems = [
    { label: "Item 1", onClick: vi.fn() },
    { label: "Item 2", onClick: vi.fn() },
    { label: "Item 3", onClick: vi.fn() },
];

describe("Dropdown Component", () => {
    // Basic Rendering Tests
    describe("Basic Rendering", () => {
        it("should render the trigger element", () => {
            renderWithProviders(
                <Dropdown items={mockItems}>
                    <button>Open Dropdown</button>
                </Dropdown>,
            );
            expect(
                screen.getByRole("button", { name: /open dropdown/i }),
            ).toBeInTheDocument();
        });

        it("should not render dropdown menu initially", () => {
            renderWithProviders(
                <Dropdown items={mockItems}>
                    <button>Trigger</button>
                </Dropdown>,
            );
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("should open dropdown when trigger is clicked", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            expect(await screen.findByRole("menu")).toBeInTheDocument();
        });

        it("should render all dropdown items", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            expect(screen.getByText("Item 1")).toBeInTheDocument();
            expect(screen.getByText("Item 2")).toBeInTheDocument();
            expect(screen.getByText("Item 3")).toBeInTheDocument();
        });

        it("should render items with icons", async () => {
            const itemsWithIcons = [
                { label: "Home", icon: <span>🏠</span>, onClick: vi.fn() },
                { label: "Settings", icon: <span>⚙️</span>, onClick: vi.fn() },
            ];

            renderWithProviders(
                <Dropdown items={itemsWithIcons} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            expect(screen.getByText("🏠")).toBeInTheDocument();
            expect(screen.getByText("⚙️")).toBeInTheDocument();
        });
    });

    // Item Click Tests
    describe("Item Interactions", () => {
        it("should call onClick when item is clicked", async () => {
            const handleClick = vi.fn();
            const items = [{ label: "Clickable Item", onClick: handleClick }];

            renderWithProviders(
                <Dropdown items={items} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(screen.getByText("Clickable Item"));

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("should close dropdown after item is clicked", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            await userEvent.click(screen.getByText("Item 1"));

            await waitFor(() => {
                expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            });
        });

        it("should not call onClick for disabled items", async () => {
            const handleClick = vi.fn();
            const items = [
                {
                    label: "Disabled Item",
                    onClick: handleClick,
                    disabled: true,
                },
            ];

            renderWithProviders(
                <Dropdown items={items} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            const disabledItem = screen.getByRole("menuitem", {
                name: /disabled item/i,
            });
            expect(disabledItem).toBeDisabled();

            await userEvent.click(disabledItem);

            expect(handleClick).not.toHaveBeenCalled();
        });

        it("should not close dropdown when disabled item is clicked", async () => {
            const items = [
                { label: "Disabled Item", onClick: vi.fn(), disabled: true },
            ];

            renderWithProviders(
                <Dropdown items={items} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            await userEvent.click(screen.getByText("Disabled Item"));

            // Should still be open
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });
    });

    // Keyboard Interactions
    describe("Keyboard Interactions", () => {
        it("should close dropdown on Escape key", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            await userEvent.keyboard("{Escape}");

            await waitFor(() => {
                expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            });
        });

        it("should not close on Escape if closeOnEscape is false", async () => {
            renderWithProviders(
                <Dropdown
                    items={mockItems}
                    closeOnEscape={false}
                    animated={false}
                >
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            await userEvent.keyboard("{Escape}");

            // Should still be open
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });
    });

    // Click Outside Tests
    describe("Click Outside Behavior", () => {
        it("should close dropdown when clicking outside", async () => {
            renderWithProviders(
                <div>
                    <div data-testid="outside">Outside element</div>
                    <Dropdown items={mockItems} animated={false}>
                        <button>Trigger</button>
                    </Dropdown>
                </div>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            await userEvent.click(screen.getByTestId("outside"));

            await waitFor(() => {
                expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            });
        });

        it("should not close when clicking inside dropdown menu", async () => {
            const items = [
                { label: "Item 1" }, // No onClick handler
            ];

            renderWithProviders(
                <Dropdown items={items} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            // Click on the menu container (not on an item)
            const menu = screen.getByRole("menu");
            await userEvent.click(menu);

            // Should still be open
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });

        it("should not close when closeOnClickOutside is false", async () => {
            renderWithProviders(
                <div>
                    <div data-testid="outside">Outside element</div>
                    <Dropdown
                        items={mockItems}
                        closeOnClickOutside={false}
                        animated={false}
                    >
                        <button>Trigger</button>
                    </Dropdown>
                </div>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            await userEvent.click(screen.getByTestId("outside"));

            // Should still be open
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });
    });

    // Placement Tests
    describe("Positioning", () => {
        it("should support different placement options", async () => {
            const placements = ["top", "bottom", "left", "right"] as const;

            for (const placement of placements) {
                const { unmount } = renderWithProviders(
                    <Dropdown
                        items={mockItems}
                        placement={placement}
                        animated={false}
                    >
                        <button>Trigger</button>
                    </Dropdown>,
                );

                await userEvent.click(screen.getByRole("button"));
                const menu = await screen.findByRole("menu");

                // Menu should be rendered
                expect(menu).toBeInTheDocument();

                unmount();
            }
        });

        it("should render arrow when showArrow is true", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} showArrow={true} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            await screen.findByRole("menu");

            const arrow = document.querySelector("[data-arrow]");
            expect(arrow).toBeInTheDocument();
        });

        it("should not render arrow when showArrow is false", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} showArrow={false} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            await screen.findByRole("menu");

            const arrow = document.querySelector("[data-arrow]");
            expect(arrow).not.toBeInTheDocument();
        });
    });

    // State Management Tests
    describe("State Management", () => {
        it("should not open when disabled", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} disabled={true} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            // Should not open
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("should work in uncontrolled mode", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            // Initially closed
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();

            // Open
            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            // Close
            await userEvent.keyboard("{Escape}");
            await waitFor(() => {
                expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            });
        });
    });

    // Animation Tests
    describe("Animations", () => {
        it("should animate when animated is true", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={true}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            const menu = await screen.findByRole("menu");

            // Should have transition styles
            const styles = window.getComputedStyle(menu);
            expect(styles.transition).toBeTruthy();
        });

        it("should not animate when animated is false", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            const menu = await screen.findByRole("menu");

            const styles = window.getComputedStyle(menu);
            expect(styles.transition).toContain("none");
        });
    });

    // Width Tests
    describe("Width Configuration", () => {
        it("should apply custom width", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} width="300px" animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            const menu = await screen.findByRole("menu");

            expect(menu).toHaveStyle({ width: "300px" });
        });
    });

    // Accessibility Tests
    describe("Accessibility", () => {
        it("should have role='menu' on dropdown", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();
        });

        it("should have role='menuitem' on items", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            await screen.findByRole("menu");

            const menuItems = screen.getAllByRole("menuitem");
            expect(menuItems).toHaveLength(mockItems.length);
        });

        it("should mark disabled items as disabled", async () => {
            const items = [
                { label: "Enabled", onClick: vi.fn() },
                { label: "Disabled", onClick: vi.fn(), disabled: true },
            ];

            renderWithProviders(
                <Dropdown items={items} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            const enabledItem = screen.getByRole("menuitem", {
                name: /enabled/i,
            });
            const disabledItem = screen.getByRole("menuitem", {
                name: /disabled/i,
            });

            expect(enabledItem).not.toBeDisabled();
            expect(disabledItem).toBeDisabled();
        });
    });

    // Edge Cases
    describe("Edge Cases", () => {
        it("should handle empty items array", async () => {
            renderWithProviders(
                <Dropdown items={[]} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            const menu = await screen.findByRole("menu");

            expect(menu).toBeInTheDocument();
            expect(screen.queryAllByRole("menuitem")).toHaveLength(0);
        });

        it("should handle items without onClick handlers", async () => {
            const items = [{ label: "No Handler" }];

            renderWithProviders(
                <Dropdown items={items} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));

            const item = screen.getByText("No Handler");

            // Should not throw error when clicked
            expect(() => userEvent.click(item)).not.toThrow();
        });

        it("should handle rapid open/close", async () => {
            renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            const trigger = screen.getByRole("button");

            // Rapid clicks
            for (let i = 0; i < 5; i++) {
                await userEvent.click(trigger);
                await userEvent.keyboard("{Escape}");
                await waitFor(() => {
                    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
                });
            }

            // Final state should be closed
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("should handle unmounting while open", async () => {
            const { unmount } = renderWithProviders(
                <Dropdown items={mockItems} animated={false}>
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            expect(await screen.findByRole("menu")).toBeInTheDocument();

            expect(() => unmount()).not.toThrow();
        });
    });

    // Custom Styling Tests
    describe("Custom Styling", () => {
        it("should apply custom className", async () => {
            renderWithProviders(
                <Dropdown
                    items={mockItems}
                    className="custom-dropdown"
                    animated={false}
                >
                    <button>Trigger</button>
                </Dropdown>,
            );

            await userEvent.click(screen.getByRole("button"));
            const menu = await screen.findByRole("menu");

            expect(menu).toHaveClass("custom-dropdown");
        });
    });
});
