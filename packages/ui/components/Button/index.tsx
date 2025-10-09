import {
    ComponentPropsWithoutRef,
    CSSProperties,
    ElementType,
    PropsWithChildren,
} from "react";
import { useTheme } from "../../theme/theme-provider";
import { Theme } from "../../theme/Theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps<T extends ElementType> = PropsWithChildren<{
    as?: T;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
    onClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}> &
    Omit<ComponentPropsWithoutRef<T>, "as">;

const getBgColor = (tokens: Theme, variant: ButtonVariant): string => {
    switch (variant) {
        case "primary":
            return tokens.colors.accent;
        case "secondary":
            return tokens.colors.surface;
        case "danger":
            return tokens.colors.error;
        case "ghost":
            return tokens.colors.transparent;
        case "outline":
            return tokens.colors.transparent;
    }
};

const getSize = (
    tokens: Theme,
    size: ButtonSize,
): {
    padding: string;
    fontSize: string;
} => {
    switch (size) {
        case "md": {
            return {
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                fontSize: tokens.typography.fontSizeMd,
            };
        }
        case "sm": {
            return {
                padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
                fontSize: tokens.typography.fontSizeSm,
            };
        }
        case "lg": {
            return {
                padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                fontSize: tokens.typography.fontSizeLg,
            };
        }
    }
};

const Button = <T extends ElementType = "button">({
    as,
    variant,
    size,
    disabled,
    loading,
    loadingText,
    fullWidth,
    onClick,
    children,
    style,
    className,
    ...rest
}: ButtonProps<T>) => {
    const { theme } = useTheme();
    const Component = as || "button";
    const { padding, fontSize } = getSize(theme, size || "md");
    const finalDisabled = disabled || loading || false;

    const disabledStyles: CSSProperties = finalDisabled
        ? {
              opacity: 0.5,
              cursor: "not-allowed",
          }
        : {};

    const handleClick = (e?: React.MouseEvent | React.KeyboardEvent) => {
        try {
            if (loading || !onClick) {
                return;
            }
            onClick(e);
        } catch (err) {
            console.error(err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && onClick && !disabled) {
            handleClick(e);
        }
    };

    const loadingTextFinal = loadingText || "...";

    const commonProps = {
        className,
        style: {
            backgroundColor: getBgColor(theme, variant || "primary"),
            color: theme.colors.text,
            padding,
            fontSize,
            ...(variant === "outline"
                ? { borderColor: theme.colors.text }
                : {}),
            ...(variant === "ghost"
                ? { borderColor: theme.colors.none, border: "none" }
                : {}),
            ...(fullWidth ? { width: "100%" } : {}),
            ...disabledStyles,
            ...style,
        },
        disabled: finalDisabled,
        onClick: handleClick,
        "aria-busy": loading,
        "aria-disabled": finalDisabled,
    };

    if (Component === "a") {
        return (
            <a
                {...commonProps}
                role="link"
                style={{
                    ...commonProps.style,
                    textDecoration: "none",
                }}
                onKeyDown={handleKeyDown}
                {...rest}
            >
                <div className="content">
                    {loading ? loadingTextFinal : children}
                </div>
            </a>
        );
    }
    return (
        <button
            {...commonProps}
            onKeyDown={handleKeyDown}
            role="button"
            {...rest}
        >
            <div className="content">
                {loading ? loadingTextFinal : children}
            </div>
        </button>
    );
};

export default Button;
