import { Room, RoomPermission } from "@/types/models/rooms";
import { createSlice } from "@reduxjs/toolkit";
import { getMyRoomPermissions, getRoom } from "./roomsThunks";
import { Comment } from "@/types/models/comments";
import {
  editRoomComment,
  loadPostedRoomComments,
  postNewRoomComment,
  removeRoomComment,
} from "@/redux/rooms/commentThunks";

interface SingleRoomState {
  room: Room | null;
  comments: Comment[];
  permissions: RoomPermission[];
  loadingRoom: boolean;
  loadingPermissions: boolean;
  loadingComments: boolean;
  action: "Create" | "Edit" | "Remove" | null;
}

const initialState: SingleRoomState = {
  room: null,
  comments: [],
  permissions: [],
  loadingRoom: false,
  loadingPermissions: false,
  loadingComments: false,
  action: null,
};

const singleRoomSlice = createSlice({
  name: "single-room",
  initialState: initialState,
  reducers: {
    clearSingleRoomAction(state) {
      state.action = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoom.pending, (state) => {
      state.loadingRoom = true;
    });
    builder.addCase(getRoom.rejected, (state) => {
      state.loadingRoom = false;
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.room = action.payload;
      if (state.comments !== null) state.loadingRoom = false;
    });

    builder.addCase(loadPostedRoomComments.pending, (state) => {
      state.loadingComments = true;
    });
    builder.addCase(loadPostedRoomComments.rejected, (state) => {
      state.loadingComments = false;
    });
    builder.addCase(loadPostedRoomComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loadingComments = false;
    });

    builder.addCase(getMyRoomPermissions.pending, (state) => {
      state.loadingPermissions = true;
    });
    builder.addCase(getMyRoomPermissions.rejected, (state) => {
      state.loadingPermissions = false;
    });
    builder.addCase(getMyRoomPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload;
      state.loadingPermissions = false;
    });

    builder.addCase(postNewRoomComment.fulfilled, (state) => {
      state.action = "Create";
    });
    builder.addCase(removeRoomComment.fulfilled, (state) => {
      state.action = "Remove";
    });
    builder.addCase(editRoomComment.fulfilled, (state) => {
      state.action = "Edit";
    });
  },
});

export const { clearSingleRoomAction } = singleRoomSlice.actions;
export default singleRoomSlice.reducer;
