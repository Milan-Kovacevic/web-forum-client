export type LoginProvider = "GitHub" | "Google" | "Facebook";
export type RoleType = "Regular" | "Moderator" | "Admin" | "RootAdmin";
export type PermissionType =
  | "CreateComment"
  | "EditComment"
  | "RemoveComment"
  | "PostComment"
  | "BlockComment";

export type AppError = {
  detail: string;
  status: number;
  title: string;
  type: string;
};

export type UserIdentity = {
  userId: string;
  displayName: string;
  roleId: number;
  roleName: string;
  roleType: RoleType;
};

// Used in dictionary
export type Role = {
  type: RoleType;
  name: string;
};

export type Permission = {
  name: string;
  type: PermissionType;
  description: string;
};
