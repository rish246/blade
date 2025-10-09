import { ReactNode, useEffect } from "react";
import Box from "../Box";
import Button from "../Button";
import Text from "../Text";
import { useTheme } from "../../theme/theme-provider";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    footer?: ReactNode;
    size?: ModalSize;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    showCloseButton?: boolean;
    className?: string;
};

const getSizeStyles = (size: ModalSize) => {
    switch (size) {
        case "sm":
            return { maxWidth: "400px" };
        case "md":
            return { maxWidth: "600px" };
        case "lg":
            return { maxWidth: "800px" };
        case "xl":
            return { maxWidth: "1200px" };
        case "full":
            return { maxWidth: "100%", width: "100%", height: "100%" };
        default:
            return { maxWidth: "600px" };
    }
};

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    footer,
    size = "md",
    closeOnOverlayClick = true,
    closeOnEsc = true,
    showCloseButton = true,
    className = "",
}: ModalProps) => {
    const { theme } = useTheme();
    // Handle ESC key press
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [isOpen, closeOnEsc, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose();
        }
    };

    const handleBodyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const sizeStyles = getSizeStyles(size);

    return (
        <Box
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: theme.spacing.md,
            }}
            onClick={handleOverlayClick}
        >
            {/* Overlay */}
            <Box
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: -1,
                }}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <Box
                className={className}
                bg="bg"
                rounded="lg"
                style={{
                    position: "relative",
                    width: "100%",
                    ...sizeStyles,
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: theme.shadows.lg,
                    overflow: "hidden",
                }}
                onClick={handleBodyClick}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <Box
                        p="md"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: `1px solid ${theme.colors.muted}`,
                        }}
                    >
                        {title && (
                            <Text
                                as="h2"
                                id="modal-title"
                                size="lg"
                                weight="bold"
                                style={{ margin: 0 }}
                            >
                                {title}
                            </Text>
                        )}
                        {showCloseButton && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                aria-label="Close modal"
                                style={{ marginLeft: "auto" }}
                            >
                                ✕
                            </Button>
                        )}
                    </Box>
                )}

                {/* Body */}
                <Box
                    p="md"
                    style={{
                        flex: 1,
                        overflowY: "auto",
                    }}
                >
                    {children}
                </Box>

                {/* Footer */}
                {footer && (
                    <Box
                        p="md"
                        style={{
                            borderTop: `1px solid ${theme.colors.muted}`,
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: theme.spacing.sm,
                        }}
                    >
                        {footer}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Modal;
