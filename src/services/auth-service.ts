import {
  ExternalLoginInput,
  LoginInput,
  RegisterInput,
} from "@/types/inputs/auth-inputs";
import { sendAxiosRequest } from "@/services/base-service";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  ApiEndpoints,
  REFRESH_TOKEN_STORAGE_KEY,
  RequestMethods,
} from "@/utils/constants";
import { AxiosResponse } from "axios";
import { Tokens, UserInfo } from "@/types/models/authentication";

const login = async (input: LoginInput) => {
  return sendAxiosRequest<LoginInput, Tokens>({
    url: ApiEndpoints.LOGIN,
    method: RequestMethods.POST,
    requireAuth: false,
    data: input,
  }).then((response: AxiosResponse<Tokens>) => {
    handleUserAuthenticated(response.data);
    return { data: response.data, status: response.status };
  });
};

const externalLogin = async (input: ExternalLoginInput) => {
  return sendAxiosRequest<ExternalLoginInput, Tokens>({
    url: ApiEndpoints.EXTERNAL_LOGIN,
    method: RequestMethods.POST,
    requireAuth: false,
    data: input,
  }).then((response: AxiosResponse<Tokens>) => {
    handleUserAuthenticated(response.data);
    return { data: response.data, status: response.status };
  });
};

const register = async (input: RegisterInput) => {
  return sendAxiosRequest<RegisterInput, void>({
    url: ApiEndpoints.REGISTER,
    method: RequestMethods.POST,
    requireAuth: false,
    data: input,
  }).then((response) => {
    return { data: response.data, status: response.status };
  });
};

const getUserInfo = async () => {
  return sendAxiosRequest<void, UserInfo>({
    url: ApiEndpoints.USER_INFO,
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => {
    return { data: response.data, status: response.status };
  });
};

const logout = async () => {
  return sendAxiosRequest<void, void>({
    url: ApiEndpoints.LOGOUT,
    method: RequestMethods.POST,
    requireAuth: true,
  }).then((response) => {
    return { status: response.status };
  });
};

const handleUserAuthenticated = (tokens: Tokens) => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken);
};

export default { login, externalLogin, register, getUserInfo, logout };
