import { CSSProperties, PropsWithChildren } from "react";
import Box from "../Box";
type GridItemProps = PropsWithChildren<{
    colSpan?: number;
    rowSpan?: number;
    colStart?: number;
    rowStart?: number;
    style?: CSSProperties;
    className?: string;
}>;
const GridItem = ({
    colSpan = 1,
    rowSpan = 1,
    colStart,
    rowStart,
    style,
    children,
    className,
}: GridItemProps) => {
    const computedStyle: CSSProperties = {
        ...(colStart
            ? { gridColumnStart: colStart }
            : { gridColumn: `span ${colSpan}` }),
        ...(rowStart
            ? { gridRowStart: rowStart }
            : { gridRow: `span ${rowSpan}` }),
        ...style,
    };

    return (
        <Box className={className} style={computedStyle}>
            {children}
        </Box>
    );
};

export default GridItem;
