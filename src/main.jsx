import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/themeContext/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import AuthContextProvider from "./contexts/auth/AuthContextProvider";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
