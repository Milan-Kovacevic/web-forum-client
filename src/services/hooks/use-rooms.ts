import axios from "@/lib/axios";
import { RoomOutput } from "@/services/types/outputs/room-outputs";
import { RoomInput } from "../types/inputs/room-inputs";
import useApiBase from "./use-api-base";
import { ApiEndpoints } from "@/utils/constants";

const axiosAuthInstance = axios.getAxios(true);

export const useCreateRoom = () => {
  const { isLoading, data, response, processRequest, setIsLoading } =
    useApiBase<RoomInput, RoomOutput>({
      url: ApiEndpoints.ROOMS,
      hasRequestData: true,
      isSecure: true,
      method: "POST",
    });

  const createRoom = async (input: RoomInput) => {
    await processRequest(input);
  };

  return { isLoading, room: data, response, createRoom, setIsLoading };
};
