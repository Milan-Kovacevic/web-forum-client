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
