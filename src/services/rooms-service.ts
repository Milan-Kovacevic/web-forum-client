import { Room } from "@/types/models/rooms";
import { sendAxiosRequest } from "@/services/base-service";
import { ApiEndpoints, RequestMethods } from "@/utils/constants";
import { CreateRoomInput, EditRoomInput } from "@/types/inputs/room-inputs";

const getAllRooms = async () => {
  return sendAxiosRequest<void, Room[]>({
    url: ApiEndpoints.ROOMS,
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const createRoom = async (input: CreateRoomInput) => {
  return sendAxiosRequest<CreateRoomInput, Room>({
    url: ApiEndpoints.ROOMS,
    method: RequestMethods.POST,
    requireAuth: true,
    data: input,
  }).then((response) => response.data);
};

const editRoom = async (input: EditRoomInput) => {
  return sendAxiosRequest<EditRoomInput, Room>({
    url: ApiEndpoints.SINGLE_ROOM.replace("{roomId}", input.roomId),
    method: RequestMethods.PUT,
    requireAuth: true,
    data: input,
  }).then((response) => response.data);
};

const removeRoom = async (roomId: string) => {
  return sendAxiosRequest<void, void>({
    url: ApiEndpoints.SINGLE_ROOM.replace("{roomId}", roomId),
    method: RequestMethods.DELETE,
    requireAuth: true,
  }).then((response) => response.data);
};

const getRoom = async (roomId: string) => {
  return sendAxiosRequest<void, Room>({
    url: ApiEndpoints.SINGLE_ROOM.replace("{roomId}", roomId),
    method: RequestMethods.GET,
    requireAuth: false,
  }).then((response) => response.data);
};

export default { getAllRooms, createRoom, editRoom, removeRoom, getRoom };
