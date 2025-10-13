import { useState, useEffect, useMemo, PropsWithChildren } from "react";
import { getActiveBreakpoint, type Breakpoint } from "../../utils/breakpoints";
import Box from "../Box";
export type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
    PropsWithChildren<{
        maxWidth?:
            | "sm"
            | "md"
            | "lg"
            | "xl"
            | "2xl"
            | "full"
            | Partial<Record<Breakpoint, string>>;
        padding?: "none" | "sm" | "md" | "lg";
        /** Vertical margin */
        marginY?: "none" | "sm" | "md" | "lg";
        /** Centers the container horizontally */
        center?: boolean;
    }>;

export const Container: React.FC<ContainerProps> = ({
    children,
    maxWidth = "xl",
    padding = "md",
    marginY = "none",
    center = true,
    style,
    ...props
}) => {
    const [activeBp, setActiveBp] = useState<Breakpoint>("sm");

    useEffect(() => {
        if (!window) {
            return;
        }
        const handleResize = () => setActiveBp(getActiveBreakpoint());
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine which width to apply
    const resolvedMaxWidth =
        typeof maxWidth === "string" ? maxWidth : maxWidth[activeBp] || "full";

    const containerStyle: React.CSSProperties = useMemo(() => {
        const maxWidthMap: Record<string, string> = {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1536px",
            full: "100%",
        };

        const paddingMap: Record<string, string> = {
            none: "0",
            sm: "8px",
            md: "16px",
            lg: "32px",
        };

        const marginYMap: Record<string, string> = {
            none: "0",
            sm: "8px",
            md: "16px",
            lg: "32px",
        };
        return {
            width: "100%",
            boxSizing: "border-box",
            maxWidth: maxWidthMap[resolvedMaxWidth],
            paddingLeft: paddingMap[padding],
            paddingRight: paddingMap[padding],
            marginTop: marginYMap[marginY],
            marginBottom: marginYMap[marginY],
            marginLeft: center ? "auto" : undefined,
            marginRight: center ? "auto" : undefined,
            ...style,
        };
    }, [resolvedMaxWidth, padding, marginY, center, style]);
    return (
        <Box style={containerStyle} {...props}>
            {children}
        </Box>
    );
};

export default Container;
