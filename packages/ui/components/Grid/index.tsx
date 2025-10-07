import { PropsWithChildren, CSSProperties, useState, useEffect } from "react";
import {
    Breakpoint,
    getActiveBreakpoint,
    breakpoints,
} from "../../utils/breakpoints";
import { SpacingToken, tokens } from "../../tokens/tokens";
import Box from "../Box";

type GridAlign = "start" | "center" | "end" | "stretch";
type GridJustify =
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "between"
    | "around";

type GridProps = PropsWithChildren<{
    columns?: number | Partial<Record<Breakpoint, number>>;
    gap?: SpacingToken;
    rowGap?: SpacingToken;
    colGap?: SpacingToken;
    align?: GridAlign;
    justify?: GridJustify;
    autoRows?: string;
    templateRows?: string;
    wrap?: boolean;
    style?: CSSProperties;
    rowStart?: number;
    colStart?: number;
    className?: string;
}> &
    Omit<React.ComponentPropsWithoutRef<"div">, "color">;

const getColumnStyles = (
    columns: number | Partial<Record<Breakpoint, number>>,
    breakpoint: Breakpoint = "lg",
): CSSProperties => {
    if (typeof columns === "number") {
        return {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
        };
    }
    return {
        gridTemplateColumns: `repeat(${columns[breakpoint]}, 1fr)`,
    };
};

const getSuitableBreakpoint = (
    breakpointsUsed: number | Partial<Record<Breakpoint, number>>,
): Breakpoint => {
    if (typeof breakpointsUsed === "number") {
        return "sm";
    }
    const sortedBreakpoints: Breakpoint[] = ["sm", "md", "lg", "xl", "2xl"];
    const curBreakpoint = getActiveBreakpoint();
    let result: Breakpoint = curBreakpoint;
    for (let bp of sortedBreakpoints) {
        if (
            breakpoints[bp] <= breakpoints[curBreakpoint] &&
            Object.keys(breakpointsUsed).includes(bp)
        ) {
            result = bp;
        }
    }
    return result;
};

const getJustifyContent = (
    justify: GridJustify,
): CSSProperties["justifyContent"] => {
    const map: { [key in GridJustify]: CSSProperties["justifyContent"] } = {
        center: "center",
        between: "space-between",
        start: "start",
        end: "end",
        stretch: "stretch",
        around: "space-around",
    };
    return map[justify];
};

const Grid = ({
    columns = 1,
    gap = "md",
    rowGap = "none",
    colGap = "none",
    align = "stretch",
    justify = "start",
    autoRows = "auto",
    templateRows,
    wrap = true,
    rowStart = 0,
    colStart = 0,
    style,
    children,
    className,
    ...rest
}: GridProps) => {
    const [curBp, setCurBp] = useState(() => getSuitableBreakpoint(columns));

    useEffect(() => {
        const handleResize = () => {
            console.log("Handling Resize");
            setCurBp(() => getSuitableBreakpoint(columns));
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const columnStyles = getColumnStyles(columns, curBp);

    return (
        <Box
            className={className}
            style={{
                display: "grid",
                ...columnStyles,
                gap: tokens.spacing[gap],
                rowGap: tokens.spacing[rowGap],
                columnGap: tokens.spacing[colGap],
                alignItems: align,
                justifyContent: getJustifyContent(justify),
                gridAutoRows: autoRows,
                gridTemplateRows: templateRows,
                gridAutoFlow: wrap ? "row" : "column",
                gridRowStart: rowStart,
                gridColumnStart: colStart,
                ...style,
            }}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default Grid;
