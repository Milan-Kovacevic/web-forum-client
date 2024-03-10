import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMyInfo, logout } from "@/redux/identity/authThunks";
import { RoleDictionary } from "@/utils/constants";
import { AxiosResponse } from "axios";
import { UserIdentity } from "@/types/models/application";

interface SessionState {
  forbidden: boolean;
  authenticated: boolean;
  identity: UserIdentity | null;
}

const initialState: SessionState = {
  forbidden: false,
  authenticated: false,
  identity: null,
};

const identitySlice = createSlice({
  name: "identity",
  initialState: initialState,
  reducers: {
    clearIdentity(state) {
      state.authenticated = false;
      state.forbidden = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state: SessionState, action) => {
      state.authenticated = true;
      var data = action.payload.data;
      state.identity = {
        // userId: data.userId,
        displayName: data.displayName,
        role: RoleDictionary[action.payload.data.role],
      };
    });
    builder.addCase(getMyInfo.rejected, (state) => {
      state.authenticated = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.identity = null;
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
