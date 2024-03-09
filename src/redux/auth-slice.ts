import { createSlice } from "@reduxjs/toolkit";
import { externalLogin, login, register } from "@/redux/thunks/auth-thunk";
import { HttpStatusCode } from "axios";

interface AuthState {
  loading: boolean;
  verifyUser: boolean;
  authenticated: boolean;
  registered: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  verifyUser: false,
  loading: false,
  registered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.verifyUser = false;
      state.authenticated = false;
      state.loading = false;
    },
    cancelVerification(state) {
      state.verifyUser = false;
    },
    resetRegistration(state) {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.status == HttpStatusCode.NoContent)
        state.verifyUser = true;
      else state.verifyUser = false;

      if (
        action.payload.status == HttpStatusCode.Ok &&
        action.payload.data != null
      )
        state.authenticated = true;
    });
    builder.addCase(externalLogin.fulfilled, (state, action) => {
      if (action.payload.status == HttpStatusCode.NoContent)
        state.verifyUser = true;

      if (
        action.payload.status == HttpStatusCode.Ok &&
        action.payload.data != null
      )
        state.authenticated = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.registered = true;
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const { logout, cancelVerification, resetRegistration } =
  authSlice.actions;
export default authSlice.reducer;
