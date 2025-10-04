import Box from "../Box";
import Text from "../Text";
import Stack from "../Stack";

export default {
    title: "UI/Primitive/Stack",
};

export const HorizontalStack = () => (
    <Stack>
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);

export const HorizontalStackJustifyContentCenter = () => (
    <Stack justify="center">
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);

export const HorizontalStackJustifyContentSpaceBetween = () => (
    <Stack justify="space-between">
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);
export const HorizontalStackCustomStyles = () => (
    <Stack
        style={{
            border: "1px solid",
            backgroundColor: "yellow",
        }}
    >
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);

export const HorizontalStackCustomGap = () => (
    <Stack gap="100px">
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);

export const VerticalStack = () => (
    <Stack direction="column">
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);

export const VerticalStackAlignItemsCenter = () => (
    <Stack direction="column" align="center">
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);

export const VerticalStackAlignItemsSpaceBetween = () => (
    <Stack direction="column" align="center">
        <Text as="h1">Title</Text>
        <Text as="h2">Title</Text>
        <Text as="h3">Title</Text>
        <Text as="h4">Title</Text>
        <Text as="h5">Title</Text>
        <Text as="h6">Title</Text>
    </Stack>
);
