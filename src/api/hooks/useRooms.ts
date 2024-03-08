import useApiBase from "@/api/hooks/useApiBase";
import { ApiEndpoints } from "@/utils/constants";
import { Room } from "@/api/models/responses/rooms";

export const useGetRooms = () => {
  const { isLoading, data, request, setIsLoading } = useApiBase<void, Room[]>(
    ApiEndpoints.ROOMS,
    "GET"
  );

  const getRooms = () => {
    setIsLoading(true);
    request({
      requireAuth: true,
      handleLoading: false,
    }).finally(() => {
      console.log("Fetched");
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    });
  };

  return { isLoading, rooms: data, getRooms };
};
