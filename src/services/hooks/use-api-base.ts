import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { handleApiError } from "../handle-api-error";

const axiosInstance = axios.getAxios(false);
const axiosAuthInstance = axios.getAxios(true);

type UseApiProps<TData> = {
  url: string;
  method: string;
  params?: any;
  hasRequestData: boolean;
  isSecure: boolean;
  onDataReceived?: (data: TData) => void;
};

export default function useApiBase<TInput, TOutput>(
  props: UseApiProps<TOutput>
) {
  const [data, setData] = useState<TOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<TOutput> | null>(null);

  const processRequest = async (input?: TInput | null) => {
    setIsLoading(true);
    let instance = props.isSecure ? axiosAuthInstance : axiosInstance;

    instance
      .request<TOutput>({
        method: props.method,
        url: props.url,
        data: props.hasRequestData && input,
        params: props.params,
      })
      .then((response) => {
        setResponse(response);
        if (response.data == null) {
          return;
        }

        if (props.onDataReceived !== null && props.onDataReceived !== undefined)
          props.onDataReceived(response.data);
        setData(response.data);
        return response;
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, response, data, processRequest, setIsLoading };
}
