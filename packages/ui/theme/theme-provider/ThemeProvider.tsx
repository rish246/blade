import {
    createContext,
    PropsWithChildren,
    useLayoutEffect,
    useState,
} from "react";
import { lightTheme, darkTheme } from "../tokens";
import { Theme } from "../Theme";

type ThemeName = "light" | "dark";

interface ThemeContextValue {
    themeName: ThemeName;
    theme: Theme;
    setTheme: (theme: ThemeName) => void;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const themes: Record<ThemeName, Theme> = {
    light: lightTheme,
    dark: darkTheme,
};

const applyThemeToDom = (theme: Theme) => {
    const root = document.documentElement;

    Object.keys(theme).forEach((category) => {
        const tokens = (theme as any)[category];
        if (typeof tokens === "object") {
            Object.keys(tokens).forEach((token) => {
                root.style.setProperty(
                    `--${category}-${token}`,
                    String(tokens[token]),
                );
            });
        }
    });

    root.setAttribute("data-theme", theme === lightTheme ? "light" : "dark");
};

export const ThemeProvider = ({
    children,
    initialTheme = "light",
}: PropsWithChildren<{ initialTheme?: ThemeName }>) => {
    const [themeName, setThemeName] = useState<ThemeName>(() => {
        // get theem from localStorage
        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as ThemeName) || initialTheme;
        }
        return initialTheme;
    });

    const toggleTheme = () =>
        setThemeName((prev) => (prev === "dark" ? "light" : "dark"));

    useLayoutEffect(() => {
        applyThemeToDom(themes[themeName]);
        localStorage.setItem("theme", themeName);
    }, [themeName]);

    return (
        <ThemeContext.Provider
            value={{
                themeName,
                theme: themes[themeName],
                setTheme: setThemeName,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
