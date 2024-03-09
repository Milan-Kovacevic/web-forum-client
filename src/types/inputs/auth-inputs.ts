import { LoginProvider } from "@/types/models/application";

export type LoginInput = {
  username: string;
  password: string;
  twoFactorCode?: string;
};

export type ExternalLoginInput = {
  code: string;
  provider: LoginProvider;
};

export type RegisterInput = {
  displayName: string;
  username: string;
  email: string;
  password: string;
};
