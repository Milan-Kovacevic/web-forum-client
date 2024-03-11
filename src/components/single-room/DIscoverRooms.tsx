import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { setRoom } from "@/redux/rooms/roomSlice";
import { Room } from "@/types/models/rooms";
import { AppRoutes } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

export default function DiscoverRooms() {
  const { rooms, selectedRoom } = useAppSelector((state) => state.rooms);
  const navigate = useNavigate();
  const discover = useAppDispatch();

  const handleRoomSelected = (room: Room) => {
    discover(setRoom(room));
    navigate(AppRoutes.SINGLE_ROOM.path.replace(":id", room.roomId));
  };

  return (
    <div className="flex flex-col gap-1 w-full ml-2">
      {rooms.map((room) => (
        <div
          onClick={() => {
            handleRoomSelected(room);
          }}
          className={cn(
            "flex flex-col font-medium items-start gap-2 border rounded-lg text-sm p-3 hover:cursor-pointer",
            room.roomId === selectedRoom?.roomId
              ? "border-primary bg-muted dark:bg-muted/50 hover:dark:bg-muted/30 hover:bg-muted/60"
              : "dark:border-muted/60 border-muted hover:bg-muted/60 hover:dark:bg-muted/30"
          )}
        >
          <p className="ml-3 text-sm">{room.name}</p>
        </div>
      ))}
    </div>
  );
}
