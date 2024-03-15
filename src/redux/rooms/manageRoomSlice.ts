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
  editAnyRoomComment,
  editRoomComment,
  loadPendingRoomComments,
  loadPostedRoomComments,
  removeAnyRoomComment,
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
  managedAction: "Edit" | "Remove" | "Block" | "Post" | null;
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
  managedAction: null,
};

const manageRoomSlice = createSlice({
  name: "manage-room",
  initialState: initialState,
  reducers: {
    clearManageRoomAction(state) {
      state.managedAction = null;
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

    builder.addCase(removeAnyRoomComment.fulfilled, (state) => {
      state.managedAction = "Remove";
      state.loadingPostedComments = false;
    });
    builder.addCase(editAnyRoomComment.fulfilled, (state) => {
      state.managedAction = "Edit";
      state.loadingPostedComments = false;
    });

    builder.addCase(removeAnyRoomComment.pending, (state) => {
      state.loadingPostedComments = true;
    });
    builder.addCase(editAnyRoomComment.pending, (state) => {
      state.loadingPostedComments = true;
    });

    builder.addCase(removeAnyRoomComment.rejected, (state) => {
      state.loadingPostedComments = false;
    });
    builder.addCase(editAnyRoomComment.rejected, (state) => {
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
      state.managedAction = "Post";
    });
    builder.addCase(blockRoomComment.fulfilled, (state) => {
      state.loadingPendingComments = false;
      state.managedAction = "Block";
    });
  },
});

export const { clearManageRoomAction } = manageRoomSlice.actions;
export default manageRoomSlice.reducer;
