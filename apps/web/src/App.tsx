import { ThemeProvider } from "@blade/ui";
import BladeApp from "./pages/projects/BladeApp";

function App() {
    return (
        <ThemeProvider initialTheme="light">
            <BladeApp />
        </ThemeProvider>
    );
}

export default App;
