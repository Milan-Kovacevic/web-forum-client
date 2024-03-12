import environments from "@/environments/config";
import { Permission, Role, RoleType } from "@/types/models/application";

export const ACCESS_TOKEN_STORAGE_KEY = "forum_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "forum_refresh_token";
export const APP_THEME_STORAGE_KEY = "forum_ui_theme";
export const AUTH_XSRF_TOKEN_STORAGE_KEY = "forum_xsrf_token";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const EveryRole: RoleType[] = [
  "Regular",
  "Moderator",
  "Admin",
  "RootAdmin",
];

export const AdminAndModerator: RoleType[] = [
  "Moderator",
  "Admin",
  "RootAdmin",
];

export const AdminOnly: RoleType[] = ["Admin", "RootAdmin"];
export const RootOnly: RoleType[] = ["RootAdmin"];

export const AppRoutes: Record<
  string,
  { displayName: string; path: string; roles?: RoleType[] }
> = {
  LOGIN: { displayName: "Login / Sign in", path: "/login" },
  REGISTER: { displayName: "Register / Sign up", path: "/register" },
  HOME_PAGE: { displayName: "Home Page", path: "/" },
  FORBIDDEN: { displayName: "Forbidden", path: "/forbidden" },
  CHAT_ROOMS: {
    displayName: "Chat Rooms",
    path: "/rooms",
    roles: EveryRole,
  },
  SINGLE_ROOM: {
    displayName: "Manage Users",
    path: "/rooms/:id",
    roles: EveryRole,
  },
  MANAGE_ROOMS: {
    displayName: "Manage Chat Rooms",
    path: "/rooms/manage",
    roles: AdminAndModerator,
  },
  MANAGE_USERS: {
    displayName: "Manage Users",
    path: "/users/manage",
    roles: AdminOnly,
  },
};

const API_PREFIX = environments().apiResourcePrefix;
export const ApiEndpoints = {
  LOGIN: `${API_PREFIX}/Login`,
  REGISTER: `${API_PREFIX}/Register`,
  EXTERNAL_LOGIN: `${API_PREFIX}/ExternalLogin`,
  USER_INFO: `${API_PREFIX}/Me`,
  LOGOUT: `${API_PREFIX}/Logout`,
  ROOMS: `${API_PREFIX}/Rooms`,
  SINGLE_ROOM: `${API_PREFIX}/Rooms/{roomId}`,
  COMMENTS: `${API_PREFIX}/Comments`,
  SINGLE_COMMENT: `${API_PREFIX}/Comments/{commentId}`,
  POSTED_ROOM_COMMENTS: `${API_PREFIX}/Rooms/{roomId}/Comments/Posted`,
  ROOM_PERMISSIONS: `${API_PREFIX}/Rooms/{roomId}/Permissions`,
};

export const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const ExternalAuthEndpoints = {
  GITHUB: "https://github.com/login/oauth/authorize",
  GOOGLE: "Google",
  FACEBOOK: "Facebook",
};

export const RoleDictionary: Record<number, Role> = {
  0: { type: "Regular", name: "Unknown User" },
  1: { type: "Regular", name: "Forum User" },
  2: { type: "Moderator", name: "Forum Moderator" },
  3: { type: "Admin", name: "Administrator" },
  4: { type: "RootAdmin", name: "Administrator" },
};

export const PermissionDictionary: Record<number, Permission> = {
  1: {
    name: "Create Comment",
    description: "Post a new comment",
    type: "CreateComment",
  },
  2: {
    name: "Edit Comment",
    description: "Edit your comment",
    type: "EditComment",
  },
  3: {
    name: "Remove Comment",
    description: "Remove posted comment",
    type: "RemoveComment",
  },
  4: {
    name: "Post Comment",
    description: "Approve posted comment",
    type: "PostComment",
  },
  5: {
    name: "Block Comment",
    description: "Reject posted comment",
    type: "BlockComment",
  },
};
