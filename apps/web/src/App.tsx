import CreateProject from "./pages/projects/CreateProject";
import ProjectList from "./pages/projects/ProjectList";
import OfflineBanner from "./components/OfflineBanner";
// import PendingOps from "./pages/projects/PendingOps";
function App() {
    return (
        <>
            <OfflineBanner />
            {/* <PendingOps /> */}
            <CreateProject />
            <ProjectList />
        </>
    );
}

export default App;
