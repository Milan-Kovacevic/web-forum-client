import { AxiosResponse } from "axios";
import { useState } from "react";

import {
  handleAxiosError,
  sendAxiosRequest,
} from "@/api/services/base-service";

type UseAxiosProps<TData, TResponse> = {
  params?: any;
  requireAuth: boolean;
  handleLoading: boolean;
  input?: TData | null;
  handleResponse?: (data?: TResponse) => void;
};

export default function useApiBase<TRequest, TResponse>(
  url: string,
  method: string
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<TResponse> | null>(
    null
  );

  const request = async (props: UseAxiosProps<TRequest, TResponse>) => {
    if (props.handleLoading) setIsLoading(true);
    sendAxiosRequest<TRequest, TResponse>({
      ...props,
      url: url,
      method: method,
    })
      .then((response) => {
        setResponse(response);
        if (response.data == null) {
          return;
        }

        setData(response.data);
        return response;
      })
      .then((response) => {
        if (props.handleResponse) props.handleResponse(response?.data);
        return response;
      })
      .catch(handleAxiosError)
      .finally(() => {
        if (props.handleLoading) setIsLoading(false);
      });
  };

  return { isLoading, response, data, request, setIsLoading };
}
