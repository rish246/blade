import { PropsWithChildren } from "react";
import { tokens } from "../../tokens/tokens";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";

type ButtonProps = PropsWithChildren<{
    variant?: ButtonVariant;
}>;

const getBgColor = (variant: ButtonVariant): string => {
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

const Button = ({ variant, children }: ButtonProps) => {
    return (
        <button
            style={{
                backgroundColor: getBgColor(variant || "primary"),
            }}
        >
            {children}
        </button>
    );
};

export default Button;
