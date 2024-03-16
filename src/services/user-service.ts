import { RegistrationRequest } from "@/types/models/users";
import { sendAxiosRequest } from "./base-service";
import { ApiEndpoints, RequestMethods } from "@/utils/constants";

const getAllRegistrationRequests = async () => {
  return sendAxiosRequest<void, RegistrationRequest[]>({
    url: ApiEndpoints.REGISTRATION_REQUESTS,
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const approveRegistrationRequest = async (requestId: string) => {
  return sendAxiosRequest<void, void[]>({
    url: ApiEndpoints.APPROVE_REQUEST.replace("{requestId}", requestId),
    method: RequestMethods.POST,
    requireAuth: true,
  }).then((response) => response.status);
};

const rejectRegistrationRequest = async (requestId: string) => {
  return sendAxiosRequest<void, void[]>({
    url: ApiEndpoints.REJECT_REQUEST.replace("{requestId}", requestId),
    method: RequestMethods.POST,
    requireAuth: true,
  }).then((response) => response.status);
};

export default {
  getAllRegistrationRequests,
  approveRegistrationRequest,
  rejectRegistrationRequest,
};
