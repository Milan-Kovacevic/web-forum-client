import { Room } from "@/types/models/rooms";
import { createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  editRoom,
  loadRooms,
  removeRoom,
} from "@/redux/rooms/roomThunks";

interface RoomsState {
  loading: boolean;
  loadingDialog: boolean;
  rooms: Room[];
  selectedRoom?: Room | null;
  finishedAction?: "Create" | "Edit" | "Delete" | null;
}

const initialState: RoomsState = {
  loading: false,
  loadingDialog: false,
  rooms: [],
  selectedRoom: null,
  finishedAction: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    clear(state) {
      state.loading = false;
      state.loadingDialog = false;
      state.selectedRoom = null;
      state.finishedAction = null;
    },
    setRoom(state, data: { payload: Room | null }) {
      state.selectedRoom = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRooms.pending, (state) => {
      state.loading = true;
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
      state.loading = false;
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
        state.loading = false;
        state.loadingDialog = false;
      }
    );
  },
});

export const { clear, setRoom } = roomSlice.actions;
export default roomSlice.reducer;
