import type { CSSProperties, PropsWithChildren } from "react";
import { SpacingToken, tokens } from "../../tokens/tokens";

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
    const flexGap = gap || tokens.spacing.sm;
    return (
        <div
            style={{
                display: "flex",
                flexDirection,
                alignItems,
                justifyContent,
                flexWrap,
                gap: flexGap,
                ...style,
            }}
            className={className}
        >
            {children}
        </div>
    );
};

export default Stack;
