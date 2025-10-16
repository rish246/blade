import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const enableMocking = async () => {
    if (import.meta.env.DEV) {
        const { worker } = await import("./mocks/browser");
        return worker.start({
            onUnhandledRequest: "bypass",
        });
    }
};

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StrictMode>,
    );
});
