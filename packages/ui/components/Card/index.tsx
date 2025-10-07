import { CSSProperties, ElementType, ReactNode } from "react";
import { ColorToken, SpacingToken, tokens } from "../../tokens/tokens";
import Box from "../Box";

type CardVariant = "default" | "elevated" | "outlined" | "filled";
type CardBorderRadius = "none" | "sm" | "md" | "lg";

type CardBaseProps = {
    children?: ReactNode;
    variant?: CardVariant;
    padding?: SpacingToken;
    borderRadius?: CardBorderRadius;
    fullWidth?: boolean;
    disabled?: boolean;
    hoverable?: boolean;
    loading?: boolean;
    header?: ReactNode;
    footer?: ReactNode;
    image?: ReactNode;
    media?: ReactNode;
    className?: string;
    style?: CSSProperties;
    color?: ColorToken;
    onClick?: (e: React.MouseEvent) => void;
};

export type CardProps = CardBaseProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof CardBaseProps>;

const getVariantStyles = (variant: CardVariant): CSSProperties => {
    switch (variant) {
        case "elevated":
            return {
                backgroundColor: tokens.colors.bg,
                boxShadow: tokens.shadows.md,
                border: "none",
            };
        case "outlined":
            return {
                backgroundColor: tokens.colors.bg,
                border: `1px solid ${tokens.colors.muted}`,
                boxShadow: "none",
                borderWidth: "1px",
                borderTopWidth: "1px",
            };
        case "filled":
            return {
                backgroundColor: tokens.colors.surface,
                border: "none",
                boxShadow: "none",
            };
        case "default":
        default:
            return {
                backgroundColor: tokens.colors.bg,
                border: `1px solid ${tokens.colors.muted}`,
                boxShadow: "none",
                borderWidth: "1px",
                borderTopWidth: "1px",
            };
    }
};

const getBorderRadiusToken = (
    borderRadius: CardBorderRadius,
): "sm" | "md" | "lg" | undefined => {
    switch (borderRadius) {
        case "none":
            return undefined;
        case "sm":
            return "sm";
        case "lg":
            return "lg";
        case "md":
        default:
            return "md";
    }
};

const Card = ({
    children,
    variant = "default",
    padding = "md",
    borderRadius = "md",
    fullWidth = false,
    disabled = false,
    hoverable = false,
    loading = false,
    header,
    footer,
    image,
    media,
    className = "",
    style,
    color,
    onClick,
    ...rest
}: CardProps) => {
    const isClickable = !!onClick && !disabled;

    const handleClick = (e: React.MouseEvent) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        if (onClick) {
            onClick(e);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            if (onClick) {
                onClick(e as any);
            }
        }
    };

    const variantStyles = getVariantStyles(variant);
    const borderRadiusToken = getBorderRadiusToken(borderRadius);

    const baseStyles: CSSProperties = {
        fontFamily: tokens.typography.fontFamily,
        color: color || "text",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.2s ease",
        padding: tokens.spacing[padding || "md"],
        ...variantStyles,
        ...(isClickable ? { cursor: "pointer" } : {}),
        ...(disabled ? { opacity: "0.5", cursor: "not-allowed" } : {}),
        ...(hoverable || isClickable
            ? {
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }
            : {}),
    };

    const commonProps = {
        className,
        onClick: isClickable ? handleClick : undefined,
        onKeyDown: isClickable ? handleKeyDown : undefined,
        role: isClickable ? "button" : rest.role,
        tabIndex: isClickable ? 0 : undefined,
        "aria-disabled": disabled,
        "aria-busy": loading,
        ...rest,
    };

    if (loading) {
        return (
            <Box
                p={padding}
                rounded={borderRadiusToken}
                w={fullWidth ? "100%" : undefined}
                style={{ ...baseStyles, ...style }}
                {...commonProps}
            >
                Loading...
            </Box>
        );
    }

    return (
        <Box
            rounded={borderRadiusToken}
            w={fullWidth ? "100%" : undefined}
            style={{ ...baseStyles, ...style }}
            {...commonProps}
        >
            {(image || media) && (
                <Box style={{ overflow: "hidden", padding: "0" }}>
                    {image || media}
                </Box>
            )}

            {header && (
                <Box
                    p={padding}
                    style={{
                        borderBottom: `1px solid ${tokens.colors.muted}`,
                    }}
                >
                    {header}
                </Box>
            )}

            <Box p={padding}>{children}</Box>

            {footer && (
                <Box
                    p={padding}
                    style={{
                        borderTop: `1px solid ${tokens.colors.muted}`,
                        marginTop: "auto",
                    }}
                >
                    {footer}
                </Box>
            )}
        </Box>
    );
};

export default Card;
