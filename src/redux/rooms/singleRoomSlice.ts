import { Room, RoomPermission } from "@/types/models/rooms";
import { createSlice } from "@reduxjs/toolkit";
import { loadMyRoomPermissions, getRoom } from "./roomThunks";
import { Comment } from "@/types/models/comments";
import {
  editRoomComment,
  loadUserCommentsForRoom,
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

    builder.addCase(loadUserCommentsForRoom.pending, (state) => {
      state.loadingComments = true;
    });
    builder.addCase(loadUserCommentsForRoom.rejected, (state) => {
      state.loadingComments = false;
    });
    builder.addCase(loadUserCommentsForRoom.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loadingComments = false;
    });

    builder.addCase(loadMyRoomPermissions.pending, (state) => {
      state.loadingPermissions = true;
    });
    builder.addCase(loadMyRoomPermissions.rejected, (state) => {
      state.loadingPermissions = false;
    });
    builder.addCase(loadMyRoomPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload;
      state.loadingPermissions = false;
    });

    builder.addCase(postNewRoomComment.fulfilled, (state) => {
      state.action = "Create";
      state.loadingComments = false;
    });
    builder.addCase(removeRoomComment.fulfilled, (state) => {
      state.action = "Remove";
      state.loadingComments = false;
    });
    builder.addCase(editRoomComment.fulfilled, (state) => {
      state.action = "Edit";
      state.loadingComments = false;
    });

    builder.addCase(postNewRoomComment.pending, (state) => {
      state.loadingComments = true;
    });
    builder.addCase(removeRoomComment.pending, (state) => {
      state.loadingComments = true;
    });
    builder.addCase(editRoomComment.pending, (state) => {
      state.loadingComments = true;
    });
    builder.addCase(postNewRoomComment.rejected, (state) => {
      state.loadingComments = false;
    });
    builder.addCase(removeRoomComment.rejected, (state) => {
      state.loadingComments = false;
    });
    builder.addCase(editRoomComment.rejected, (state) => {
      state.loadingComments = false;
    });
  },
});

export const { clearSingleRoomAction } = singleRoomSlice.actions;
export default singleRoomSlice.reducer;
