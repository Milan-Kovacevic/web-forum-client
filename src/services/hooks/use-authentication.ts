import axios from "@/lib/axios";
import {
  ExternalLoginInput,
  LoginInput,
  RegisterInput,
} from "@/services/types/inputs/authentication-inputs";
import { LoginOutput } from "@/services/types/outputs/authentication-outputs";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  ApiEndpoints,
} from "@/utils/constants";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { handleApiError } from "@/services/handle-api-error";
import useApiBase from "./use-api-base";

const axiosInstance = axios.getAxios(false);
const axiosAuthInstance = axios.getAxios(true);

export const useLogin = () => {
  const handleDataReceived = (data: LoginOutput) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
  };

  const { isLoading, data, response, processRequest, setIsLoading } =
    useApiBase<LoginInput, LoginOutput>({
      url: ApiEndpoints.LOGIN,
      hasRequestData: true,
      isSecure: false,
      method: "POST",
      onDataReceived: handleDataReceived,
    });

  const login = async (input: LoginInput) => {
    await processRequest(input);
  };

  return { isLoading, data, response, login, setIsLoading };
};

export const useApiLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoginOutput | null>(null);
  const [response, setResponse] = useState<AxiosResponse | null>(null);

  const login = async (input: LoginInput) => {
    setIsLoading(true);
    axiosInstance
      .post<LoginOutput>(ApiEndpoints.LOGIN, input)
      .then((response) => {
        setResponse(response);
        if (response.data == null) {
          return;
        }

        localStorage.setItem(
          ACCESS_TOKEN_STORAGE_KEY,
          response.data.accessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          response.data.refreshToken
        );
        setData(response.data);
        return response;
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, login, data, response };
};

export const useApiRegister = () => {
  const { isLoading, data, response, processRequest } = useApiBase<
    RegisterInput,
    void
  >({
    url: ApiEndpoints.REGISTER,
    hasRequestData: true,
    isSecure: false,
    method: "POST",
  });

  const register = async (input: RegisterInput) => {
    await processRequest(input);
  };

  return { isLoading, data, response, register };
};
