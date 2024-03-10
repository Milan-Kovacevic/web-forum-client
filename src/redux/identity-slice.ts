import { UserRole } from "@/types/models/application";
import { createSlice } from "@reduxjs/toolkit";
import { getMyInfo, logout } from "@/redux/thunks/identity-thunk";
import { RoleDictionary } from "@/utils/constants";

interface IdentityState {
  isAuthenticated: boolean;
  requireLogin: boolean;
  role: UserRole | null;
  displayName: string;
}

const initialState: IdentityState = {
  isAuthenticated: false,
  requireLogin: false,
  role: null,
  displayName: "",
};

const identitySlice = createSlice({
  name: "identity",
  initialState: initialState,
  reducers: {
    clearRequireLogin(state) {
      state.requireLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.requireLogin = false;
      state.role = RoleDictionary[action.payload.data.roleId];
      state.displayName = action.payload.data.displayName;
    });
    builder.addCase(getMyInfo.rejected, (state) => {
      state.isAuthenticated = false;
      state.requireLogin = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.requireLogin = true;
      state.role = null;
      state.displayName = "";
    });
  },
});

export const { clearRequireLogin } = identitySlice.actions;
export default identitySlice.reducer;
