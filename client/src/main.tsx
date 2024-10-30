import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { RouterProvider } from "react-router-dom";
import LoadingScreen from "./components/loading-screen.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import environment from "./lib/relay-environment.ts";
import router from "./router.tsx";
export default function App() {
  return (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Suspense fallback={<LoadingScreen />}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
