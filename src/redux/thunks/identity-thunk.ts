import authService from "@/services/auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyInfo = createAsyncThunk("myInfo/identity", () => {
  return authService.getUserInfo();
});

export const logout = createAsyncThunk("logout/identity", () => {
  return authService.logout();
});
