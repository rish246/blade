import CreateProject from "./pages/projects/CreateProject";
import ProjectList from "./pages/projects/ProjectList";
import OfflineBanner from "./components/OfflineBanner";
function App() {
    return (
        <>
            <OfflineBanner />
            <CreateProject />
            <ProjectList />
        </>
    );
}

export default App;
