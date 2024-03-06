import environments from "@/environments/config";

export const ACCESS_TOKEN_STORAGE_KEY = "forum_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "forum_refresh_token";
export const APP_THEME_STORAGE_KEY = "forum_ui_theme";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const MainRouteItems = {
  CHAT_ROOMS: { displayName: "Chat Rooms", path: "/rooms" },
  MANAGE_ROOMS: { displayName: "Manage Chat Rooms", path: "/rooms/manage" },
  MANAGE_USERS: { displayName: "Manage Users", path: "/users/manage" },
};

export const AuthRouteItems = {
  LOGIN: { displayName: "Login / Sign in", path: "/login" },
  REGISTER: { displayName: "Register / Sign up", path: "/register" },
};

const API_PREFIX = environments().apiResourcePrefix;
export const ApiEndpoints = {
  LOGIN: `${API_PREFIX}/Login`,
  REGISTER: `${API_PREFIX}/Register`,
};
