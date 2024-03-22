import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getAllRooms } from "@/redux/rooms/roomThunks";
import { Room } from "@/types/models/rooms";
import { AppRoutes } from "@/utils/constants";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatRoomSelectorList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingRooms, rooms } = useAppSelector((state) => state.rooms);
  const { managedRoom } = useAppSelector((state) => state.manageRoom);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  const handleRoomSelected = (room: Room) => {
    navigate(AppRoutes.MANAGE_SINGLE_ROOM.path.replace(":id", room.roomId));
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <p className="mb-3 text-lg font-semibold">Manage Chat Rooms</p>
      <div className="relative w-auto flex max-w-md">
        <SearchIcon
          size="sm"
          className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
        />
        <Input placeholder="Search Rooms" className="pl-8" />
      </div>
      <ScrollArea className="my-4 mt-6 flex flex-col gap-2 flex-1">
        {loadingRooms ? (
          <SelectListPlaceholder />
        ) : (
          <div className="flex flex-col gap-2">
            {rooms.map((item: Room) => (
              <div
                key={item.roomId}
                onClick={() => handleRoomSelected(item)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg bg-card border p-3.5 text-left text-sm",
                  "transition-colors hover:cursor-pointer hover:bg-accent/60",
                  item.roomId == managedRoom?.roomId
                    ? "bg-muted border-primary"
                    : ""
                )}
              >
                <div className="flex flex-col items-center gap-1 w-full mx-1">
                  <div className="flex flex-row items-center justify-between w-full gap-1">
                    <p className="font-medium text-sm sm:text-base text-accent-foreground/90">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex w-full flex-col">
                    <p className="line-clamp-2 sm:text-xs text-muted-foreground">
                      {item.description?.substring(0, 300)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

const SelectListPlaceholder = () => {
  const numOfItems = 12;
  const loadingItems = Array.from({ length: numOfItems }, (_, index) => index);

  return (
    <div className="flex flex-col gap-2">
      {loadingItems.map((item) => (
        <div
          key={item}
          className="flex flex-col justify-end gap-1.5 w-full border rounded-lg py-4 px-4 transition-colors"
        >
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-7 w-11/12" />
        </div>
      ))}
    </div>
  );
};
