import type { ReactNode, CSSProperties, ElementType } from "react";
import { useTheme } from "../../theme/theme-provider";
import { ColorToken } from "../../theme/Theme";

type TextSize = "sm" | "md" | "lg" | "xl" | "2xl";
type TextWeight = "normal" | "medium" | "bold";

export type TextProps<T extends ElementType = "span"> = {
    as?: T;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    size?: TextSize;
    weight?: TextWeight;
    color?: ColorToken;
    align?: CSSProperties["textAlign"];
};

const Text = <T extends ElementType = "span">({
    as,
    children,
    className = "",
    style = {},
    size,
    weight,
    color = "text",
    align = "left",
    ...rest
}: TextProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
    const { theme } = useTheme();
    const Component = as || "span";

    // Auto-detect if it's a heading and apply appropriate defaults
    const isHeading = typeof as === "string" && /^h[1-6]$/.test(as);

    // Smart defaults based on element type
    const defaultSize: TextSize = isHeading
        ? as === "h1"
            ? "2xl"
            : as === "h2"
              ? "xl"
              : as === "h3"
                ? "lg"
                : as === "h4"
                  ? "md"
                  : "sm" // h5, h6
        : "md";

    const defaultWeight: TextWeight = isHeading ? "bold" : "normal";

    // Use provided props or fall back to smart defaults
    const finalSize = size ?? defaultSize;
    const finalWeight = weight ?? defaultWeight;

    // Map size to actual font size from theme
    const fontSizeMap = {
        sm: theme.typography.fontSizeSm,
        md: theme.typography.fontSizeMd,
        lg: theme.typography.fontSizeLg,
        xl: theme.typography.fontSizeXl,
        "2xl": theme.typography.fontSize2xl,
    };

    const lineHeightMap = {
        sm: theme.typography.lineHeightSm,
        md: theme.typography.lineHeightMd,
        lg: theme.typography.lineHeightLg,
        xl: theme.typography.lineHeightXl,
        "2xl": theme.typography.lineHeight2xl,
    };

    const fontSize = fontSizeMap[finalSize];
    const lineHeight = lineHeightMap[finalSize];

    // Map weight to font weight from theme
    const fontWeight =
        finalWeight === "medium"
            ? theme.typography.fontWeightMedium
            : finalWeight === "bold"
              ? theme.typography.fontWeightBold
              : theme.typography.fontWeightNormal;

    return (
        <Component
            className={className}
            style={{
                fontFamily: theme.typography.fontFamily,
                fontSize, // ✅ Now uses calculated pixel/rem value
                lineHeight, // ✅ Uses calculated line height
                fontWeight, // ✅ Uses calculated font weight (400, 500, 700)
                color: theme.colors[color],
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
