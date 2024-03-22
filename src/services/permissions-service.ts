import { ApiEndpoints, RequestMethods } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { RoomPermission } from "@/types/models/rooms";

const getRoomPermissions = async (roomId: string) => {
  return sendAxiosRequest<void, RoomPermission[]>({
    url: ApiEndpoints.ROOM_PERMISSIONS.replace("{roomId}", roomId),
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

export default { getRoomPermissions };
