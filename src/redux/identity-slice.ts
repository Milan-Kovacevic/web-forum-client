import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMyInfo, logout } from "@/redux/thunks/identity-thunk";
import { RoleDictionary } from "@/utils/constants";
import { AxiosResponse } from "axios";

interface IdentityState {
  forbidden: boolean;
  isAuthenticated: boolean;
  role: string | null;
  displayName: string;
}

const initialState: IdentityState = {
  forbidden: false,
  isAuthenticated: false,
  role: null,
  displayName: "",
};

const identitySlice = createSlice({
  name: "identity",
  initialState: initialState,
  reducers: {
    clearIdentity(state) {
      state.isAuthenticated = false;
      state.forbidden = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state: IdentityState, action) => {
      state.isAuthenticated = true;
      state.role = RoleDictionary[action.payload.data.role];
      state.displayName = action.payload.data.displayName;
    });
    builder.addCase(getMyInfo.rejected, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.role = null;
      state.displayName = "";
    });
    builder.addCase(logout.rejected, (state) => {
      state.forbidden = true;
    });
    builder.addMatcher(
      (action: PayloadAction<AxiosResponse>) => {
        return (
          action.type.endsWith("/rejected") &&
          action.payload &&
          action.payload.status === 403
        );
      },
      (state) => {
        state.forbidden = true;
      }
    );
  },
});

export const { clearIdentity } = identitySlice.actions;
export default identitySlice.reducer;
