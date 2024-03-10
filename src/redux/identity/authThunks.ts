import {
  ExternalLoginInput,
  LoginInput,
  RegisterInput,
} from "@/types/inputs/auth-inputs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/auth-service";

export const login = createAsyncThunk("login/auth", (input: LoginInput) => {
  return authService.login(input);
});

export const externalLogin = createAsyncThunk(
  "externalLogin/auth",
  (input: ExternalLoginInput) => {
    return authService.externalLogin(input);
  }
);

export const register = createAsyncThunk(
  "register/auth",
  (input: RegisterInput) => {
    return authService.register(input);
  }
);

export const getMyInfo = createAsyncThunk("myInfo/identity", () => {
  return authService.getUserInfo();
});

export const logout = createAsyncThunk("logout/identity", () => {
  return authService.logout();
});
