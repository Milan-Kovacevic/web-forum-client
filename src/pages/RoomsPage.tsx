import { MessageCirclePlusIcon, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

import RoomItemSkeleton from "@/components/rooms/RoomItemSkeleton";
import RoomItem from "@/components/rooms/RoomItem";
import { Button } from "@/components/ui/button";
import CreateRoomDialog from "@/components/rooms/dialogs/CreateRoomDialog";
import { Room } from "@/api/models/responses/rooms";
import { useGetRooms } from "@/api/hooks/useRooms";
import { toast } from "sonner";

export default function RoomsPage() {
  const { isLoading, rooms, getRooms } = useGetRooms();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [roomItems, setRoomItems] = useState<Room[]>([]);

  useEffect(() => {
    if (rooms) {
      setRoomItems(rooms);
    } else {
      getRooms();
    }
  }, [rooms]);

  const handleRoomCreated = (room?: Room) => {
    if (!room) return;
    roomItems.push(room);
    setIsDialogOpen(false);
  };

  const handleRoomEdited = (room: Room) => {
    var id = roomItems.findIndex((r) => r.roomId === room.roomId);
    if (id === -1 || id === undefined) return;

    const newRoomItems = roomItems.map((item) => {
      if (item.roomId === room.roomId) return room;
      return item;
    });
    setRoomItems(newRoomItems);
    toast.success(`Chat room was updated successfully.`);
  };

  const handleRoomRemoved = (room: Room) => {
    const id = roomItems?.findIndex((r) => r.roomId === room.roomId);
    if (id === -1 || id === undefined) return;

    var newRoomItems = roomItems?.filter((r) => r.roomId !== room.roomId);
    setRoomItems(newRoomItems);
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
              onRoomCreated={handleRoomCreated}
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
              {isLoading &&
                [...Array(15).map((i) => `${i}`)].map((x: string) => (
                  <RoomItemSkeleton key={x} />
                ))}
              {!isLoading &&
                roomItems &&
                roomItems.map((item: Room) => (
                  <RoomItem
                    key={item.roomId}
                    room={item}
                    onRoomEdited={handleRoomEdited}
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
