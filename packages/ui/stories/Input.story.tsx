import React from "react";
import Input from "../components/Input";
import { ThemeProvider, useTheme } from "../theme/theme-provider";
import Box from "../components/Box";
import { Button } from "../components";

export default {
    title: "UI/Form/Input",
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="light">
        <Box
            p="md"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "400px",
            }}
        >
            {children}
        </Box>
    </ThemeProvider>
);

export const Basic = () => (
    <Wrapper>
        <Input placeholder="Enter your name" />
    </Wrapper>
);

export const WithLabel = () => (
    <Wrapper>
        <Input label="Username" placeholder="Enter your username" />
    </Wrapper>
);

export const WithHelperText = () => (
    <Wrapper>
        <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            helperText="We’ll never share your email."
        />
    </Wrapper>
);

export const WithError = () => (
    <Wrapper>
        <Input
            label="Password"
            type="password"
            error="Password must be at least 8 characters"
        />
    </Wrapper>
);

export const Disabled = () => (
    <Wrapper>
        <Input label="Disabled Input" placeholder="Can't type here" disabled />
    </Wrapper>
);

export const ReadOnly = () => (
    <Wrapper>
        <Input label="Read-Only" value="Static value" readOnly />
    </Wrapper>
);

export const Required = () => (
    <Wrapper>
        <Input label="Email" required placeholder="Enter your email" />
    </Wrapper>
);

export const WithIcons = () => (
    <Wrapper>
        <Input
            label="Search"
            leftIcon={
                <span role="img" aria-label="search">
                    🔍
                </span>
            }
            rightIcon={
                <span role="img" aria-label="check">
                    ✅
                </span>
            }
            placeholder="Search..."
        />
    </Wrapper>
);

export const Sizes = () => (
    <Wrapper>
        <Input label="Small" size="sm" placeholder="Small input" />
        <Input label="Medium" size="md" placeholder="Medium input" />
        <Input label="Large" size="lg" placeholder="Large input" />
    </Wrapper>
);

export const Variants = () => (
    <Wrapper>
        <Input label="Default" placeholder="Default variant" />
        <Input
            label="Success"
            variant="success"
            placeholder="Success variant"
        />
        <Input label="Error" variant="error" placeholder="Error variant" />
    </Wrapper>
);

export const PasswordWithToggle = () => (
    <Wrapper>
        <Input label="Password" type="password" showPasswordToggle />
    </Wrapper>
);

export const FullWidth = () => (
    <ThemeProvider initialTheme="light">
        <Box p="md" style={{ width: "100%", maxWidth: "600px" }}>
            <Input
                fullWidth
                label="Full Width Input"
                placeholder="Grows with container"
            />
        </Box>
    </ThemeProvider>
);

export const DarkTheme = () => (
    <Wrapper>
        <ThemeToggle />
        <Box p="md">
            <Input label="Dark Mode Input" placeholder="Type something..." />
            <Input
                label="Error"
                variant="error"
                placeholder="With error color"
            />
            <Input
                label="Success"
                variant="success"
                placeholder="With success color"
            />
        </Box>
    </Wrapper>
);

const ThemeToggle = () => {
    const { toggleTheme } = useTheme();
    return <Button onClick={toggleTheme}>Toggle</Button>;
};
