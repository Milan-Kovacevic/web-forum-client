import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Page404 from "@/pages/Page404";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import { MainRouteItems, AuthRouteItems } from "@/utils/constants";
import RegisterPage from "@/pages/RegisterPage";
import RoomsPage from "@/pages/RoomsPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Page404 />,
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: MainRouteItems.CHAT_ROOMS.path,
            element: <RoomsPage />,
          },
          {
            path: MainRouteItems.MANAGE_ROOMS.path,
            element: <HomePage />,
          },
          {
            path: MainRouteItems.MANAGE_USERS.path,
            element: <HomePage />,
          },
        ],
      },

      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: AuthRouteItems.LOGIN.path, element: <LoginPage /> },
          { path: AuthRouteItems.REGISTER.path, element: <RegisterPage /> },
        ],
      },
    ],
  },
]);

export default router;
