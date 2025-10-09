import React from "react";
import Icon from "../../icons";
import { baseTheme } from "../../theme/tokens";

// Ladle: stories are just named exports returning JSX
// You can also use `args` to show controls in the UI.

export const Default = () => <Icon name="Search" />;

export const Sizes = () => {
    const sizes = [16, 24, 32, 48, 64];
    return (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {sizes.map((size) => (
                <div
                    key={size}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Icon name="Heart" size={size} />
                    <span style={{ fontSize: 12 }}>{size}px</span>
                </div>
            ))}
        </div>
    );
};

export const Colors = () => {
    const colors = [
        baseTheme.colors.accent,
        "#FF5733",
        "#4CAF50",
        "#1E88E5",
        "#FFC107",
        "#9C27B0",
        "#E91E63",
    ];
    return (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {colors.map((color) => (
                <Icon key={color} name="Info" color={color} size={36} />
            ))}
        </div>
    );
};

export const Accessibility = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
            <p style={{ marginBottom: 4 }}>Decorative (aria-hidden)</p>
            <Icon name="Heart" aria-hidden />
        </div>
        <div>
            <p style={{ marginBottom: 4 }}>With label (aria-label)</p>
            <Icon
                name="TriangleAlert"
                aria-label="Warning icon"
                color="#D32F2F"
            />
        </div>
    </div>
);

export const Gallery = () => {
    const icons = [
        "ArrowLeft",
        "ArrowRight",
        "Check",
        "Heart",
        "Info",
        "Menu",
        "Minus",
        "Pencil",
        "Plus",
        "Search",
        "Settings",
        "Trash",
        "TriangleAlert",
        "User",
        "X",
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                gap: "1rem",
                justifyItems: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "1rem",
            }}
        >
            {icons.map((name) => (
                <div key={name}>
                    <Icon name={name as any} size={28} />
                    <p style={{ fontSize: 12, marginTop: 6 }}>{name}</p>
                </div>
            ))}
        </div>
    );
};

export const Playground = (args: any) => <Icon {...args} />;

Playground.args = {
    name: "User",
    size: 32,
    color: baseTheme.colors.accent,
    "aria-label": "User icon",
};

Playground.argTypes = {
    name: {
        control: {
            type: "select",
            options: [
                "ArrowLeft",
                "ArrowRight",
                "Check",
                "Heart",
                "Info",
                "Menu",
                "Minus",
                "Pencil",
                "Plus",
                "Search",
                "Settings",
                "Trash",
                "TriangleAlert",
                "User",
                "X",
            ],
        },
        description: "Select which icon to render",
    },
    size: {
        control: { type: "number" },
        description: "Change icon size (in px)",
    },
    color: {
        control: { type: "color" },
        description: "Change the icon color",
    },
    "aria-label": {
        control: { type: "text" },
        description: "Accessible label for screen readers",
    },
    "aria-hidden": {
        control: { type: "boolean" },
        description: "Hide icon from screen readers",
    },
};
