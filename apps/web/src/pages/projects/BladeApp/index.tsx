import { Container } from "@blade/ui";
import ProjectWorkspace from "../ProjectWorksace";

const BladeApp = () => {
    return (
        <Container
            style={{
                height: "100vh",
            }}
        >
            <ProjectWorkspace />
        </Container>
    );
};

export default BladeApp;
