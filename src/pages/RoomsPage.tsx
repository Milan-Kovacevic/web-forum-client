import { MessageCirclePlusIcon, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import RoomItem from "@/components/rooms/RoomItem";
import { Button } from "@/components/ui/button";
import CreateRoomDialog from "@/components/rooms/dialogs/CreateRoomDialog";
import { toast } from "sonner";
import RoomsPlaceholder from "@/components/rooms/RoomsPlaceholder";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadRooms } from "@/redux/thunks/rooms-thunk";
import { clear } from "@/redux/rooms-slice";
import { Room } from "@/types/models/rooms";

export default function RoomsPage() {
  const { loading, rooms, performedAction, singleRoom } = useAppSelector(
    (state) => state.rooms
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  useEffect(() => {
    if (
      performedAction === null ||
      performedAction === undefined ||
      singleRoom === null ||
      singleRoom === undefined
    )
      return;
    dispatch(loadRooms());
    dispatch(clear());
    if (performedAction === "Create") setIsDialogOpen(false);
    else if (performedAction === "Edit") {
      toast.success(`Chat room was updated successfully.`);
    } else if (performedAction === "Delete") {
      toast.success(
        `Chat room '${singleRoom?.name}' was removed successfully.`
      );
    }
  }, [performedAction, singleRoom]);

  const handleRoomRemoved = (room: Room) => {
    const id = rooms?.findIndex((r) => r.roomId === room.roomId);
    if (id === -1 || id === undefined) return;

    rooms?.splice(id, 1);
    toast.success(`Chat room '${room.name}' was removed successfully.`);
  };

  return (
    <div className="h-full w-full flex max-w-screen-2xl p-8 mx-auto">
      <div className="px-6 flex-1 my-2">
        <div className="space-y-1">
          <h2 className="text-xl text-foreground font-semibold">
            Discover Chat Rooms
          </h2>
          <p className="text-muted-foreground text-sm">
            Find the topics that your are interested in and join along the
            conversation.
          </p>
        </div>
        <Separator className="my-6 w-full" />

        <div className="max-w-screen-2xl ">
          <div className="flex justify-between items-center flex-wrap pb-2 gap-3">
            <div className="relative w-auto flex flex-1 max-w-md">
              <Search
                size="sm"
                className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
              />
              <Input placeholder="Search Rooms" className="pl-8" />
            </div>
            <CreateRoomDialog
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <Button
                onClick={() => setIsDialogOpen(true)}
                size="sm"
                variant="default"
              >
                <MessageCirclePlusIcon className="h-5" />
                <span className="text-sm text-medium hidden sm:block">
                  Create Room
                </span>
              </Button>
            </CreateRoomDialog>
          </div>

          <ScrollArea className="h-screen my-4">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 flex-wrap gap-4">
              {loading && <RoomsPlaceholder />}
              {!loading &&
                rooms &&
                rooms.map((item: Room) => (
                  <RoomItem
                    key={item.roomId}
                    room={item}
                    onRoomRemoved={handleRoomRemoved}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
