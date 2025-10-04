import Box from "../Box";

export default {
    title: "UI/Primitive/Box",
};

export const BoxWithOneChild = () => <Box>Click Me</Box>;

export const BoxWithMultipleChildren = () => (
    <Box>
        First Child
        <Box>Second</Box>
    </Box>
);

export const BoxWithProps = () => (
    <Box
        bg={"error"}
        color={"accent"}
        style={{
            border: "1px solid black",
        }}
    >
        First Child
        <Box bg="accent">Second</Box>
    </Box>
);

export const BoxWithWidthAndHeight = () => (
    <Box
        bg={"error"}
        color={"accent"}
        style={{
            border: "1px solid black",
        }}
        w={"100%"}
        h={200}
    >
        First Child
        <Box bg="accent" h={"100%"}>
            Second
        </Box>
    </Box>
);

export const BoxWithPaddingAndMargins = () => (
    <Box
        bg={"error"}
        color={"accent"}
        style={{
            border: "1px solid black",
        }}
        p={"md"}
        m={"lg"}
    >
        First Child
        <Box bg="accent" h={500} p="lg">
            Second
        </Box>
    </Box>
);
