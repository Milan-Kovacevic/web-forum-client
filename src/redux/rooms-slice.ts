import { Room } from "@/types/models/rooms";
import { createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  editRoom,
  loadRooms,
  removeRoom,
} from "@/redux/thunks/rooms-thunk";

interface RoomsState {
  loading: boolean;
  loadingDialog: boolean;
  rooms: Room[];
  singleRoom?: Room | null;
  performedAction?: "Create" | "Edit" | "Delete" | null;
}

const initialState: RoomsState = {
  loading: false,
  loadingDialog: false,
  rooms: [],
  singleRoom: null,
  performedAction: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    clear(state) {
      state.loading = false;
      state.loadingDialog = false;
      state.singleRoom = null;
      state.performedAction = null;
    },
    setSingleRoom(state, data: { payload: Room }) {
      state.singleRoom = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRoom.pending, (state) => {
      state.loadingDialog = true;
    });
    builder.addCase(editRoom.pending, (state) => {
      state.loadingDialog = true;
    });
    builder.addCase(removeRoom.pending, (state) => {
      state.loadingDialog = true;
    });

    builder.addCase(loadRooms.fulfilled, (state, action) => {
      state.rooms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.singleRoom = action.payload.data;
      state.performedAction = "Create";
      state.loadingDialog = false;
    });
    builder.addCase(editRoom.fulfilled, (state, action) => {
      state.singleRoom = action.payload.data;
      state.performedAction = "Edit";
      state.loadingDialog = false;
    });
    builder.addCase(removeRoom.fulfilled, (state) => {
      state.performedAction = "Delete";
      state.loadingDialog = false;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.loading = false;
        state.loadingDialog = false;
      }
    );
  },
});

export const { clear, setSingleRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
