import MainLayout from "@/layouts/MainLayout";
import RegistrationPage from "@/pages/RegistrationPage/RegistrationPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoggedInRoute from "./LoggedInRoute";
import HomePage from "@/pages/HomePage/HomePage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="sign-in"
        element={
          <LoggedInRoute>
            <SignInPage />
          </LoggedInRoute>
        }
      />
      <Route
        path="registration"
        element={
          <LoggedInRoute>
            <RegistrationPage />
          </LoggedInRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);
