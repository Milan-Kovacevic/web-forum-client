import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Page404 from "@/pages/Page404";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import {
  AdminAndModerator,
  AdminOnly,
  AppRoutes,
  EveryRole,
} from "@/utils/constants";
import RegisterPage from "@/pages/RegisterPage";
import RoomsPage from "@/pages/RoomsPage";
import RequireAuth from "./RequireAuth";
import ManageUsersPage from "../ManageUsersPage";
import ManageRoomsPage from "../ManageRoomsPage";
import ForbiddenPage from "../ForbiddenPage";
import SingleRoomPage from "../SingleRoomPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Page404 />,
    element: <DefaultLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: AppRoutes.HOME_PAGE.path,
            element: <HomePage />,
          },
          // Routes for every role
          {
            element: <RequireAuth allowedRoles={EveryRole} />,
            children: [
              {
                path: AppRoutes.CHAT_ROOMS.path,
                element: <RoomsPage />,
              },
              {
                path: AppRoutes.SINGLE_ROOM.path,
                element: <SingleRoomPage />,
              },
            ],
          },
          // Routes for admins only
          {
            element: <RequireAuth allowedRoles={AdminOnly} />,
            children: [
              {
                path: AppRoutes.MANAGE_USERS.path,
                element: <ManageUsersPage />,
              },
            ],
          },
          // Routes for admins and moderators
          {
            element: <RequireAuth allowedRoles={AdminAndModerator} />,
            children: [
              {
                path: AppRoutes.MANAGE_ROOMS.path,
                element: <ManageRoomsPage />,
              },
              {
                path: AppRoutes.MANAGE_SINGLE_ROOM.path,
                element: <ManageRoomsPage />,
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: AppRoutes.LOGIN.path, element: <LoginPage /> },
          { path: AppRoutes.REGISTER.path, element: <RegisterPage /> },
        ],
      },
      { path: AppRoutes.FORBIDDEN.path, element: <ForbiddenPage /> },
      { path: "*", element: <Page404 /> },
    ],
  },
]);

export default router;
