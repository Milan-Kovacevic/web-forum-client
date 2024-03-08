import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Room } from "@/api/models/responses/rooms";
import JoinRoomButton from "./JoinRoomButton";
import ManageRoomPopup from "./ManageRoomPopup";

export type RoomItemProps = {
  room: Room;
  onRoomEdit: () => void;
  onRoomRemove: () => void;
};

export default function RoomItem(props: RoomItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const room = props.room;
  return (
    <div
      key={room.roomId}
      className="flex flex-col items-start gap-2 rounded-lg border py-4 px-4 text-left text-sm transition-colors hover:bg-muted"
    >
      <div className="flex w-full flex-row gap-3">
        <Avatar className="hidden sm:block text-sm ml-1 mt-1 w-12 h-12 rounded-full border border-muted-foreground">
          <AvatarImage />
          <AvatarFallback>WFR</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-0 w-full">
          <div className="flex flex-row items-center justify-between w-full gap-1">
            <div className="flex items-center gap-2 flex-1">
              <p className="font-semibold text-xl">{room.name}</p>
            </div>

            <ManageRoomPopup
              onRoomRemove={props.onRoomRemove}
              isDialogOpen={isEditDialogOpen}
              setDialogOpen={setIsEditDialogOpen}
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
      <div className="text-xs hidden sm:flex gap-3 items-center self-start mt-4">
        <span className="text-muted-foreground">last comment</span>
        <Separator orientation="vertical" className="h-3" />
        <span className="text-foreground ">5 months ago</span>
      </div>
      <div className="flex items-center justify-between gap-2 mt-0 w-full">
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
