import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import Stack from "../components/Stack";
import Text from "../components/Text";
import Box from "../components/Box";
import Icon from "../icons";
import { useState } from "react";
import {
    ThemeProvider as ThemeContextProvider,
    useTheme,
} from "../theme/theme-provider";
import { Theme } from "../theme/Theme";

export default {
    title: "UI/Overlay/Dropdown",
    component: Dropdown,
};

/* ------------------ WRAPPER ------------------ */
const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeContextProvider>
            <ToggleTheme />
            {children}
        </ThemeContextProvider>
    );
};

const ToggleTheme = () => {
    const { toggleTheme } = useTheme();
    return <Button onClick={toggleTheme}>Toggle</Button>;
};

/* ------------------ DEFAULT DROPDOWN ------------------ */
export const DefaultDropdown = () => {
    const items = [
        {
            label: "Edit",
            icon: <Icon name="Pencil" />,
            onClick: () => alert("Edit clicked"),
        },
        {
            label: "Delete",
            icon: <Icon name="Trash" />,
            onClick: () => alert("Delete clicked"),
        },
    ];

    return (
        <StoryWrapper>
            <Box style={{ padding: "32px", textAlign: "center" }}>
                <Dropdown items={items}>
                    <Button variant="secondary">
                        <Icon name="Plus" />
                    </Button>
                </Dropdown>
                <Text as="p" style={{ marginTop: "12px" }}>
                    Default dropdown menu triggered by a button.
                </Text>
            </Box>
        </StoryWrapper>
    );
};

/* ------------------ DROPDOWN WITH ARROW ------------------ */
export const DropdownWithArrow = () => {
    const items = [
        {
            label: "Edit",
            icon: <Icon name="Pencil" />,
            onClick: () => alert("Edit clicked"),
        },
        {
            label: "Settings",
            icon: <Icon name="Settings" />,
            onClick: () => alert("Settings clicked"),
        },
    ];

    return (
        <StoryWrapper>
            <Box style={{ padding: "40px", textAlign: "center" }}>
                <Dropdown items={items} showArrow>
                    <Button variant="primary">Open with Arrow</Button>
                </Dropdown>
                <Text as="p" style={{ marginTop: "12px" }}>
                    Dropdown shows a directional arrow pointing to the trigger
                    element.
                </Text>
            </Box>
        </StoryWrapper>
    );
};

/* ------------------ DROPDOWN PLACEMENT VARIANTS ------------------ */
export const DropdownPlacements = () => {
    const items = [
        {
            label: "Copy",
            icon: <Icon name="Check" />,
            onClick: () => alert("Copied!"),
        },
        {
            label: "Delete",
            icon: <Icon name="Trash" />,
            onClick: () => alert("Deleted!"),
        },
    ];

    return (
        <StoryWrapper>
            <Stack
                direction="row"
                justify="center"
                gap="lg"
                style={{ padding: "48px" }}
            >
                <Dropdown items={items} placement="top">
                    <Button>Top</Button>
                </Dropdown>

                <Dropdown items={items} placement="bottom">
                    <Button>Bottom</Button>
                </Dropdown>

                <Dropdown items={items} placement="left">
                    <Button>Left</Button>
                </Dropdown>

                <Dropdown items={items} placement="right">
                    <Button>Right</Button>
                </Dropdown>
            </Stack>
        </StoryWrapper>
    );
};

/* ------------------ ANIMATED DROPDOWN ------------------ */
export const AnimatedDropdown = () => {
    const items = [
        {
            label: "Settings",
            icon: <Icon name="Settings" />,
            onClick: () => alert("Settings!"),
        },
        {
            label: "Edit",
            icon: <Icon name="Pencil" />,
            onClick: () => alert("Edit!"),
        },
        {
            label: "Delete",
            icon: <Icon name="Trash" />,
            onClick: () => alert("Deleted!"),
        },
    ];

    return (
        <StoryWrapper>
            <Box style={{ textAlign: "center", padding: "40px" }}>
                <Dropdown
                    items={items}
                    animated
                    animationDuration={250}
                    showArrow
                >
                    <Button variant="outline">Animated Dropdown</Button>
                </Dropdown>
                <Text as="p" style={{ marginTop: "12px" }}>
                    This dropdown fades and scales smoothly during open/close
                    transitions.
                </Text>
            </Box>
        </StoryWrapper>
    );
};

