import axios, { AxiosError, AxiosResponse } from "axios";
import environments from "@/environments/config";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/utils/constants";
import { Tokens } from "@/types/models/authentication";

const axiosConfiguration = {
  baseURL: environments().baseApiPath,
};

const refreshUserTokens = async (accessToken: string, refreshToken: string) => {
  const response = await axios.post<Tokens>(
    "/api/Refresh",
    {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    axiosConfiguration
  );

  var newTokens = response.data;
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, newTokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, newTokens.refreshToken);

  return newTokens.accessToken;
};

export default {
  getAxios: (useAuthentication: boolean) => {
    const instance = axios.create(axiosConfiguration);
    instance.defaults.headers.common["Content-Type"] = "application/json";
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (useAuthentication && token !== null) {
      instance.interceptors.request.use(
        (requestConfig) => {
          requestConfig.headers.Authorization = `Bearer ${token}`;
          return requestConfig;
        },
        (error) => Promise.reject(error)
      );
      instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config;
          // If the error status is 401 it means the token has expired and we need to refresh it
          if (originalRequest && error.response?.status == 401) {
            try {
              const refreshToken = localStorage.getItem(
                REFRESH_TOKEN_STORAGE_KEY
              );
              if (refreshToken !== null && refreshToken !== undefined) {
                var newAccessToken = await refreshUserTokens(
                  token,
                  refreshToken
                );
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios.request(originalRequest);
              }
            } catch (error) {}
          }
          return Promise.reject(error);
        }
      );
    }

    return instance;
  },
};
