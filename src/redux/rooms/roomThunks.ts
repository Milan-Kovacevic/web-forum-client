import permissionsService from "@/services/permissions-service";
import roomsService from "@/services/rooms-service";
import { CreateRoomInput, EditRoomInput } from "@/types/inputs/room-inputs";
import { ReduxThunksTypeNames } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ROOM_THUNKS_TYPE_NAME = ReduxThunksTypeNames.ROOMS;

export const getAllRooms = createAsyncThunk(
  `getAllRooms/${ROOM_THUNKS_TYPE_NAME}`,
  () => {
    return roomsService.getAllRooms();
  }
);

export const createRoom = createAsyncThunk(
  `createRoom/${ROOM_THUNKS_TYPE_NAME}`,
  (input: CreateRoomInput) => {
    return roomsService.createRoom(input);
  }
);

export const editRoom = createAsyncThunk(
  `editRoom/${ROOM_THUNKS_TYPE_NAME}`,
  (input: EditRoomInput) => {
    return roomsService.editRoom(input);
  }
);

export const removeRoom = createAsyncThunk(
  `removeRoom/${ROOM_THUNKS_TYPE_NAME}`,
  (roomId: string) => {
    return roomsService.removeRoom(roomId).then(() => roomId);
  }
);

export const getRoom = createAsyncThunk("getRoom/rooms", (roomId: string) => {
  return roomsService.getRoom(roomId);
});

export const loadManagedRoom = createAsyncThunk(
  "loadManagedRoom/rooms",
  (roomId: string) => {
    return roomsService.getRoom(roomId);
  }
);

export const loadMyRoomPermissions = createAsyncThunk(
  "loadMyRoomPermissions/singleRoom",
  (roomId: string) => {
    return permissionsService.getRoomPermissions(roomId);
  }
);
