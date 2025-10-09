import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("Use the hook inside a ThemeContextProvider");
    }
    return ctx;
};
