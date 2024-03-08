import axios from "axios";
import environments from "@/environments/config";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/utils/constants";

const axiosConfiguration = {
  baseURL: environments().baseApiPath,
};

export default {
  getAxios: (useAuthentication: boolean) => {
    const instance = axios.create(axiosConfiguration);
    instance.defaults.headers.common["Content-Type"] = "application/json";
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (useAuthentication && !token) {
      instance.interceptors.request.use(
        (requestConfig) => {
          requestConfig.headers.Authorization = `Bearer ${token}`;
          return requestConfig;
        },
        (error) => Promise.reject(error)
      );
      instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          // If the error status is 401 and there is no originalRequest._retry flag,
          // it means the token has expired and we need to refresh it
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
              const refreshToken = localStorage.getItem(
                REFRESH_TOKEN_STORAGE_KEY
              );
              const response = await axios.post("/api/Refresh", {
                refreshToken,
              });
              const { token } = response.data;

              localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);

              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            } catch (error) {
              // Redirecting to login page if unable to fetch new access token
            }
          }

          return Promise.reject(error);
        }
      );
    }

    return instance;
  },
};
