import type { PropsWithChildren, CSSProperties } from "react";
import {
    ColorToken,
    RadiusToken,
    SpacingToken,
    tokens,
} from "../../tokens/tokens";

export type BoxProps = PropsWithChildren<{
    className?: string;
    style?: CSSProperties;

    m?: SpacingToken; // margin
    p?: SpacingToken; // padding
    bg?: ColorToken; // background color
    color?: ColorToken; // text color
    rounded?: RadiusToken;

    w?: number | string; // width
    h?: number | string; // height
}> &
    React.HTMLAttributes<HTMLDivElement>;

const Box = ({
    m,
    p,
    className,
    style,
    w,
    h,
    bg,
    color,
    rounded,
    children,
    ...rest
}: BoxProps) => {
    // I want to give it some default styling
    const margin = m ? tokens.spacing[m] : "0px";
    const padding = p ? tokens.spacing[p] : "0px";
    const background = tokens.colors[bg || "bg"];
    const textColor = tokens.colors[color || "text"];
    const borderRadius = tokens.radii[rounded || "md"];

    return (
        <div
            className={className ?? ""}
            style={{
                margin,
                padding,
                background,
                color: textColor,
                borderRadius,

                width: w,
                height: h,

                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Box;
