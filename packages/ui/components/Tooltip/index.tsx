import {
    PropsWithChildren,
    useId,
    useRef,
    useState,
    useEffect,
    CSSProperties,
} from "react";
import Box from "../Box";

type LiveRegion = "polite" | "assertive" | "off";
type Trigger = "hover" | "focus" | "click";
export type TooltipProps = PropsWithChildren<{
    content: React.ReactNode;
    className?: string;
    contentClassName?: string;
    delayMs?: number;
    liveRegion?: LiveRegion;
    trigger?: Trigger | Trigger[];
    placement?: "top" | "bottom" | "left" | "right";
    onOpen?: () => void;
    onClose?: () => void;
    portal?: string;
}>;

const Tooltip = ({
    content,
    className,
    contentClassName,
    delayMs = 150,
    liveRegion = "off",
    trigger = "hover",
    placement = "top",
    onOpen,
    onClose,
    portal,
    children,
}: TooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipId = useId();

    const handleOpen = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(true);
            if (onOpen) {
                onOpen();
            }
        }, delayMs);
    };

    const handleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const handleKeydown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Tab") {
            handleClose();
        }
    };

    const getHandlerFor = (trigger: Trigger) => {
        switch (trigger) {
            case "hover":
                return {
                    onMouseEnter: handleOpen,
                    onMouseLeave: handleClose,
                };

            case "focus":
                return {
                    onFocus: handleOpen,
                    onBlur: handleClose,
                };
            default:
                return {
                    onClick: handleOpen,
                };
        }
    };

    const triggerHandlers = (() => {
        if (Array.isArray(trigger)) {
            return trigger.reduce(
                (acc, cur) => ({
                    ...acc,
                    ...getHandlerFor(cur),
                }),
                {},
            );
        }
        return getHandlerFor(trigger);
    })();

    const getPositionStyles = (): CSSProperties => {
        const gap = 8;

        switch (placement) {
            case "top":
                return {
                    bottom: `calc(100% + ${gap}px)`,
                    left: "50%",
                };
            case "bottom":
            case "left":
            case "right":
            default:
                return {
                    bottom: `calc(100% + ${gap}px)`,
                    left: "50%",
                    transform: "translateX(-50%)",
                };
        }
    };
    // Always render tooltip, but control visibility
    const tooltipContent = (
        <Box
            className={contentClassName}
            id={tooltipId}
            role="tooltip"
            aria-live={liveRegion}
            data-placement={placement}
            bg="surface"
            style={{
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.15s ease-in-out",
                marginBottom: placement === "top" ? "8px" : undefined,
                marginTop: placement === "bottom" ? "8px" : undefined,
                marginRight: placement === "left" ? "8px" : undefined,
                marginLeft: placement === "right" ? "8px" : undefined,
                maxHeight: isOpen ? "1000px" : "0",
                overflow: isOpen ? "visible" : "hidden",
                position: "absolute",
                ...getPositionStyles(),
            }}
        >
            {content}
        </Box>
    );

    const getContainerStyle = () => {
        const baseStyle: CSSProperties = {
            display: "inline-flex",
            alignItems: "center",
            position: "relative",
            width: "auto",
        };

        switch (placement) {
            case "top":
                return { ...baseStyle, flexDirection: "column" as const };
            case "bottom":
                return {
                    ...baseStyle,
                    flexDirection: "column-reverse" as const,
                };
            case "left":
                return { ...baseStyle, flexDirection: "row" as const };
            case "right":
                return { ...baseStyle, flexDirection: "row-reverse" as const };
            default:
                return baseStyle;
        }
    };

    return (
        <span className={className} style={getContainerStyle()}>
            {(placement === "top" || placement === "left") && tooltipContent}

            <Box
                aria-describedby={isOpen ? tooltipId : undefined}
                {...triggerHandlers}
                onKeyDown={handleKeydown}
                style={{
                    width: "fit-content",
                    height: "fit-content",
                }}
            >
                {children}
            </Box>

            {(placement === "bottom" || placement === "right") &&
                tooltipContent}
        </span>
    );
};

export default Tooltip;
