import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { getAllRooms } from "@/redux/rooms/roomThunks";
import { Room } from "@/types/models/rooms";
import { AppRoutes } from "@/utils/constants";
import { MessageCircleHeartIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ChatRoomsListBrowserProps = {
  className?: string;
};

export default function ChatRoomsListBrowser(props: ChatRoomsListBrowserProps) {
  const { rooms, loadingRooms } = useAppSelector((state) => state.rooms);
  const { room } = useAppSelector((state) => state.singleRoom);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  const handleRoomSelected = (room: Room) => {
    navigate(AppRoutes.SINGLE_ROOM.path.replace(":id", room.roomId));
  };

  return (
    <div className={props.className}>
      <div className="flex gap-1.5 items-center mb-3 ml-1">
        <MessageCircleHeartIcon className="w-5 h-5 opacity-90" />
        <p className="font-medium text-base sm:text-lg">Discover Other Rooms</p>
      </div>
      <div className="flex flex-col gap-1 w-full ml-2">
        {loadingRooms && <span>Loading...</span>}
        {!loadingRooms &&
          rooms.map((item) => (
            <div
              key={item.roomId}
              onClick={() => {
                handleRoomSelected(item);
              }}
              className={cn(
                "flex flex-col font-medium items-start gap-2 border rounded-lg text-sm p-3 hover:cursor-pointer",
                item.roomId === room?.roomId
                  ? "border-primary bg-muted dark:bg-muted/50 hover:dark:bg-muted/30 hover:bg-muted/60"
                  : "dark:border-muted/60 border-muted hover:bg-muted/60 hover:dark:bg-muted/30"
              )}
            >
              <p className="ml-3 text-sm font-medium text-accent-foreground">
                {item.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
