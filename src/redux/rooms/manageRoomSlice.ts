import { Room, RoomPermission } from "@/types/models/rooms";
import { createSlice } from "@reduxjs/toolkit";
import {
  loadMyRoomPermissions,
  loadManagedRoom,
} from "@/redux/rooms/roomsThunks";
import { Comment } from "@/types/models/comments";
import {
  approveRoomComment,
  blockRoomComment,
  editRoomComment,
  loadPendingRoomComments,
  loadPostedRoomComments,
  removeRoomComment,
} from "@/redux/rooms/commentThunks";

interface ManageRoomState {
  managedRoom: Room | null;
  postedComments: Comment[];
  pendingComments: Comment[];
  roomPermissions: RoomPermission[];
  loadingManagedRoom: boolean;
  loadingRoomPermissions: boolean;
  loadingPostedComments: boolean;
  loadingPendingComments: boolean;
  action: "Edit" | "Remove" | "Block" | "Post" | null;
}

const initialState: ManageRoomState = {
  managedRoom: null,
  postedComments: [],
  pendingComments: [],
  roomPermissions: [],
  loadingManagedRoom: false,
  loadingRoomPermissions: false,
  loadingPostedComments: false,
  loadingPendingComments: false,
  action: null,
};

const manageRoomSlice = createSlice({
  name: "manage-room",
  initialState: initialState,
  reducers: {
    clearManageRoomAction(state) {
      state.action = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadManagedRoom.pending, (state) => {
      state.loadingManagedRoom = true;
    });
    builder.addCase(loadManagedRoom.rejected, (state) => {
      state.loadingManagedRoom = false;
    });
    builder.addCase(loadManagedRoom.fulfilled, (state, action) => {
      state.managedRoom = action.payload;
      state.loadingManagedRoom = false;
    });

    builder.addCase(loadPendingRoomComments.pending, (state) => {
      state.loadingPendingComments = true;
    });
    builder.addCase(loadPendingRoomComments.rejected, (state) => {
      state.loadingPendingComments = false;
    });
    builder.addCase(loadPendingRoomComments.fulfilled, (state, action) => {
      state.pendingComments = action.payload;
      state.loadingPendingComments = false;
    });

    builder.addCase(loadPostedRoomComments.pending, (state) => {
      state.loadingPostedComments = true;
    });
    builder.addCase(loadPostedRoomComments.rejected, (state) => {
      state.loadingPostedComments = false;
    });
    builder.addCase(loadPostedRoomComments.fulfilled, (state, action) => {
      state.postedComments = action.payload;
      state.loadingPostedComments = false;
    });

    builder.addCase(loadMyRoomPermissions.pending, (state) => {
      state.loadingRoomPermissions = true;
    });
    builder.addCase(loadMyRoomPermissions.rejected, (state) => {
      state.loadingRoomPermissions = false;
    });
    builder.addCase(loadMyRoomPermissions.fulfilled, (state, action) => {
      state.roomPermissions = action.payload;
      state.loadingRoomPermissions = false;
    });

    builder.addCase(removeRoomComment.fulfilled, (state) => {
      state.action = "Remove";
      state.loadingPostedComments = false;
    });
    builder.addCase(editRoomComment.fulfilled, (state) => {
      state.action = "Edit";
      state.loadingPostedComments = false;
    });

    builder.addCase(removeRoomComment.pending, (state) => {
      state.loadingPostedComments = true;
    });
    builder.addCase(editRoomComment.pending, (state) => {
      state.loadingPostedComments = true;
    });

    builder.addCase(removeRoomComment.rejected, (state) => {
      state.loadingPostedComments = false;
    });
    builder.addCase(editRoomComment.rejected, (state) => {
      state.loadingPostedComments = false;
    });

    builder.addCase(approveRoomComment.pending, (state) => {
      state.loadingPendingComments = true;
    });
    builder.addCase(blockRoomComment.pending, (state) => {
      state.loadingPendingComments = true;
    });

    builder.addCase(approveRoomComment.rejected, (state) => {
      state.loadingPendingComments = false;
    });
    builder.addCase(blockRoomComment.rejected, (state) => {
      state.loadingPendingComments = false;
    });

    builder.addCase(approveRoomComment.fulfilled, (state) => {
      state.loadingPendingComments = false;
      state.action = "Post";
    });
    builder.addCase(blockRoomComment.fulfilled, (state) => {
      state.loadingPendingComments = false;
      state.action = "Block";
    });
  },
});

export const { clearManageRoomAction } = manageRoomSlice.actions;
export default manageRoomSlice.reducer;
