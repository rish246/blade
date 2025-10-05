import React from "react";
import Card from "../Card";
import Box from "../Box";

export default {
    title: "UI/Core/Card",
};

export const Default = () => (
    <Card>This is a simple card with default styling.</Card>
);

export const Elevated = () => (
    <Card variant="elevated">This is an elevated card with a shadow.</Card>
);

export const Outlined = () => (
    <Card variant="outlined">
        This is an outlined card with a subtle border.
    </Card>
);

export const Filled = () => (
    <Card variant="filled">This is a filled card with a solid background.</Card>
);

export const WithHeaderAndFooter = () => (
    <Card
        variant="outlined"
        header={<strong>Card Header</strong>}
        footer={<em>Card Footer</em>}
    >
        This card includes a header and footer for structured content.
    </Card>
);

export const WithMedia = () => (
    <Card
        variant="elevated"
        header={<strong>Cute Kitten</strong>}
        footer="Adopt one today!"
        media={
            <img
                src="https://placekitten.com/400/200"
                alt="Kitten"
                style={{ width: "100%", display: "block" }}
            />
        }
    >
        This card demonstrates a media section with text below.
    </Card>
);

export const Hoverable = () => (
    <Card hoverable>Hover over this card to see the hover effect.</Card>
);

export const Clickable = () => (
    <Card hoverable onClick={() => alert("Card clicked!")}>
        This card is clickable — try clicking it!
    </Card>
);

export const Loading = () => (
    <Card loading>You shouldn’t see this text — card is loading.</Card>
);

export const Disabled = () => (
    <Card disabled>This card is disabled and non-interactive.</Card>
);

export const AllVariants = () => (
    <Box style={{ display: "grid", gap: "1rem" }}>
        <Card variant="default">Default</Card>
        <Card variant="elevated">Elevated</Card>
        <Card variant="outlined">Outlined</Card>
        <Card variant="filled">Filled</Card>
    </Box>
);
