import {
    type CSSProperties,
    type PropsWithChildren,
    memo,
    useMemo,
} from "react";
import { baseTheme } from "../../theme/tokens";
import Box from "../Box";
type StackProps = PropsWithChildren<{
    direction?: CSSProperties["flexDirection"];
    align?: CSSProperties["alignItems"];
    justify?: CSSProperties["justifyContent"];
    wrap?: CSSProperties["flexWrap"];
    gap?: string; // spacing between children

    className?: string;
    style?: CSSProperties;
}>;

const Stack = ({
    className,
    align,
    justify,
    wrap,
    gap,
    direction,
    style,
    children,
}: StackProps) => {
    const flexDirection = direction || "row";
    const alignItems = align || "center";
    const justifyContent = justify || "center";
    const flexWrap = wrap || "nowrap";
    const flexGap = gap || baseTheme.spacing.sm;
    const finalStyle = useMemo(
        () => ({
            display: "flex",
            flexDirection,
            alignItems,
            justifyContent,
            flexWrap,
            gap: flexGap,
            flexGrow: "inherit",
            ...style,
        }),
        [alignItems, flexDirection, flexGap, flexWrap, justifyContent, style],
    );
    return (
        <Box w="auto" style={finalStyle} className={className}>
            {children}
        </Box>
    );
};

export default memo(Stack);
