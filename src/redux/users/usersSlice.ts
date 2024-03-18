import { RegisteredUser } from "@/types/models/users";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserAccountInfo,
  loadForumUsers,
} from "@/redux/users/userThunks";

interface UsersState {
  registeredUsers: RegisteredUser[];
  loadingUsers: boolean;
  selectedUser: RegisteredUser | null;
  editedUser: boolean;
}

const initialState: UsersState = {
  registeredUsers: [],
  loadingUsers: false,
  selectedUser: null,
  editedUser: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    clearEditedUser(state) {
      state.editedUser = false;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadForumUsers.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(loadForumUsers.fulfilled, (state, action) => {
      state.loadingUsers = false;
      state.registeredUsers = action.payload;
    });
    builder.addCase(loadForumUsers.rejected, (state) => {
      state.loadingUsers = false;
    });

    builder.addCase(changeUserAccountInfo.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(changeUserAccountInfo.rejected, (state) => {
      state.loadingUsers = false;
    });
    builder.addCase(changeUserAccountInfo.fulfilled, (state) => {
      state.editedUser = true;
      state.loadingUsers = false;
    });
  },
});

export const { clearEditedUser, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
