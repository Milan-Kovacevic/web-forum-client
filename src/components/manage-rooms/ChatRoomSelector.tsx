import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadRooms } from "@/redux/rooms/roomsThunks";
import { Room } from "@/types/models/rooms";
import { AppRoutes } from "@/utils/constants";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import RoomSelectorPlaceholder from "./RoomSelectorPlaceholder";

export default function ChatRoomSelector() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingRooms, rooms } = useAppSelector((state) => state.rooms);
  const { room } = useAppSelector((state) => state.singleRoom);

  useEffect(() => {
    dispatch(loadRooms());
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
          <RoomSelectorPlaceholder />
        ) : (
          <div className="flex flex-col gap-2">
            {rooms.map((item: Room) => (
              <div
                key={item.roomId}
                onClick={() => handleRoomSelected(item)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg bg-card border p-3.5 text-left text-sm",
                  "transition-colors hover:cursor-pointer hover:bg-accent/60",
                  item.roomId == room?.roomId ? "bg-muted border-primary" : ""
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
