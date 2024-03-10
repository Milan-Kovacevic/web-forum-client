import { createSlice } from "@reduxjs/toolkit";
import { externalLogin, login, register } from "@/redux/thunks/signin-thunk";
import { HttpStatusCode } from "axios";

interface AuthState {
  loading: boolean;
  verifyUser: boolean;
  loggedIn: boolean;
  registered: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  verifyUser: false,
  loading: false,
  registered: false,
};

const signInSlice = createSlice({
  name: "signin",
  initialState: initialState,
  reducers: {
    clearSignUp(state) {
      state.verifyUser = false;
      state.loggedIn = false;
      state.loading = false;
      state.registered = false;
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
        state.loggedIn = true;
    });
    builder.addCase(externalLogin.fulfilled, (state, action) => {
      if (action.payload.status == HttpStatusCode.NoContent)
        state.verifyUser = true;

      if (
        action.payload.status == HttpStatusCode.Ok &&
        action.payload.data != null
      )
        state.loggedIn = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.registered = true;
    });

    builder.addMatcher(
      (action) => action.type.endsWith("signin/pending"),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("signin/rejected"),
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("signin/fulfilled"),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const { clearSignUp, cancelVerification, resetRegistration } =
  signInSlice.actions;
export default signInSlice.reducer;
