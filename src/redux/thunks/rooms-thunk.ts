import roomsService from "@/services/rooms-service";
import { CreateRoomInput, EditRoomInput } from "@/types/inputs/room-inputs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadRooms = createAsyncThunk("getAllRooms", () => {
  return roomsService.getAllRooms();
});

export const createRoom = createAsyncThunk(
  "createRoom",
  (input: CreateRoomInput) => {
    return roomsService.createRoom(input);
  }
);

export const editRoom = createAsyncThunk("editRoom", (input: EditRoomInput) => {
  return roomsService.editRoom(input);
});

export const removeRoom = createAsyncThunk("removeRoom", (roomId: string) => {
  return roomsService.removeRoom(roomId);
});
