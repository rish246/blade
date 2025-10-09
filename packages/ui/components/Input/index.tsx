import { CSSProperties, ReactElement, useState } from "react";
import Box from "../Box";
import Text from "../Text";
import "./Input.css";
import Button from "../Button";
import { useTheme } from "../../theme/theme-provider";
import { Theme } from "../../theme/Theme";
export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "error" | "success";

export type InputProps = Omit<
    React.ComponentPropsWithoutRef<"input">,
    "size"
> & {
    size?: InputSize;
    variant?: InputVariant;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    label?: string;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    fullWidth?: boolean;
    showPasswordToggle?: boolean;
};

const getSizeStyles = (theme: Theme, size: InputSize): CSSProperties => {
    switch (size) {
        case "lg": {
            return {
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                fontSize: theme.typography.fontSizeLg,
            };
        }

        case "md": {
            return {
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                fontSize: theme.typography.fontSizeMd,
            };
        }

        case "sm": {
            return {
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                fontSize: theme.typography.fontSizeSm,
            };
        }
    }
};

const getVariantStyles = (
    theme: Theme,
    variant: InputVariant,
): CSSProperties => {
    switch (variant) {
        case "default": {
            return {
                borderColor: theme.colors.muted,
            };
        }
        case "success": {
            return {
                borderColor: theme.colors.success,
            };
        }
        case "error": {
            return {
                borderColor: theme.colors.error,
            };
        }
    }
};

const getDisabledStyles = (disabled: boolean): CSSProperties => {
    if (disabled) {
        return {
            opacity: "0.5",
            cursor: "not-allowed",
        };
    }
    return {};
};

const getReadOnlyStyle = (theme: Theme, readonly: boolean): CSSProperties => {
    if (!readonly) {
        return {};
    }
    return {
        backgroundColor: theme.colors.surface,
    };
};

const getRole = (type: React.HTMLInputTypeAttribute): React.AriaRole => {
    switch (type) {
        case "number": {
            return "spinbutton";
        }
        case "search": {
            return "searchbox";
        }
        default: {
            return "textbox";
        }
    }
};

const Input = ({
    id = `input-${Math.random().toString(36).substr(2, 9)}`,
    size = "md",
    variant = "default",
    error,
    helperText,
    disabled = false,
    readOnly = false,
    label,
    required,
    className,
    type = "text",
    leftIcon,
    rightIcon,
    fullWidth = false,
    style,
    showPasswordToggle,
    onChange,
    ...rest
}: InputProps) => {
    const [inputType, setInputType] = useState<typeof type>(type);
    const { theme } = useTheme();
    const sizeStyles = getSizeStyles(theme, size);
    const finalVariant = error ? "error" : variant;
    const variantStyles = getVariantStyles(theme, finalVariant);
    const disabledStyles = getDisabledStyles(disabled);
    const readonlyStyles = getReadOnlyStyle(theme, readOnly);
    const errorId = error && id ? `${id}-error` : "";
    const finalRole = getRole(type);
    // const errorId = error ?
    const getBelowContent = () => {
        if (error) {
            return (
                <Text color={"error"} role="alert" id={errorId}>
                    {error}
                </Text>
            );
        }

        if (helperText) {
            return <Text color={"surface"}>{helperText}</Text>;
        }

        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly || disabled || !onChange) {
            return;
        }
        onChange(e);
    };

    const getLabel = (htmlFor: string) => {
        return (
            <label htmlFor={htmlFor}>
                {label}
                {required && <Text>*</Text>}
            </label>
        );
    };

    return (
        <Box
            style={{
                position: "relative",
                borderColor: theme.colors.none,
                ...(fullWidth ? { width: "100%" } : { width: "fit-content" }),
            }}
        >
            {label && getLabel(id)}
            {leftIcon && (
                <Box
                    style={{
                        position: "absolute",
                        top: label ? "calc(50% + 12px)" : "50%", // Account for label height
                        transform: "translateY(-50%)",
                        left: theme.spacing.sm,
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        zIndex: 1,
                    }}
                >
                    {leftIcon}
                </Box>
            )}

            {rightIcon && (
                <Box
                    style={{
                        position: "absolute",
                        top: label ? "calc(50% + 12px)" : "50%", // Account for label height
                        transform: "translateY(-50%)",
                        right: theme.spacing.sm,
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        zIndex: 1,
                    }}
                >
                    {rightIcon}
                </Box>
            )}

            {showPasswordToggle && (
                <Button
                    variant="ghost"
                    size="sm"
                    style={{
                        position: "absolute",
                        top: label ? "calc(50% + 12px)" : "50%", // Account for label height
                        transform: "translateY(-50%)",
                        right: theme.spacing.xs,
                        zIndex: 2,
                    }}
                    onClick={() => {
                        setInputType(
                            inputType === "password" ? "text" : "password",
                        );
                    }}
                >
                    show password
                </Button>
            )}
            <input
                id={id}
                className={`input ${className}`}
                role={finalRole}
                style={{
                    ...sizeStyles,
                    ...variantStyles,
                    ...disabledStyles,
                    ...readonlyStyles,
                    ...(leftIcon ? { paddingLeft: theme.spacing.xl } : {}),
                    ...(rightIcon ? { paddingRight: theme.spacing.xl } : {}),
                    width: "100%",
                    backgroundColor: theme.colors.bg,
                    color: theme.colors.text,
                    ...style,
                }}
                type={inputType}
                disabled={disabled}
                onChange={handleChange}
                readOnly={readOnly}
                required={required}
                aria-invalid={error ? "true" : "false"}
                aria-required={required}
                aria-describedby={errorId}
                {...rest}
            />
            {getBelowContent()}
        </Box>
    );
};

export default Input;
