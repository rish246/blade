import React, { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { ThemeProvider, useTheme } from "../theme/theme-provider";
import Box from "../components/Box";
import Text from "../components/Text";

export default {
    title: "UI/Overlay/Modal",
};

/**
 * Simple theme toggle switch for stories
 */
const ThemeToggle: React.FC = () => {
    const { themeName, toggleTheme } = useTheme();

    return (
        <Button variant="outline" onClick={toggleTheme}>
            Switch to {themeName === "light" ? "Dark" : "Light"} Theme
        </Button>
    );
};

/**
 * Story wrapper with theme provider
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="light">
        <Box
            p="xl"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
            }}
        >
            <ThemeToggle />
            {children}
        </Box>
    </ThemeProvider>
);

// ===========================================
// 🧱 Stories
// ===========================================

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Default Modal"
            >
                <Text>This is a simple modal with default styling.</Text>
            </Modal>
        </Wrapper>
    );
};

export const WithFooter = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <Button onClick={() => setIsOpen(true)}>Show Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Modal with Footer"
                footer={
                    <Box
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => alert("Confirmed!")}>
                            Confirm
                        </Button>
                    </Box>
                }
            >
                <Text>
                    This modal includes a footer section with action buttons,
                    useful for confirmations or dialogs.
                </Text>
            </Modal>
        </Wrapper>
    );
};

export const Sizes = () => {
    const [open, setOpen] = useState<string | null>(null);
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;

    return (
        <Wrapper>
            <Box style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {sizes.map((size) => (
                    <Button key={size} onClick={() => setOpen(size)}>
                        Open {size.toUpperCase()}
                    </Button>
                ))}
            </Box>

            {sizes.map((size) => (
                <Modal
                    key={size}
                    isOpen={open === size}
                    onClose={() => setOpen(null)}
                    title={`Modal Size: ${size.toUpperCase()}`}
                    size={size}
                >
                    <Text>
                        This is a {size} modal. Resize behavior changes based on
                        the configured size token.
                    </Text>
                </Modal>
            ))}
        </Wrapper>
    );
};

export const WithoutCloseButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Modal without Close Button"
                showCloseButton={false}
            >
                <Text>You can close this modal only by external actions.</Text>
            </Modal>
        </Wrapper>
    );
};

export const OverlayInteraction = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <Button onClick={() => setIsOpen(true)}>Click Overlay Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Overlay Click Behavior"
                closeOnOverlayClick={true}
            >
                <Text>
                    Clicking outside this modal (on the overlay) will close it.
                    This is common for non-critical interactions.
                </Text>
            </Modal>
        </Wrapper>
    );
};

export const ScrollableContent = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Wrapper>
            <Button onClick={() => setIsOpen(true)}>Open Long Modal</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Scrollable Modal"
            >
                <Box style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    {Array.from({ length: 25 }).map((_, i) => (
                        <Text key={i} as="p">
                            This is line {i + 1} inside a scrollable modal body.
                        </Text>
                    ))}
                </Box>
            </Modal>
        </Wrapper>
    );
};
