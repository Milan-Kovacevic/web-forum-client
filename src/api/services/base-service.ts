import axios from "@/lib/axios";
import { ApplicationError } from "@/api/models/responses/application-errors";
import { AxiosError } from "axios";
import { toast } from "sonner";

const axiosInstance = axios.getAxios(false);
const axiosAuthInstance = axios.getAxios(true);

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
  let instance = params.requireAuth ? axiosAuthInstance : axiosInstance;

  return instance.request<TResponse>({
    method: params.method,
    url: params.url,
    data: params.data,
    params: params.queryParams,
  });
};

const handleAxiosError = (error: AxiosError) => {
  var appError = error.response?.data as ApplicationError;
  if (error.code === "ERR_NETWORK") {
    toast.error("Oops, unexpected error occured", {
      description: "Unable to connect to web forum api server",
    });
  } else if (appError !== null && appError !== undefined) {
    toast.error(appError.title, {
      description: appError.detail,
    });
  } else {
    toast.error("Error", {
      description: "Unknown error. Please, try again later.",
    });
  }
};

export { sendAxiosRequest, handleAxiosError };
