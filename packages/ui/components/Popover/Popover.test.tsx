import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popover from ".";
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
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        },
        { timeout: 500 },
    ).catch(() => {
        // Ignore timeout errors in cleanup
    });
});

describe("Popover (Uncontrolled)", () => {
    it("should render the trigger element", () => {
        renderWithProviders(
            <Popover content="Popover content">
                <button>Open Popover</button>
            </Popover>,
        );
        expect(
            screen.getByRole("button", { name: /open popover/i }),
        ).toBeInTheDocument();
    });

    it("should not render popover content initially", () => {
        renderWithProviders(
            <Popover content="Hidden content">
                <button>Trigger</button>
            </Popover>,
        );
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should open popover when trigger is clicked", async () => {
        renderWithProviders(
            <Popover content="Popover content" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));

        expect(await screen.findByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    it("should close popover when close button is clicked", async () => {
        renderWithProviders(
            <Popover content="Popover content" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        expect(await screen.findByRole("dialog")).toBeInTheDocument();

        const closeButton = screen.getByRole("button", { name: /close/i });
        await userEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    it("should close popover on Escape key", async () => {
        renderWithProviders(
            <Popover content="Content" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        expect(await screen.findByRole("dialog")).toBeInTheDocument();

        await userEvent.keyboard("{Escape}");

        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    it("should not close on Escape if closeOnEscape is false", async () => {
        renderWithProviders(
            <Popover content="Content" closeOnEscape={false} animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        expect(await screen.findByRole("dialog")).toBeInTheDocument();

        await userEvent.keyboard("{Escape}");

        // Should still be open
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render backdrop when showBackdrop is true", async () => {
        renderWithProviders(
            <Popover content="Content" showBackdrop={true} animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("dialog");

        // Wait a bit for backdrop to render
        await waitFor(() => {
            const backdrop = document.querySelector('[data-backdrop="true"]');
            expect(backdrop).toBeInTheDocument();
        });
    });

    it("should close on backdrop click when closeOnClickOutside is true", async () => {
        renderWithProviders(
            <Popover content="Content" showBackdrop={true} animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("dialog");

        const backdrop = document.querySelector('[data-backdrop="true"]');
        await userEvent.click(backdrop!);

        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    it("should not close on backdrop click when closeOnClickOutside is false", async () => {
        renderWithProviders(
            <Popover
                content="Content"
                showBackdrop={true}
                closeOnClickOutside={false}
                animated={false}
            >
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("dialog");

        const backdrop = document.querySelector('[data-backdrop="true"]');
        await userEvent.click(backdrop!);

        // Should still be open
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render custom title", async () => {
        renderWithProviders(
            <Popover content="Content" title="Custom Title" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        expect(await screen.findByText("Custom Title")).toBeInTheDocument();
    });

    it("should have aria-describedby when description provided", async () => {
        renderWithProviders(
            <Popover
                content="Content"
                description="This is a description"
                animated={false}
            >
                <button>Trigger</button>
            </Popover>,
        );
        await userEvent.click(screen.getByRole("button"));

        const dialog = await screen.findByRole("dialog");
        const descriptionId = dialog.getAttribute("aria-describedby");

        expect(descriptionId).toBeTruthy();
        expect(document.getElementById(descriptionId!)).toHaveTextContent(
            "This is a description",
        );
    });

    it("should have role='dialog' on popover", async () => {
        renderWithProviders(
            <Popover content="Content" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );
        await userEvent.click(screen.getByRole("button"));
        expect(await screen.findByRole("dialog")).toBeInTheDocument();
    });

    it("should have aria-modal attribute", async () => {
        renderWithProviders(
            <Popover content="Content" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );
        await userEvent.click(screen.getByRole("button"));
        const dialog = await screen.findByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("should restore focus to trigger on close", async () => {
        renderWithProviders(
            <Popover content="Content" animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        const trigger = screen.getByRole("button");
        await userEvent.click(trigger);
        await screen.findByRole("dialog");

        const closeButton = screen.getByRole("button", { name: /close/i });
        await userEvent.click(closeButton);

        await waitFor(() => {
            expect(trigger).toHaveFocus();
        });
    });

    it("should not open when disabled", async () => {
        renderWithProviders(
            <Popover content="Content" disabled={true} animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));

        // Should not open
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should support different placement options", async () => {
        const placements = ["top", "bottom", "left", "right"] as const;

        for (const placement of placements) {
            const { unmount } = renderWithProviders(
                <Popover
                    content="Content"
                    placement={placement}
                    animated={false}
                >
                    <button>Trigger</button>
                </Popover>,
            );

            await userEvent.click(screen.getByRole("button"));
            const dialog = await screen.findByRole("dialog");
            expect(dialog).toHaveAttribute("data-placement", placement);

            unmount();
        }
    });

    it("should render arrow when showArrow is true", async () => {
        renderWithProviders(
            <Popover content="Content" showArrow={true} animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("dialog");

        const arrow = document.querySelector('[data-arrow="true"]');
        expect(arrow).toBeInTheDocument();
    });

    it("should not render arrow when showArrow is false", async () => {
        renderWithProviders(
            <Popover content="Content" showArrow={false} animated={false}>
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("dialog");

        const arrow = document.querySelector('[data-arrow="true"]');
        expect(arrow).not.toBeInTheDocument();
    });

    it("should render React component as content", async () => {
        renderWithProviders(
            <Popover
                content={
                    <div data-testid="custom-content">Custom Component</div>
                }
                animated={false}
            >
                <button>Trigger</button>
            </Popover>,
        );

        await userEvent.click(screen.getByRole("button"));
        expect(await screen.findByTestId("custom-content")).toBeInTheDocument();
    });
});
