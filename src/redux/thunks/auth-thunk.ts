import {
  ExternalLoginInput,
  LoginInput,
  RegisterInput,
} from "@/types/inputs/auth-inputs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/auth-service";

export const login = createAsyncThunk("login", (input: LoginInput) => {
  return authService.login(input);
});

export const externalLogin = createAsyncThunk(
  "externalLogin",
  (input: ExternalLoginInput) => {
    return authService.externalLogin(input);
  }
);

export const register = createAsyncThunk("register", (input: RegisterInput) => {
  return authService.register(input);
});
