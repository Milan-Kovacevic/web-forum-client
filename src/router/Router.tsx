import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import NotFoundPage from "@/pages/client-errors/NotFoundPage";
import HomePage from "@/pages/landing/HomePage";
import LoginPage from "@/pages/identity/LoginPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import {
  AdminAndModerator,
  AdminOnly,
  AppRoutes,
  EveryRole,
} from "@/utils/constants";
import RegisterPage from "@/pages/identity/RegisterPage";
import RoomsPage from "@/pages/rooms/RoomsPage";
import RequireAuth from "./RequireAuth";
import ManageUsersPage from "../pages/manage-users/ManageUsersPage";
import ManageRoomsPage from "../pages/manage-rooms/ManageRoomsPage";
import ForbiddenPage from "../pages/client-errors/ForbiddenPage";
import RoomDetailsPage from "@/pages/room-details/RoomDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
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
                element: <RoomDetailsPage />,
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
              {
                path: AppRoutes.MANAGE_SINGLE_USER.path,
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
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
