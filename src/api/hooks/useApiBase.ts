import { AxiosError, AxiosResponse } from "axios";
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
  handleError?: (error: AxiosError) => void;
  delay?: number | null;
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
    setTimeout(async () => {
      await sendRequestInternal(props);
    }, props.delay ?? 0);
  };

  const sendRequestInternal = async (
    props: UseAxiosProps<TRequest, TResponse>
  ) => {
    await sendAxiosRequest<TRequest, TResponse>({
      ...props,
      url: url,
      data: props.input,
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
      .catch((error) => {
        if (props.handleError) props.handleError(error);
        else handleAxiosError(error);
      })
      .finally(() => {
        if (props.handleLoading) setIsLoading(false);
      });
  };

  return { isLoading, response, data, request, setIsLoading };
}
