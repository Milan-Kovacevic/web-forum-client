import { Room, RoomPermission } from "@/types/models/rooms";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMyRoomPermissions, getRoom } from "@/redux/rooms/roomThunks";
import { Comment } from "@/types/models/comments";
import {
  createNewRoomComment,
  editRoomComment,
  getUserCommentsForRoom,
  removeRoomComment,
} from "@/redux/rooms/commentThunks";
import { ReduxThunksTypeNames } from "@/utils/constants";

interface RoomDetailsState {
  selectedRoom: Room | null;
  loadingRoom: boolean;
  roomComments: Comment[];
  myPermissions: RoomPermission[];
  loadingMyPermissions: boolean;
  loadingRoomComments: boolean;
}

const initialState: RoomDetailsState = {
  selectedRoom: null,
  loadingRoom: false,
  roomComments: [],
  myPermissions: [],
  loadingMyPermissions: false,
  loadingRoomComments: false,
};

const handleRoomCommentCreated = (
  state: RoomDetailsState,
  action: PayloadAction<Comment, string>
) => {
  state.roomComments = [action.payload, ...state.roomComments];
  state.loadingRoomComments = false;
};

const handleRoomCommentEdited = (
  state: RoomDetailsState,
  action: PayloadAction<Comment, string>
) => {
  var id = state.roomComments.findIndex(
    (x) => x.commentId === action.payload.commentId
  );
  if (id >= 0 && id < state.roomComments.length) {
    state.roomComments[id] = action.payload;
  }
  state.loadingRoomComments = false;
};

const handleRoomCommentRemoved = (
  state: RoomDetailsState,
  action: PayloadAction<string, string>
) => {
  var filteredComments = state.roomComments.filter(
    (x) => x.commentId !== action.payload
  );
  state.roomComments = [...filteredComments];
  state.loadingRoomComments = false;
};

const handleCommentActionRejected = (state: RoomDetailsState) => {
  state.loadingRoomComments = false;
};

const handleCommentActionPending = (state: RoomDetailsState) => {
  state.loadingRoomComments = true;
};

const roomDetailsSlice = createSlice({
  name: ReduxThunksTypeNames.ROOM_DETAILS,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoom.pending, (state) => {
      state.loadingRoom = true;
    });
    builder.addCase(getRoom.rejected, (state) => {
      state.loadingRoom = false;
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.selectedRoom = action.payload;
      state.loadingRoom = false;
    });

    builder.addCase(getUserCommentsForRoom.fulfilled, (state, action) => {
      state.roomComments = action.payload;
      state.loadingRoomComments = false;
    });
    builder.addCase(createNewRoomComment.fulfilled, handleRoomCommentCreated);
    builder.addCase(editRoomComment.fulfilled, handleRoomCommentEdited);
    builder.addCase(removeRoomComment.fulfilled, handleRoomCommentRemoved);

    builder.addCase(getMyRoomPermissions.pending, (state) => {
      state.loadingMyPermissions = true;
    });
    builder.addCase(getMyRoomPermissions.rejected, (state) => {
      state.loadingMyPermissions = false;
    });
    builder.addCase(getMyRoomPermissions.fulfilled, (state, action) => {
      state.myPermissions = action.payload;
      state.loadingMyPermissions = false;
    });

    builder.addMatcher(
      (action) =>
        action.type.endsWith(
          `${ReduxThunksTypeNames.ROOM_DETAILS}/${ReduxThunksTypeNames.COMMENTS}/rejected`
        ),
      handleCommentActionRejected
    );
    builder.addMatcher(
      (action) =>
        action.type.endsWith(
          `${ReduxThunksTypeNames.ROOM_DETAILS}/${ReduxThunksTypeNames.COMMENTS}/pending`
        ),
      handleCommentActionPending
    );
  },
});

export default roomDetailsSlice.reducer;
