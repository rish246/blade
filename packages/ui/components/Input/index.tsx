import { CSSProperties, ReactElement, useState } from "react";
import { tokens } from "../../tokens/tokens";
import Box from "../Box";
import Text from "../Text";
import "./Input.css";
import Button from "../Button";
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

const getSizeStyles = (size: InputSize): CSSProperties => {
    switch (size) {
        case "lg": {
            return {
                padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                fontSize: tokens.typography.fontSizeLg,
            };
        }

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
    }
};

const getVariantStyles = (variant: InputVariant): CSSProperties => {
    switch (variant) {
        case "default": {
            return {
                borderColor: tokens.colors.muted,
            };
        }
        case "success": {
            return {
                borderColor: tokens.colors.success,
            };
        }
        case "error": {
            return {
                borderColor: tokens.colors.error,
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

const getReadOnlyStyle = (readonly: boolean): CSSProperties => {
    if (!readonly) {
        return {};
    }
    return {
        backgroundColor: tokens.colors.surface,
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
    const sizeStyles = getSizeStyles(size);
    const finalVariant = error ? "error" : variant;
    const variantStyles = getVariantStyles(finalVariant);
    const disabledStyles = getDisabledStyles(disabled);
    const readonlyStyles = getReadOnlyStyle(readOnly);
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
                borderColor: tokens.colors.none,
            }}
        >
            {label && getLabel(id)}
            {leftIcon && (
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        width: tokens.spacing.lg,
                        overflow: "hidden",
                    }}
                >
                    {leftIcon}
                </Box>
            )}

            {rightIcon && (
                <Text
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                    }}
                >
                    {rightIcon}
                </Text>
            )}

            {showPasswordToggle && (
                <Button
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
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
                    ...(leftIcon ? { paddingLeft: tokens.spacing.xl } : {}),
                    ...(rightIcon ? { paddingRight: tokens.spacing.xl } : {}),
                    ...(fullWidth ? { width: "100%" } : {}),
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
