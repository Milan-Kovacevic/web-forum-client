import { Room } from "@/types/models/rooms";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  editRoom,
  getAllRooms,
  removeRoom,
} from "@/redux/rooms/roomThunks";
import { ReduxThunksTypeNames } from "@/utils/constants";

interface RoomsState {
  loadingRooms: boolean;
  loadingRoomDialog: boolean;
  rooms: Room[];
}

const initialState: RoomsState = {
  loadingRooms: false,
  loadingRoomDialog: false,
  rooms: [],
};

const handleRoomCreated = (
  state: RoomsState,
  action: PayloadAction<Room, string>
) => {
  state.rooms.push(action.payload);
  state.loadingRoomDialog = false;
};

const handleRoomEdited = (
  state: RoomsState,
  action: PayloadAction<Room, string>
) => {
  var id = state.rooms.findIndex((x) => x.roomId === action.payload.roomId);
  if (id >= 0 && id < state.rooms.length) {
    state.rooms[id] = action.payload;
  }
  state.loadingRoomDialog = false;
};

const handleRoomRemoved = (
  state: RoomsState,
  action: PayloadAction<string, string>
) => {
  var filteredRooms = state.rooms.filter((r) => r.roomId !== action.payload);
  state.rooms = [...filteredRooms];
  state.loadingRoomDialog = false;
};

const handleActionRejected = (state: RoomsState) => {
  state.loadingRooms = false;
  state.loadingRoomDialog = false;
};
const matchRoomThunkRejected = (action: any) =>
  action.type.endsWith(`${ReduxThunksTypeNames.ROOMS}/rejected`);

const roomsSlice = createSlice({
  name: ReduxThunksTypeNames.ROOMS,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRooms.pending, (state) => {
      state.loadingRooms = true;
    });
    builder.addCase(createRoom.pending, (state) => {
      state.loadingRoomDialog = true;
    });
    builder.addCase(editRoom.pending, (state) => {
      state.loadingRoomDialog = true;
    });
    builder.addCase(removeRoom.pending, (state) => {
      state.loadingRoomDialog = true;
    });

    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.loadingRooms = false;
    });
    builder.addCase(createRoom.fulfilled, handleRoomCreated);
    builder.addCase(editRoom.fulfilled, handleRoomEdited);
    builder.addCase(removeRoom.fulfilled, handleRoomRemoved);

    builder.addMatcher(matchRoomThunkRejected, handleActionRejected);
  },
});

export default roomsSlice.reducer;
