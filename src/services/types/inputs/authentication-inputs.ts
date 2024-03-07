export type LoginInput = {
  username: string;
  password: string;
  twoFactorCode?: string;
};

export type RegisterInput = {
  displayName: string;
  username: string;
  email: string;
  password: string;
};

export type ExternalProvider = "GitHub" | "Google" | "Facebook";

export type ExternalLoginInput = {
  code: string;
  provider: ExternalProvider;
};
