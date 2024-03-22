import environments from "@/environments/config";
import {
  Permission,
  PermissionType,
  Role,
  RoleType,
} from "@/types/models/application";

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
    displayName: "Chat Room",
    path: "/rooms/:id",
    roles: EveryRole,
  },
  MANAGE_ROOMS: {
    displayName: "Manage Chat Rooms",
    path: "/rooms/manage",
    roles: AdminAndModerator,
  },
  MANAGE_SINGLE_ROOM: {
    displayName: "Manage Room",
    path: "/rooms/manage/:id",
    roles: AdminAndModerator,
  },
  MANAGE_USERS: {
    displayName: "Manage Users",
    path: "/users/manage",
    roles: AdminOnly,
  },
  MANAGE_SINGLE_USER: {
    displayName: "Manage User",
    path: "/users/manage/:id",
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
  USER_ROOM_COMMENTS: `${API_PREFIX}/Rooms/{roomId}/Comments`,
  POSTED_ROOM_COMMENTS: `${API_PREFIX}/Rooms/{roomId}/Comments/Posted`,
  PENDING_ROOM_COMMENTS: `${API_PREFIX}/Rooms/{roomId}/Comments/Pending`,
  ROOM_PERMISSIONS: `${API_PREFIX}/Rooms/{roomId}/Permissions`,
  POST_COMMENT: `${API_PREFIX}/Comments/{commentId}/Post`,
  BLOCK_COMMENT: `${API_PREFIX}/Comments/{commentId}/Block`,
  REGISTRATION_REQUESTS: `${API_PREFIX}/Requests`,
  APPROVE_REQUEST: `${API_PREFIX}/Requests/{requestId}/Approve`,
  REJECT_REQUEST: `${API_PREFIX}/Requests/{requestId}/Reject`,
  USERS: `${API_PREFIX}/Users`,
  SINGLE_USER: `${API_PREFIX}/Users/{userId}`,
  CHANGE_USER_ACCOUNT: `${API_PREFIX}/Users/{userId}/Change`,
  USER_ROOM_PERMISSIONS: `${API_PREFIX}/Users/{userId}/Rooms/{roomId}/Permissions`,
};

export const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const ExternalAuthEndpoints = {
  GITHUB: "https://github.com/login/oauth/authorize",
  GOOGLE: "https://accounts.google.com/o/oauth2/v2/auth",
  FACEBOOK: "https://www.facebook.com/v19.0/dialog/oauth",
};

export const RoleDictionary: Record<number, Role> = {
  0: { type: "Regular", name: "Unknown User" },
  1: { type: "Regular", name: "Forum User" },
  2: { type: "Moderator", name: "Forum Moderator" },
  3: { type: "Admin", name: "Administrator" },
  4: { type: "RootAdmin", name: "Root Administrator" },
};

export const RoleIdResolver: Record<RoleType, number> = {
  Regular: 1,
  Moderator: 2,
  Admin: 3,
  RootAdmin: 4,
};

export const PermissionDictionary: Record<number, Permission> = {
  1: {
    name: "Create Comment",
    description: "Post a new comment",
    type: "CreateComment",
    roles: EveryRole,
  },
  2: {
    name: "Edit Comment",
    description: "Edit your comment",
    type: "EditComment",
    roles: EveryRole,
  },
  3: {
    name: "Remove Comment",
    description: "Remove posted comment",
    type: "RemoveComment",
    roles: EveryRole,
  },
  4: {
    name: "Post Comment",
    description: "Approve posted comment",
    type: "PostComment",
    roles: AdminAndModerator,
  },
  5: {
    name: "Block Comment",
    description: "Reject posted comment",
    type: "BlockComment",
    roles: AdminAndModerator,
  },
};

export const PermissionIdResolver: Record<PermissionType, number> = {
  CreateComment: 1,
  EditComment: 2,
  RemoveComment: 3,
  PostComment: 4,
  BlockComment: 5,
};

export const PermissionsList: Permission[] = [
  PermissionDictionary[1],
  PermissionDictionary[2],
  PermissionDictionary[3],
  PermissionDictionary[4],
  PermissionDictionary[5],
];

export const ReduxThunksTypeNames = {
  ROOMS: "rooms",
};
