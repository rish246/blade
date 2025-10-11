import {
    PropsWithChildren,
    ReactNode,
    useId,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { createPortal } from "react-dom";
import Box from "../Box";
import Text from "../Text";
import Stack from "../Stack";
import Button from "../Button";
import { useClickOutside } from "../../hooks/useClickOutside";
import Card from "../Card";
import { SpacingToken } from "../../theme/Theme";
import { baseTheme } from "../../theme/tokens";

type Placement = "top" | "left" | "bottom" | "right";
type AnimationState = "closed" | "opening" | "open" | "closing";

export type PopOverProps = PropsWithChildren<{
    content?: ReactNode;
    title?: string;
    closeButtonLabel?: string;
    description?: string;
    closeOnEscape?: boolean;
    "aria-label"?: string;
    showBackdrop?: boolean;
    closeOnClickOutside?: boolean;
    showArrow?: boolean;
    disabled?: boolean;
    placement?: Placement;
    className?: string;
    contentClassName?: string;
    width?: SpacingToken | string;
    animated?: boolean;
    animationDuration?: number;
    size?: SpacingToken;
    open?: boolean;
    onOpenChange?: (newOpen: boolean) => void;
}>;

const PopOver = ({
    content,
    title = "",
    closeButtonLabel = "Close",
    description,
    "aria-label": ariaLabel,
    closeOnEscape = true,
    showBackdrop = false,
    closeOnClickOutside = true,
    placement = "top",
    showArrow = false,
    disabled = false,
    width = "auto",
    className,
    animated = true,
    animationDuration = 150,
    open,
    size = "md",
    onOpenChange,
    children,
}: PopOverProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isShowing = open ?? isOpen;
    const setIsShowing = onOpenChange ?? setIsOpen;

    const [animationState, setAnimationState] =
        useState<AnimationState>("closed");
    const tooltipId = useId();
    const titleId = useId();
    const descriptionId = useId();
    const triggerRef = useRef<HTMLDivElement>(null);
    const popOverRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

    // Update trigger position
    useEffect(() => {
        if (isShowing && triggerRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
    }, [isShowing]);

    const handleShow = () => {
        if (disabled) return;

        // Store the currently focused element before opening
        previousActiveElement.current = document.activeElement as HTMLElement;

        if (animated) {
            setIsShowing(true);
            setAnimationState("opening");
            requestAnimationFrame(() => {
                setAnimationState("open");
            });
        } else {
            setIsShowing(true);
            setAnimationState("open");
        }
    };

    const handleClose = useCallback(() => {
        if (animated) {
            setAnimationState("closing");
            setTimeout(() => {
                setIsShowing(false);
                setAnimationState("closed");
                // Restore focus after close animation completes
                if (previousActiveElement.current) {
                    previousActiveElement.current.focus();
                }
            }, animationDuration);
        } else {
            setIsShowing(false);
            setAnimationState("closed");
            // Restore focus immediately for non-animated close
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        }
    }, [animated, animationDuration, setIsShowing]);

    // Use both containerRef and popOverRef to exclude clicks
    useClickOutside(
        [containerRef, popOverRef],
        handleClose,
        isShowing && closeOnClickOutside,
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeOnEscape && isShowing) {
                handleClose();
            }

            // Focus trap
            if (e.key === "Tab" && isShowing && popOverRef.current) {
                const focusableElements =
                    popOverRef.current.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                    );
                const firstFocusable = focusableElements[0];
                const lastFocusable =
                    focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable?.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable?.focus();
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClose, closeOnEscape, isShowing]);

    // Focus management
    useEffect(() => {
        if (isShowing && animationState === "open" && popOverRef.current) {
            // Focus the first focusable element in the popover after it opens
            requestAnimationFrame(() => {
                if (popOverRef.current) {
                    const focusableElements =
                        popOverRef.current.querySelectorAll<HTMLElement>(
                            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                        );
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            });
        }
    }, [isShowing, animationState]);

    const getAccessibleNameProps = () => {
        const props: Record<string, string> = {};

        if (title) {
            props["aria-labelledby"] = titleId;
        } else if (ariaLabel) {
            props["aria-label"] = ariaLabel;
        } else {
            props["aria-label"] = "Popover";
        }

        if (description) {
            props["aria-describedby"] = descriptionId;
        }

        return props;
    };

    const getPositionStyles = () => {
        if (!triggerRect) return {};

        const gap = 8;

        switch (placement) {
            case "top":
                return {
                    bottom: `${window.innerHeight - triggerRect.top + gap}px`,
                    left: `${triggerRect.left + triggerRect.width / 2}px`,
                    transform: "translateX(-50%)",
                };
            case "bottom":
                return {
                    top: `${triggerRect.bottom + gap}px`,
                    left: `${triggerRect.left + triggerRect.width / 2}px`,
                    transform: "translateX(-50%)",
                };
            case "left":
                return {
                    right: `${window.innerWidth - triggerRect.left + gap}px`,
                    top: `${triggerRect.top + triggerRect.height / 2}px`,
                    transform: "translateY(-50%)",
                };
            case "right":
                return {
                    left: `${triggerRect.right + gap}px`,
                    top: `${triggerRect.top + triggerRect.height / 2}px`,
                    transform: "translateY(-50%)",
                };
            default:
                return {
                    bottom: `${window.innerHeight - triggerRect.top + gap}px`,
                    left: `${triggerRect.left}px`,
                };
        }
    };

    const getArrowStyles = (): React.CSSProperties => {
        const arrowSize = "8px";
        const arrowColor = "#ffffff";

        const baseStyles: React.CSSProperties = {
            position: "absolute",
            width: "0",
            height: "0",
            border: `${arrowSize} solid transparent`,
        };

        switch (placement) {
            case "top":
                return {
                    ...baseStyles,
                    bottom: `-${arrowSize}`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderTopColor: arrowColor,
                    borderBottom: "0",
                };
            case "bottom":
                return {
                    ...baseStyles,
                    top: `-${arrowSize}`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderBottomColor: arrowColor,
                    borderTop: "0",
                };
            case "left":
                return {
                    ...baseStyles,
                    right: `-${arrowSize}`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderLeftColor: arrowColor,
                    borderRight: "0",
                };
            case "right":
                return {
                    ...baseStyles,
                    left: `-${arrowSize}`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderRightColor: arrowColor,
                    borderLeft: "0",
                };
            default:
                return baseStyles;
        }
    };

    const getAnimationStyles = (): React.CSSProperties => {
        if (!animated) {
            return {
                visibility: isShowing ? "visible" : "hidden",
                opacity: isShowing ? 1 : 0,
            };
        }

        switch (animationState) {
            case "closed":
                return {
                    visibility: "hidden",
                    opacity: 0,
                };
            case "opening":
                return {
                    visibility: "visible",
                    opacity: 0,
                };
            case "open":
                return {
                    visibility: "visible",
                    opacity: 1,
                };
            case "closing":
                return {
                    visibility: "visible",
                    opacity: 0,
                };
            default:
                return {};
        }
    };

    const getSizeStyles = () => {
        // Only apply size to width if it's a spacing token, let height be auto
        if (size && size in baseTheme.spacing) {
            return {
                minWidth: baseTheme.spacing[size],
            };
        }
        return {};
    };

    const getTransformForAnimation = (baseTransform: string): string => {
        return baseTransform;
    };

    const backdrop = showBackdrop &&
        (isShowing || animationState !== "closed") && (
            <div
                data-backdrop="true"
                onClick={closeOnClickOutside ? handleClose : undefined}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                    opacity: animationState === "open" ? 1 : 0,
                    transition: animated
                        ? `opacity ${animationDuration}ms ease-in-out`
                        : "none",
                }}
            />
        );

    const portalContent = (
        <>
            {backdrop}
            {(isShowing || animationState !== "closed") && (
                <Card
                    variant="elevated"
                    className={`popover ${className}`}
                    data-placement={placement}
                    data-state={animationState}
                    data-size={size}
                    role="dialog"
                    ref={popOverRef}
                    id={tooltipId}
                    aria-modal={true}
                    {...getAccessibleNameProps()}
                    style={{
                        position: "fixed",
                        zIndex: 1000,
                        maxHeight: "1000px",
                        overflow: "visible",
                        transition: animated
                            ? `opacity ${animationDuration}ms ease-in-out`
                            : "none",
                        ...getPositionStyles(),
                        ...getAnimationStyles(),
                        ...getSizeStyles(),
                        width:
                            width in baseTheme.spacing
                                ? baseTheme.spacing[width as SpacingToken]
                                : width,
                    }}
                >
                    {showArrow && (
                        <div
                            style={getArrowStyles()}
                            data-arrow={Boolean(placement)}
                        />
                    )}

                    <Stack direction="row" justify="space-between">
                        {title && (
                            <Text as="h3" align="center" id={titleId}>
                                {title}
                            </Text>
                        )}

                        <Button
                            onClick={handleClose}
                            aria-label={closeButtonLabel}
                            style={{
                                float: "right",
                            }}
                        >
                            {closeButtonLabel}
                        </Button>
                    </Stack>

                    {description && (
                        <Text as="small" id={descriptionId}>
                            {description}
                        </Text>
                    )}

                    {content}
                </Card>
            )}
        </>
    );

    return (
        <>
            <Box
                ref={containerRef}
                style={{
                    width: "fit-content",
                    height: "fit-content",
                    position: "relative",
                    display: "inline-block",
                }}
            >
                <Box w="fit-content" onClick={handleShow} ref={triggerRef}>
                    {children}
                </Box>
            </Box>
            {createPortal(portalContent, document.body)}
        </>
    );
};

export default PopOver;
