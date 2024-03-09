import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  ApiEndpoints,
  AUTH_XSRF_TOKEN_STORAGE_KEY,
} from "@/utils/constants";
import useApiBase from "@/hooks/useApiBase";
import { AuthToken } from "@/models/responses/authentication";
import {
  ExternalLoginRequest,
  LoginRequest,
  RegisterRequest,
} from "@/models/requests/auth-request";
import { useEffect } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const handleDataReceived = (data?: AuthToken) => {
    if (data === null || data === undefined) return;
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
  };

  const { isLoading, data, response, request, setIsLoading } =
    useApiBase<AuthToken>(ApiEndpoints.LOGIN, "POST");

  const login = async (input: LoginRequest) => {
    await request({
      input: input,
      requireAuth: false,
      handleLoading: true,
      handleResponse: handleDataReceived,
      delay: 1000,
    });
  };

  const externalLogin = async (input: ExternalLoginRequest) => {
    await request({
      input: input,
      requireAuth: false,
      handleLoading: true,
      handleResponse: handleDataReceived,
      delay: 1000,
      url: ApiEndpoints.EXTERNAL_LOGIN,
    });
  };

  useEffect(() => {
    const checkForCallbackQueryParams = () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");
      const error = queryParams.get("error");
      const errorDescription = queryParams.get("error_description");

      if (!state) return;
      if (sessionStorage.getItem(AUTH_XSRF_TOKEN_STORAGE_KEY) != state) return;

      if (code) {
        sessionStorage.removeItem(AUTH_XSRF_TOKEN_STORAGE_KEY);
        externalLogin({ code: code, provider: "GitHub" });
      } else if (error && errorDescription) {
        setTimeout(() => {
          toast.error(error, {
            description: errorDescription,
          });
        }, 1000);
      }
    };

    checkForCallbackQueryParams();
  }, []);

  return { isLoading, data, response, login, externalLogin, setIsLoading };
};

export const useRegister = () => {
  const { isLoading, data, request, setIsLoading } = useApiBase<void>(
    ApiEndpoints.REGISTER,
    "POST"
  );

  const register = async (
    input: RegisterRequest,
    onUserRegistered: () => void
  ) => {
    await request({
      input: input,
      requireAuth: false,
      handleLoading: true,
      handleResponse: onUserRegistered,
      delay: 1000,
    });
  };

  return { isLoading, data, register, setIsLoading };
};
