import { UserRole } from "@/types/models/application";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = {
  displayName: string;
  role: UserRole;
};
