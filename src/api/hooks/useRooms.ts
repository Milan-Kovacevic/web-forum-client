import useApiBase from "@/api/hooks/useApiBase";
import { ApiEndpoints } from "@/utils/constants";
import { Room } from "@/api/models/responses/rooms";
import {
  CreateRoomRequest,
  EditRoomRequest,
} from "../models/requests/rooms-request";

export const useGetRooms = () => {
  const { isLoading, data, request, setIsLoading } = useApiBase<Room[]>(
    ApiEndpoints.ROOMS,
    "GET"
  );

  const getRooms = async () => {
    await request<void>({
      requireAuth: false,
      handleLoading: true,
      delay: 1500,
    });
  };

  return { isLoading, rooms: data, getRooms, setIsLoading };
};

export const useCreateRoom = () => {
  const { isLoading, data, request } = useApiBase<Room>(
    ApiEndpoints.ROOMS,
    "POST"
  );

  const createRoom = async (
    input: CreateRoomRequest,
    onRoomCreated: (room?: Room) => void
  ) => {
    await request({
      input: input,
      requireAuth: true,
      handleLoading: true,
      delay: 1000,
      handleResponse: onRoomCreated,
    });
  };

  return { isLoading, room: data, createRoom };
};

export const useEditRoom = (roomId: string) => {
  const { isLoading, data, request } = useApiBase<Room>(
    ApiEndpoints.SINGLE_ROOM.replace("{roomId}", roomId),
    "PUT"
  );

  const editRoom = async (
    input: EditRoomRequest,
    onRoomEdited: (room?: Room) => void
  ) => {
    await request({
      input: input,
      requireAuth: true,
      handleLoading: true,
      delay: 1000,
      handleResponse: onRoomEdited,
    });
  };

  return { isLoading, room: data, editRoom };
};

export const useRemoveRoom = (room: Room) => {
  const { isLoading, request } = useApiBase<void>(
    ApiEndpoints.SINGLE_ROOM.replace("{roomId}", room.roomId),
    "DELETE"
  );

  const removeRoom = async (onRoomRemoved: (room: Room) => void) => {
    await request<void>({
      handleLoading: true,
      requireAuth: true,
      handleResponse: () => onRoomRemoved(room),
      delay: 2000,
    });
  };

  return { isLoading, removeRoom };
};
