import {
    PropsWithChildren,
    ReactNode,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { createPortal } from "react-dom";
import Box from "../Box";
import Card from "../Card";
import Text from "../Text";
import Stack from "../Stack";
import Button from "../Button";
import { useClickOutside } from "../../hooks/useClickOutside";
import { baseTheme } from "../../theme/tokens";
import { SpacingToken } from "../../theme/Theme";

type Placement = "top" | "left" | "bottom" | "right";
type AnimationState = "closed" | "opening" | "open" | "closing";

export interface DropdownItem {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export type DropdownProps = PropsWithChildren<{
    items: DropdownItem[];
    width?: SpacingToken | string;
    placement?: Placement;
    showArrow?: boolean;
    animated?: boolean;
    animationDuration?: number;
    className?: string;
    open?: boolean;
    onOpenChange?: (newOpen: boolean) => void;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    disabled?: boolean;
}>;

const Dropdown = ({
    children,
    items,
    width = "auto",
    placement = "bottom",
    showArrow = false,
    animated = true,
    animationDuration = 150,
    className,
    open,
    onOpenChange,
    closeOnClickOutside = true,
    closeOnEscape = true,
    disabled = false,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isShowing = open ?? isOpen;
    const setIsShowing = onOpenChange ?? setIsOpen;

    const [animationState, setAnimationState] =
        useState<AnimationState>("closed");

    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

    // Update position on open
    useEffect(() => {
        if (isShowing && triggerRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
    }, [isShowing]);

    // Handle open/close
    const handleOpen = () => {
        if (disabled) return;
        if (animated) {
            setIsShowing(true);
            setAnimationState("opening");
            requestAnimationFrame(() => setAnimationState("open"));
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
            }, animationDuration);
        } else {
            setIsShowing(false);
            setAnimationState("closed");
        }
    }, [animated, animationDuration, setIsShowing]);

    // Close on outside click
    useClickOutside(
        [containerRef, dropdownRef],
        handleClose,
        isShowing && closeOnClickOutside,
    );

    // Close on escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeOnEscape && isShowing) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isShowing, closeOnEscape, handleClose]);

    // Positioning styles
    const getPositionStyles = (): React.CSSProperties => {
        if (!triggerRect) return {};
        const gap = 6;

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
                return {};
        }
    };

    // Arrow styles
    const getArrowStyles = (): React.CSSProperties => {
        const arrowSize = "6px";
        const arrowColor = "#fff";
        const base: React.CSSProperties = {
            position: "absolute",
            width: 0,
            height: 0,
            border: `${arrowSize} solid transparent`,
        };
        switch (placement) {
            case "top":
                return {
                    ...base,
                    bottom: `-${arrowSize}`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderTopColor: arrowColor,
                    borderBottom: "0",
                };
            case "bottom":
                return {
                    ...base,
                    top: `-${arrowSize}`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderBottomColor: arrowColor,
                    borderTop: "0",
                };
            case "left":
                return {
                    ...base,
                    right: `-${arrowSize}`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderLeftColor: arrowColor,
                    borderRight: "0",
                };
            case "right":
                return {
                    ...base,
                    left: `-${arrowSize}`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderRightColor: arrowColor,
                    borderLeft: "0",
                };
            default:
                return base;
        }
    };

    // Animation styles
    const getAnimationStyles = (): React.CSSProperties => {
        const base = {
            transition: animated
                ? `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`
                : "none",
        };

        switch (animationState) {
            case "closed":
                return {
                    ...base,
                    opacity: 0,
                    visibility: "hidden",
                    transform: "scale(0.95)",
                };
            case "opening":
                return {
                    ...base,
                    opacity: 0,
                    visibility: "visible",
                    transform: "scale(0.95)",
                };
            case "open":
                return {
                    ...base,
                    opacity: 1,
                    visibility: "visible",
                    transform: "scale(1)",
                };
            case "closing":
                return {
                    ...base,
                    opacity: 0,
                    visibility: "visible",
                    transform: "scale(0.95)",
                };
            default:
                return base;
        }
    };

    // Width support
    const widthValue =
        width in baseTheme.spacing
            ? baseTheme.spacing[width as SpacingToken]
            : width;

    // Render dropdown list
    const menu = (
        <Card
            ref={dropdownRef}
            variant="elevated"
            className={`dropdown ${className ?? ""}`}
            style={{
                position: "fixed",
                zIndex: 1000,
                width: widthValue,
                ...getPositionStyles(),
                ...getAnimationStyles(),
            }}
            role="menu"
        >
            {showArrow && (
                <div style={getArrowStyles()} data-arrow={placement} />
            )}
            <Stack direction="column" gap="xs">
                {items.map((item, idx) => (
                    <Button
                        key={idx}
                        onClick={() => {
                            if (!item.disabled && item.onClick) item.onClick();
                            handleClose();
                        }}
                        disabled={item.disabled}
                        variant="ghost"
                        role="menuitem"
                        style={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            width: "100%",
                            padding: baseTheme.spacing.sm,
                        }}
                    >
                        <Stack direction="row" align="center" gap="xs">
                            {item.icon && <Box>{item.icon}</Box>}
                            <Text>{item.label}</Text>
                        </Stack>
                    </Button>
                ))}
            </Stack>
        </Card>
    );

    return (
        <>
            <Box
                ref={containerRef}
                style={{
                    display: "inline-block",
                    position: "relative",
                    width: "fit-content",
                    height: "fit-content",
                }}
            >
                <Box ref={triggerRef} onClick={handleOpen}>
                    {children}
                </Box>
            </Box>
            {createPortal(
                (isShowing || animationState !== "closed") && menu,
                document.body,
            )}
        </>
    );
};

export default Dropdown;