/* ------------------ CUSTOM WIDTH DROPDOWN ------------------ */
export const CustomWidthDropdown = () => {
    const items = [
        { label: "Option 1", onClick: () => alert("Option 1") },
        { label: "Option 2", onClick: () => alert("Option 2") },
        { label: "Option 3", onClick: () => alert("Option 3") },
    ];

    return (
        <StoryWrapper>
            <Box style={{ textAlign: "center", padding: "40px" }}>
                <Dropdown items={items} width="300px">
                    <Button variant="secondary">Wide Dropdown</Button>
                </Dropdown>
                <Text as="p" style={{ marginTop: "12px" }}>
                    You can pass a custom width (e.g.,{" "}
                    <code>width="300px"</code> or spacing tokens).
                </Text>
            </Box>
        </StoryWrapper>
    );
};

/* ------------------ CONTROLLED DROPDOWN ------------------ */
export const ControlledDropdown = () => {
    const [open, setOpen] = useState(false);
    const items = [
        {
            label: "Copy",
            icon: <Icon name="Pencil" />,
            onClick: () => alert("Copied!"),
        },
        {
            label: "Settings",
            icon: <Icon name="Settings" />,
            onClick: () => alert("Settings opened!"),
        },
    ];

    return (
        <StoryWrapper>
            <Box style={{ textAlign: "center", padding: "40px" }}>
                <Dropdown
                    items={items}
                    open={open}
                    onOpenChange={setOpen}
                    showArrow
                    animated
                    placement="bottom"
                >
                    <Button variant={open ? "primary" : "secondary"}>
                        {open ? "Close Menu" : "Open Menu"}
                    </Button>
                </Dropdown>

                <Text as="p" style={{ marginTop: "12px" }}>
                    This dropdown is <strong>controlled</strong> via external
                    state using <code>open</code> and <code>onOpenChange</code>{" "}
                    props.
                </Text>
            </Box>
        </StoryWrapper>
    );
};

/* ------------------ DROPDOWN WITH LONG LIST ------------------ */
export const ScrollableDropdown = () => {
    const items = Array.from({ length: 10 }).map((_, i) => ({
        label: `Menu Item ${i + 1}`,
        onClick: () => alert(`Clicked item ${i + 1}`),
    }));

    return (
        <StoryWrapper>
            <Box style={{ textAlign: "center", padding: "40px" }}>
                <Dropdown items={items} width="250px" animated showArrow>
                    <Button variant="secondary">Scrollable Menu</Button>
                </Dropdown>

                <Text as="p" style={{ marginTop: "12px" }}>
                    Large menus automatically scroll inside the dropdown if
                    content exceeds height.
                </Text>
            </Box>
        </StoryWrapper>
    );
};

/* ------------------ DROPDOWN SHOWCASE ------------------ */
export const AllVariantsShowcase = () => {
    const items = [
        { label: "Edit", icon: <Icon name="Pencil" /> },
        { label: "Copy", icon: <Icon name="Plus" /> },
        { label: "Delete", icon: <Icon name="Trash" /> },
        { label: "Settings", icon: <Icon name="Settings" /> },
    ];

    return (
        <StoryWrapper>
            <Stack
                direction="row"
                justify="center"
                gap="xl"
                wrap="wrap"
                style={{ padding: "48px", flexWrap: "wrap" }}
            >
                <Dropdown items={items} placement="top" showArrow>
                    <Button>Top</Button>
                </Dropdown>
                <Dropdown items={items} placement="bottom" showArrow>
                    <Button>Bottom</Button>
                </Dropdown>
                <Dropdown items={items} placement="left" showArrow>
                    <Button>Left</Button>
                </Dropdown>
                <Dropdown items={items} placement="right" showArrow>
                    <Button>Right</Button>
                </Dropdown>
                <Dropdown items={items} animated width="200px">
                    <Button>Animated</Button>
                </Dropdown>
            </Stack>
        </StoryWrapper>
    );
};
