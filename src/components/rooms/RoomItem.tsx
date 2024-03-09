import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/api/models/responses/rooms";
import JoinRoomButton from "./JoinRoomButton";
import ManageRoomPopup from "./ManageRoomPopup";
import { useState } from "react";

export type RoomItemProps = {
  room: Room;
  onRoomEdited: (room: Room) => void;
  onRoomRemoved: (room: Room) => void;
};

export default function RoomItem(props: RoomItemProps) {
  const room = props.room;
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

  const delegateRoomEdited = (room: Room) => {
    setPopupOpen(false);
    props.onRoomEdited(room);
  };

  const delegateRoomRemoved = (room: Room) => {
    setPopupOpen(false);
    props.onRoomRemoved(room);
  };

  return (
    <div
      key={room.roomId}
      className="flex flex-col items-start gap-2 rounded-lg border py-3 px-3 text-left text-sm transition-colors hover:bg-muted"
    >
      <div className="flex w-full flex-row gap-3">
        <Avatar className="hidden sm:block text-sm ml-1 mt-1 w-12 h-12 rounded-full border-2 border-muted-foreground">
          <AvatarImage />
          <AvatarFallback>WFR</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-0 w-full">
          <div className="flex flex-row items-center justify-between w-full gap-1">
            <div className="flex items-center gap-2 flex-1">
              <p className="font-semibold text-base">{room.name}</p>
            </div>

            <ManageRoomPopup
              isOpen={isPopupOpen}
              setOpen={setPopupOpen}
              room={room}
              onRoomRemove={delegateRoomRemoved}
              onRoomEdit={delegateRoomEdited}
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-row items-start justify-between w-full gap-1">
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {room.description?.substring(0, 300)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-1 w-full">
        <div className="hidden sm:flex items-center justify-start gap-2 flex-1">
          <Badge
            variant="outline"
            className="h-6 text-xs font-medium transition-none"
          >
            2 Moderators
          </Badge>
          <Badge
            variant="secondary"
            className="h-6 text-xs font-medium transition-none"
          >
            120 Comments
          </Badge>
        </div>
        <JoinRoomButton className="sm:ml-0 ml-auto" />
      </div>
    </div>
  );
}
