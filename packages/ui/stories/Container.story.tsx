import Container from "../components/Container";

export default {
    title: "UI/Layout/Container",
};

export const DefaultContainer = () => (
    <Container
        maxWidth="xl"
        padding="md"
        marginY="md"
        style={{ background: "#f4f4f4", border: "1px solid #ccc" }}
    >
        <h3>Default Container</h3>
        <p>This container uses maxWidth="xl" and padding="md".</p>
    </Container>
);

export const ContainerWithPadding = () => (
    <Container
        maxWidth="lg"
        padding="lg"
        style={{ background: "#e8f0fe", border: "1px solid #90caf9" }}
    >
        <h3>Container with Large Padding</h3>
        <p>Increases horizontal padding for more spacious layouts.</p>
    </Container>
);

export const CenteredAndNonCentered = () => (
    <>
        <Container
            maxWidth="md"
            padding="md"
            center
            style={{
                background: "#e8f5e9",
                border: "1px solid #81c784",
                marginBottom: "16px",
            }}
        >
            <h3>Centered Container (center=true)</h3>
            <p>This container is centered horizontally.</p>
        </Container>
        <Container
            maxWidth="md"
            padding="md"
            center={false}
            style={{ background: "#ffebee", border: "1px solid #ef9a9a" }}
        >
            <h3>Non-Centered Container (center=false)</h3>
            <p>This container sticks to the left side.</p>
        </Container>
    </>
);

export const ResponsiveContainer = () => (
    <Container
        maxWidth={{ sm: "sm", md: "md", lg: "xl" }}
        padding="md"
        style={{
            background: "#fff3e0",
            border: "1px dashed #ffb74d",
        }}
    >
        <h3>Responsive Container</h3>
        <p>
            Resize the window — the max width changes at breakpoints (sm, md,
            lg).
        </p>
    </Container>
);

export const NestedContainers = () => (
    <Container
        maxWidth="2xl"
        padding="lg"
        style={{ background: "#fafafa", border: "1px solid #ccc" }}
    >
        <h3>Outer Container (xxl)</h3>
        <p>Contains an inner container for nested layouts.</p>

        <Container
            maxWidth="md"
            padding="sm"
            style={{
                background: "#ffffff",
                border: "1px dashed #999",
                marginTop: "16px",
            }}
        >
            <h4>Inner Container (md)</h4>
            <p>This one is nested inside the outer container.</p>
        </Container>
    </Container>
);

export const ContainerWithCustomStyles = () => (
    <Container
        maxWidth="lg"
        padding="md"
        style={{
            background: "#263238",
            color: "white",
            borderRadius: "8px",
            border: "1px solid #37474f",
        }}
    >
        <h3>Container with Custom Styles</h3>
        <p>
            You can pass a custom <code>style</code> prop to override inline
            styles.
        </p>
    </Container>
);

export const DebugContainer = () => (
    <Container
        maxWidth="xl"
        padding="lg"
        style={{
            background: "#fff",
            border: "2px dashed #1976d2",
            padding: "24px",
        }}
    >
        <div
            style={{
                height: "100px",
                background:
                    "repeating-linear-gradient(45deg, #1976d220, #1976d220 10px, transparent 10px, transparent 20px)",
                borderRadius: "4px",
            }}
        />
        <p style={{ marginTop: "8px", color: "#1976d2" }}>
            Debug view showing the container boundary.
        </p>
    </Container>
);
