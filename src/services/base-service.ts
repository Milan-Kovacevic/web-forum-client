import axios from "@/lib/axios";
import { AppError } from "@/types/models/application";
import { AppRoutes } from "@/utils/constants";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

type SendAxiosRequestParams<TData, TResponse> = {
  url: string;
  method: string;
  requireAuth: boolean;
  data?: TData | null;
  queryParams?: any;
  onResponded?: (data: TResponse) => void;
};

const sendAxiosRequest = async <TData, TResponse>(
  params: SendAxiosRequestParams<TData, TResponse>
) => {
  let instance = params.requireAuth
    ? axios.getAxios(true)
    : axios.getAxios(false);

  return instance
    .request<TResponse>({
      method: params.method,
      url: params.url,
      data: params.data,
      params: params.queryParams,
    })
    .then((response) => {
      if (params.onResponded) params.onResponded(response.data);
      return response;
    })
    .catch(handleAxiosError);
};

// Global axios error handler
const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    var response: AxiosResponse = error.response;
    if (response.status === 401) {
      // showInfoToast(
      //   "Login required",
      //   "Your login session is invalid or expired."
      // );
    } else if (response.status === 403) {
      showErrorToast(
        "Forbidden",
        "Your have insufficient permissions to perform action."
      );
      location.href = AppRoutes.FORBIDDEN.path;
    } else {
      var errorReason: AppError | null = response.data as AppError;
      if (errorReason !== null) {
        showErrorToast(errorReason.title, errorReason.detail);
      }
    }
  } else {
    if (error.code === AxiosError.ERR_NETWORK) {
      showErrorToast(
        "Oops, unexpected error occured",
        "Unable to connect to web forum api server"
      );
    } else {
      showErrorToast("Error", "Unknown error. Please, try again later.");
    }
  }
  return Promise.reject(error);
};

const showErrorToast = (title: string, description: string) => {
  toast.error(title, {
    description: description,
  });
};

const showInfoToast = (title: string, description: string) => {
  toast.info(title, {
    description: description,
  });
};

export { sendAxiosRequest, handleAxiosError };
