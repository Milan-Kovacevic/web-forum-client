import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/types/models/rooms";
import JoinRoomButton from "./JoinRoomButton";
import ManageRoomPopup from "./ManageRoomPopup";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppRoutes, RootOnly } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { getRoom } from "@/redux/rooms/roomsThunks";
import { differenceInDays } from "date-fns";
import { formatDateDistance } from "@/utils/utility";

export type RoomItemProps = {
  room: Room;
};

export default function RoomItem(props: RoomItemProps) {
  const room = props.room;
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const { finishedAction } = useAppSelector((state) => state.rooms);
  const { identity } = useAppSelector((state) => state.identity);
  const role = identity?.roleType;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleJoinRoom = () => {
    dispatch(getRoom(props.room.roomId));
    navigate(AppRoutes.SINGLE_ROOM.path.replace(":id", props.room.roomId));
  };

  useEffect(() => {
    if (finishedAction === "Edit" || finishedAction === "Delete")
      setPopupOpen(false);
  }, [finishedAction]);

  return (
    <div
      key={room.roomId}
      className="flex flex-col items-start gap-2 rounded-lg bg-card border p-3.5 text-left text-sm transition-colors hover:bg-muted hover:border-primary"
    >
      <div className="flex w-full flex-row gap-3 flex-1">
        <Avatar className="hidden sm:block text-sm ml-1 mt-1 w-12 h-12 rounded-full dark:border-none border border-muted-foreground">
          <AvatarImage />
          <AvatarFallback className="text-xl">{room.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-0 w-full">
          <div className="flex flex-row items-center justify-between w-full gap-1">
            <div className="flex items-center gap-2 flex-1 min-h-9">
              <p className="font-semibold text-lg">{room.name}</p>
            </div>
            {RootOnly.find((r) => r === role) && (
              <ManageRoomPopup
                isOpen={isPopupOpen}
                setOpen={setPopupOpen}
                room={room}
              />
            )}
          </div>
          <div className="flex w-full flex-col">
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {room.description?.substring(0, 300)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1 w-full">
        <div className="flex-1 flex items-center gap-1 self-end ml-1">
          {differenceInDays(Date.now(), room.dateCreated) < 1 && (
            <Badge
              variant="default"
              className="text-xs transition-colors bg-primary/85"
            >
              New
            </Badge>
          )}

          <Badge variant="outline" className="text-xs transition-colors">
            <div className="flex-1 flex items-center gap-1 self-end">
              <span className="text-xs text-muted-foreground font-normal">
                Created:
              </span>
              <p className="text-xs font-semibold text-accent-foreground/80">
                {formatDateDistance(room.dateCreated)}
              </p>
            </div>
          </Badge>
        </div>

        <div className="hidden sm:flex items-center gap-2 self-end">
          <JoinRoomButton
            onRoomJoinClicked={handleJoinRoom}
            className="sm:ml-0 ml-auto"
          />
        </div>
      </div>
    </div>
  );
}
