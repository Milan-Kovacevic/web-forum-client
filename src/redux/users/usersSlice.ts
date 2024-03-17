import { RegisteredUser, SingleRegisteredUser } from "@/types/models/users";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserAccountInfo,
  changeUserPermissionsForRoom,
  loadForumUsers,
  loadSingleForumUser,
  loadUserPermissionsForRoom,
} from "@/redux/users/userThunks";
import { Room, RoomPermission } from "@/types/models/rooms";

interface UsersState {
  registeredUsers: RegisteredUser[];
  selectedUser: SingleRegisteredUser | null;
  selectedRoom: Room | null;
  roomPermissions: RoomPermission[];
  loadingUsers: boolean;
  loadingUserDetails: boolean;
  editedUser: boolean;
}

const initialState: UsersState = {
  registeredUsers: [],
  selectedUser: null,
  selectedRoom: null,
  roomPermissions: [],
  loadingUsers: false,
  loadingUserDetails: false,
  editedUser: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    clearEditedUser(state) {
      state.editedUser = false;
    },
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
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

    builder.addCase(loadSingleForumUser.pending, (state) => {
      state.loadingUserDetails = true;
    });
    builder.addCase(loadSingleForumUser.rejected, (state) => {
      state.loadingUserDetails = false;
    });
    builder.addCase(loadSingleForumUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.loadingUserDetails = false;
    });

    builder.addCase(loadUserPermissionsForRoom.fulfilled, (state, action) => {
      state.roomPermissions = action.payload;
    });
    builder.addCase(changeUserPermissionsForRoom.fulfilled, (state) => {
      state.editedUser = true;
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

export const { clearEditedUser, setSelectedRoom } = usersSlice.actions;
export default usersSlice.reducer;
