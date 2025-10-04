import type { ReactNode, CSSProperties, ElementType, JSX } from "react";
import { tokens } from "../../tokens/tokens";

type TextSize = "sm" | "md" | "lg";
type TextWeight = "normal" | "medium" | "bold";

export type TextProps<T extends ElementType = "span"> = {
    as?: T;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;

    size?: TextSize;
    weight?: TextWeight;
    color?: keyof typeof tokens.colors;
    align?: CSSProperties["textAlign"];
};

const Text = <T extends ElementType = "span">({
    as,
    children,
    className = "",
    style = {},
    size = "md",
    weight = "normal",
    color = "text",
    align = "left",
    ...rest
}: TextProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
    const Component = as || "span";

    const fontSize =
        size === "sm"
            ? tokens.typography.fontSizeSm
            : size === "lg"
              ? tokens.typography.fontSizeLg
              : tokens.typography.fontSizeMd;

    const lineHeight =
        size === "sm"
            ? tokens.typography.lineHeightSm
            : size === "lg"
              ? tokens.typography.lineHeightLg
              : tokens.typography.lineHeightMd;

    const fontWeight =
        weight === "medium"
            ? tokens.typography.fontWeightMedium
            : weight === "bold"
              ? tokens.typography.fontWeightBold
              : tokens.typography.fontWeightNormal;

    return (
        <Component
            className={className}
            style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize,
                lineHeight,
                fontWeight,
                color: tokens.colors[color],
                textAlign: align,
                ...style,
            }}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Text;
