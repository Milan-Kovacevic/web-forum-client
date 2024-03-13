import permissionsService from "@/services/permissions-service";
import roomsService from "@/services/rooms-service";
import { CreateRoomInput, EditRoomInput } from "@/types/inputs/room-inputs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadRooms = createAsyncThunk("getAllRooms/rooms", () => {
  return roomsService.getAllRooms();
});

export const createRoom = createAsyncThunk(
  "createRoom/rooms",
  (input: CreateRoomInput) => {
    return roomsService.createRoom(input);
  }
);

export const editRoom = createAsyncThunk(
  "editRoom/rooms",
  (input: EditRoomInput) => {
    return roomsService.editRoom(input);
  }
);

export const removeRoom = createAsyncThunk(
  "removeRoom/rooms",
  (roomId: string) => {
    return roomsService.removeRoom(roomId);
  }
);

export const getRoom = createAsyncThunk("getRoom/rooms", (roomId: string) => {
  return roomsService.getRoom(roomId);
});

export const loadMyRoomPermissions = createAsyncThunk(
  "loadMyRoomPermissions/singleRoom",
  (roomId: string) => {
    return permissionsService.getRoomPermissions(roomId);
  }
);
