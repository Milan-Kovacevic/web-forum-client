import { Room } from "@/types/models/rooms";
import { createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  editRoom,
  loadRooms,
  removeRoom,
} from "@/redux/rooms/roomsThunks";

interface RoomsState {
  loadingRooms: boolean;
  loadingDialog: boolean;
  rooms: Room[];
  finishedAction?: "Create" | "Edit" | "Delete" | null;
}

const initialState: RoomsState = {
  loadingRooms: false,
  loadingDialog: false,
  rooms: [],
  finishedAction: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    clearRoomsState(state) {
      state.loadingRooms = false;
      state.loadingDialog = false;
      state.finishedAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRooms.pending, (state) => {
      state.loadingRooms = true;
      return state;
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
      state.rooms = action.payload;
      state.loadingRooms = false;
      return state;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.finishedAction = "Create";
      state.rooms.push(action.payload);
      state.loadingDialog = false;
    });
    builder.addCase(editRoom.fulfilled, (state, action) => {
      state.finishedAction = "Edit";
      var id = state.rooms.findIndex((x) => x.roomId === action.payload.roomId);
      if (id) {
        state.rooms[id] = action.payload;
      }
      state.loadingDialog = false;
    });
    builder.addCase(removeRoom.fulfilled, (state) => {
      state.finishedAction = "Delete";
      state.loadingDialog = false;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.loadingRooms = false;
        state.loadingDialog = false;
      }
    );
  },
});

export const { clearRoomsState } = roomsSlice.actions;
export default roomsSlice.reducer;
