import {
  RegisteredUser,
  RegistrationRequest,
  SingleRegisteredUser,
} from "@/types/models/users";
import { sendAxiosRequest } from "./base-service";
import { ApiEndpoints, RequestMethods } from "@/utils/constants";
import {
  ChangeUserAccountInput,
  ChangeUserRoomPermissionsInput,
} from "@/types/inputs/user-inputs";
import { RoomPermission } from "@/types/models/rooms";

const getAllRegistrationRequests = async () => {
  return sendAxiosRequest<void, RegistrationRequest[]>({
    url: ApiEndpoints.REGISTRATION_REQUESTS,
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const approveRegistrationRequest = async (requestId: string) => {
  return sendAxiosRequest<void, void>({
    url: ApiEndpoints.APPROVE_REQUEST.replace("{requestId}", requestId),
    method: RequestMethods.POST,
    requireAuth: true,
  }).then((response) => response.status);
};

const rejectRegistrationRequest = async (requestId: string) => {
  return sendAxiosRequest<void, void>({
    url: ApiEndpoints.REJECT_REQUEST.replace("{requestId}", requestId),
    method: RequestMethods.POST,
    requireAuth: true,
  }).then((response) => response.status);
};

const getForumUsers = async () => {
  return sendAxiosRequest<void, RegisteredUser[]>({
    url: ApiEndpoints.USERS,
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const getSingleForumUser = async (userId: string) => {
  return sendAxiosRequest<void, SingleRegisteredUser>({
    url: ApiEndpoints.SINGLE_USER.replace("{userId}", userId),
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const changeUserAccount = async (input: ChangeUserAccountInput) => {
  return sendAxiosRequest<ChangeUserAccountInput, void>({
    url: ApiEndpoints.CHANGE_USER_ACCOUNT.replace("{userId}", input.userId),
    method: RequestMethods.POST,
    requireAuth: true,
    data: input,
  }).then((response) => response.data);
};

const getAllUserRoomPermissions = async (userId: string, roomId: string) => {
  return sendAxiosRequest<void, RoomPermission[]>({
    url: ApiEndpoints.USER_ROOM_PERMISSIONS.replace("{userId}", userId).replace(
      "{roomId}",
      roomId
    ),
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const saveUserRoomPermissions = async (
  input: ChangeUserRoomPermissionsInput
) => {
  return sendAxiosRequest<ChangeUserRoomPermissionsInput, void>({
    url: ApiEndpoints.USER_ROOM_PERMISSIONS.replace(
      "{userId}",
      input.userId
    ).replace("{roomId}", input.roomId),
    method: RequestMethods.POST,
    requireAuth: true,
    data: input,
  }).then((response) => response.data);
};

export default {
  getAllRegistrationRequests,
  approveRegistrationRequest,
  rejectRegistrationRequest,
  getForumUsers,
  getSingleForumUser,
  changeUserAccount,
  getAllUserRoomPermissions,
  saveUserRoomPermissions,
};
