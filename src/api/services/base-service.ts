import axios from "@/lib/axios";
import { ApplicationError } from "@/api/models/responses/application-errors";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { AuthRouteItems } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

type SendAxiosRequestParams<TData> = {
  url: string;
  method: string;
  requireAuth: boolean;
  data?: TData | null;
  queryParams?: any;
  onDataReceived?: (data: TData) => void;
};

const sendAxiosRequest = async <TData, TResponse>(
  params: SendAxiosRequestParams<TData>
) => {
  let instance = params.requireAuth
    ? axios.getAxios(true)
    : axios.getAxios(false);

  return instance.request<TResponse>({
    method: params.method,
    url: params.url,
    data: params.data,
    params: params.queryParams,
  });
};

// Global axios error handler
const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    var response: AxiosResponse = error.response;
    if (response.status === 401) {
      showInfoToast(
        "Login required",
        "Your login session is invalid or expired."
      );
      return;
    } else if (response.status === 403) {
      showErrorToast(
        "Forbidden",
        "Your have insufficient permissions to perform action."
      );
      return;
    }
    var errorReason: ApplicationError | null =
      response.data as ApplicationError;
    if (errorReason !== null) {
      showErrorToast(errorReason.title, errorReason.detail);
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
