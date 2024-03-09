export type LoginProvider = "GitHub" | "Google" | "Facebook";
export type UserRole = "Regular" | "Moderator" | "Admin" | "RootAdmin";
export type AppError = {
  detail: string;
  status: number;
  title: string;
  type: string;
};

export type RoomUIState = "Create" | "Update" | "Delete";
