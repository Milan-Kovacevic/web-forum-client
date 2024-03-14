import { Room } from "@/types/models/rooms";

export type ManageRoomItemProps = {
  room: Room;
};

export default function ManageRoomItem(props: ManageRoomItemProps) {
  const room = props.room;
  return (
    <div
      key={room.roomId}
      className="flex flex-col items-start gap-2 rounded-lg bg-card border p-3.5 text-left text-sm transition-colors hover:cursor-pointer hover:bg-muted hover:border-primary"
    >
      <div className="flex flex-col items-center gap-1 w-full mx-1">
        <div className="flex flex-row items-center justify-between w-full gap-1">
          <p className="font-medium text-sm sm:text-base">{room.name}</p>
        </div>
        <div className="flex w-full flex-col">
          <p className="line-clamp-2 sm:text-xs text-muted-foreground">
            {room.description?.substring(0, 300)}
          </p>
        </div>
      </div>
    </div>
  );
}
