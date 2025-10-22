import CreateProject from "./pages/projects/CreateProject";
import ProjectList from "./pages/projects/ProjectList";
import OfflineBanner from "./components/OfflineBanner";
import PendingOps from "./pages/projects/PendingOps";
import { Container, ThemeProvider } from "@blade/ui";
function App() {
    return (
        <ThemeProvider initialTheme="light">
            <Container>
                <OfflineBanner />
                <PendingOps />
                <CreateProject />
                <ProjectList />
            </Container>
        </ThemeProvider>
    );
}

export default App;
