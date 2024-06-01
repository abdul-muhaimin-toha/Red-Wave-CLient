import MainLayout from "@/layouts/MainLayout";
import RegistrationPage from "@/pages/RegistrationPage/RegistrationPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import { createBrowserRouter } from "react-router-dom";
import LoggedInRoute from "./LoggedInRoute";
import HomePage from "@/pages/HomePage/HomePage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sign-in",
        element: (
          <LoggedInRoute>
            <SignInPage />
          </LoggedInRoute>
        ),
      },
      {
        path: "registration",
        element: (
          <LoggedInRoute>
            <RegistrationPage />
          </LoggedInRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <h1>dashboard</h1>,
  },
]);
