import { PropsWithChildren, useId, useRef, useState } from "react";
import Box from "../Box";
import { createPortal } from "react-dom";

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
            timeoutRef.current = null; // FIX: Clear the ref
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

    const tooltipContent = isOpen ? (
        <Box
            className={contentClassName}
            id={tooltipId}
            role="tooltip"
            aria-live={liveRegion}
            data-placement={placement}
        >
            {content}
        </Box>
    ) : null;

    return (
        <Box
            className={className}
            {...triggerHandlers}
            onKeyDown={handleKeydown}
        >
            {portal
                ? createPortal(tooltipContent, document.querySelector(portal)!)
                : tooltipContent}
            <Box aria-describedby={tooltipId}>{children}</Box>
        </Box>
    );
};

export default Tooltip;
