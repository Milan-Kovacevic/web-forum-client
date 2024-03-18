import { Room, RoomPermission } from "@/types/models/rooms";
import { SingleRegisteredUser } from "@/types/models/users";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserPermissionsForRoom,
  loadSingleForumUser,
  loadUserPermissionsForRoom,
} from "@/redux/users/userThunks";

interface ManageUserState {
  managedUser: SingleRegisteredUser | null;
  selectedRoom: Room | null;
  userPermissions: RoomPermission[];
  loadingManagedUser: boolean;
  loadingUserPermissions: boolean;
  userPermissionsUpdated: boolean;
}

const initialState: ManageUserState = {
  managedUser: null,
  selectedRoom: null,
  userPermissions: [],
  loadingManagedUser: false,
  loadingUserPermissions: false,
  userPermissionsUpdated: false,
};

const manageUserSlice = createSlice({
  name: "manage-user",
  initialState: initialState,
  reducers: {
    setManagedUserChatRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    setUserPermissionsUpdated(state, action) {
      state.userPermissionsUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSingleForumUser.pending, (state) => {
      state.loadingManagedUser = true;
    });
    builder.addCase(loadSingleForumUser.rejected, (state) => {
      state.loadingManagedUser = false;
    });
    builder.addCase(loadSingleForumUser.fulfilled, (state, action) => {
      state.managedUser = action.payload;
      state.loadingManagedUser = false;
    });

    builder.addCase(loadUserPermissionsForRoom.pending, (state) => {
      state.loadingUserPermissions = true;
    });
    builder.addCase(loadUserPermissionsForRoom.rejected, (state) => {
      state.loadingUserPermissions = false;
    });
    builder.addCase(loadUserPermissionsForRoom.fulfilled, (state, action) => {
      state.userPermissions = action.payload;
      state.loadingUserPermissions = false;
    });

    builder.addCase(changeUserPermissionsForRoom.pending, (state) => {
      state.loadingUserPermissions = true;
    });
    builder.addCase(changeUserPermissionsForRoom.rejected, (state) => {
      state.loadingUserPermissions = false;
    });
    builder.addCase(changeUserPermissionsForRoom.fulfilled, (state) => {
      state.loadingUserPermissions = false;
      state.userPermissionsUpdated = true;
    });
  },
});

export const { setManagedUserChatRoom, setUserPermissionsUpdated } =
  manageUserSlice.actions;
export default manageUserSlice.reducer;
