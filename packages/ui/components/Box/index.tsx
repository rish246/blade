import {
    type PropsWithChildren,
    type CSSProperties,
    forwardRef,
    memo,
} from "react";
import { ColorToken, RadiusToken, SpacingToken } from "../../theme/Theme";
import { useTheme } from "../../theme/theme-provider";

export type BoxProps = PropsWithChildren<{
    className?: string;
    style?: CSSProperties;

    m?: SpacingToken; // margin
    p?: SpacingToken; // padding
    bg?: ColorToken | string; // background color
    color?: ColorToken | string; // text color
    rounded?: RadiusToken;

    w?: number | string; // width
    h?: number | string; // height
}> &
    React.HTMLAttributes<HTMLDivElement>;

const Box = forwardRef<HTMLDivElement, BoxProps>(
    (
        {
            m,
            p,
            className,
            style,
            w,
            h,
            bg = "bg",
            color = "text",
            rounded,
            children,
            ...rest
        },
        ref,
    ) => {
        const { theme } = useTheme();
        // I want to give it some default styling
        const margin = m ? theme.spacing[m] : "0px";
        const padding = p ? theme.spacing[p] : "0px";
        const background = bg in theme.colors ? (theme as any).colors[bg] : bg;
        const textColor =
            color in theme.colors ? (theme as any).colors[color] : color;

        const borderRadius = theme.radii[rounded || "md"];
        return (
            <div
                ref={ref}
                className={className ?? ""}
                style={{
                    margin,
                    padding,
                    background,
                    color: textColor,
                    borderRadius,

                    width: w || "auto",
                    height: h || "auto",
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        );
    },
);

export default memo(Box);
