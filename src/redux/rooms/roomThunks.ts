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
  async (roomId: string) => {
    await roomsService.removeRoom(roomId);
    return roomId;
  }
);

export const getRoom = createAsyncThunk(
  `getRoom/${ROOM_THUNKS_TYPE_NAME}`,
  (roomId: string) => {
    return roomsService.getRoom(roomId);
  }
);

export const getManagedRoom = createAsyncThunk(
  `getManagedRoom/${ROOM_THUNKS_TYPE_NAME}`,
  (roomId: string) => {
    return roomsService.getRoom(roomId);
  }
);

export const getMyRoomPermissions = createAsyncThunk(
  `getMyRoomPermissions/${ReduxThunksTypeNames.ROOM_DETAILS}`,
  (roomId: string) => {
    return permissionsService.getRoomPermissions(roomId);
  }
);
