import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

import { handleAxiosError, sendAxiosRequest } from "@/services/base-service";
import { useNavigate } from "react-router-dom";
import { AuthRouteItems } from "@/utils/constants";

type UseAxiosProps<TData, TResponse> = {
  params?: any;
  requireAuth: boolean;
  handleLoading: boolean;
  input?: TData | null;
  handleResponse?: (data?: TResponse) => void;
  handleError?: (error: AxiosError) => void;
  delay?: number | null;
  url?: string;
  method?: string;
};

export default function useApiBase<TResponse>(url: string, method: string) {
  const navigate = useNavigate();
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<TResponse> | null>(
    null
  );

  const request = async <TRequest>(
    props: UseAxiosProps<TRequest, TResponse>
  ) => {
    if (props.handleLoading) setIsLoading(true);
    setTimeout(async () => {
      await sendRequestInternal(props);
    }, props.delay ?? 0);
  };

  const sendRequestInternal = async <TRequest>(
    props: UseAxiosProps<TRequest, TResponse>
  ) => {
    await sendAxiosRequest<TRequest, TResponse>({
      url: url,
      data: props.input,
      method: method,
      ...props,
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
        else {
          handleAxiosError(error);
          if (error.response && error.response.status === 401) {
            navigate(AuthRouteItems.LOGIN.path);
          }
        }
      })
      .finally(() => {
        if (props.handleLoading) setIsLoading(false);
      });
  };

  return { isLoading, response, data, request, setIsLoading };
}
