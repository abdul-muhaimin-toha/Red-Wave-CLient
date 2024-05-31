import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/themeContext/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import AuthContextProvider from "./contexts/auth/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
