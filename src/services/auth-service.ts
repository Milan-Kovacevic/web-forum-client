import axios from "@/lib/axios";
import { LoginOutput } from "./types/outputs/authentication-outputs";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  ApiEndpoints,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/utils/constants";
import { ExternalLoginInput } from "./types/inputs/authentication-inputs";
import { AxiosResponse } from "axios";

const axiosInstance = axios.getAxios(false);
const axiosAuthInstance = axios.getAxios(true);

export const externalLogin = () => {
  const handleResponse = (response: AxiosResponse<LoginOutput, any>) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, response.data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refreshToken);
    return response;
  };

  const sendRequest = async (input: ExternalLoginInput) => {
    return axiosInstance.request<LoginOutput>({
      method: "POST",
      url: ApiEndpoints.EXTERNAL_LOGIN,
      data: input,
    });
  };

  return { sendRequest, handleResponse };
};
