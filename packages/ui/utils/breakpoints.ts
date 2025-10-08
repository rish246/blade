export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

export type Breakpoint = keyof typeof breakpoints;

export const mediaQuery = (key: keyof typeof breakpoints) =>
    `@media (min-width: ${breakpoints[key]}px)`;

export const getActiveBreakpoint = (): Breakpoint => {
    const width = window.innerWidth;
    const result = (() => {
        if (width >= breakpoints["2xl"]) return "2xl";
        if (width >= breakpoints.xl) return "xl";
        if (width >= breakpoints.lg) return "lg";
        if (width >= breakpoints.md) return "md";
        return "sm";
    })();

    return result;
};
