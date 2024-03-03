import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Page404 from "@/pages/Page404";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DefaultLayout from "@/layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: Page404(),
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "docs",
            element: <HomePage />,
          },
          {
            path: "docs/components",
            element: <HomePage />,
          },
          {
            path: "themes",
            element: <HomePage />,
          },
        ],
      },

      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "", element: <LoginPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <LoginPage /> },
        ],
      },
    ],
  },
]);

export default router;
