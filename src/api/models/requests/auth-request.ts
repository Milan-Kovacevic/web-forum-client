import { LoginProvider } from "@/types/login-provider";

export type LoginRequest = {
  username: string;
  password: string;
  twoFactorCode?: string;
};

export type RegisterRequest = {
  displayName: string;
  username: string;
  email: string;
  password: string;
};

export type ExternalLoginRequest = {
  code: string;
  provider: LoginProvider;
};
