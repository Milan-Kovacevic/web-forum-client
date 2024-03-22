import { MessageCirclePlusIcon, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SetStateAction, useEffect, useState } from "react";
import RoomItem from "@/pages/rooms/components/RoomItem";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getAllRooms } from "@/redux/rooms/roomThunks";
import { Room } from "@/types/models/rooms";
import { AdminOnly } from "@/utils/constants";
import RoomItemsSkeletonLoader from "@/pages/rooms/components/RoomItemsSkeletonLoader";
import RoomDialogs from "@/pages/rooms/components/RoomDialogs";

export default function RoomsPage() {
  const { loadingRooms, rooms } = useAppSelector((state) => state.rooms);
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [searchText, setSearchText] = useState("");
  const { identity } = useAppSelector((state) => state.identity);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isAdmin = AdminOnly.find((r) => r === identity?.roleType);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      setChatRooms(rooms);
    }
  }, [rooms]);

  const handleSearchChatRoom = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
    if (event.target.value === "") {
      setChatRooms(rooms);
    }
  };

  const handleKeyPressed = (event: { key: string }) => {
    if (event.key === "Enter") {
      var filteredRooms = rooms.filter((r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setChatRooms(filteredRooms);
    }
  };

  return (
    <div className="h-full w-full flex max-w-screen-2xl sm:p-8 py-4 px-2 mx-auto">
      <div className="px-6 flex-1 my-2">
        <RoomsPageHeader />
        <Separator className="my-6 w-full" />

        <div className="max-w-screen-2xl">
          <div className="flex justify-between items-center flex-wrap pb-2 gap-3">
            <div className="relative w-auto flex flex-1 max-w-md">
              <Search
                size="sm"
                className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
              />
              <Input
                value={searchText}
                onChange={handleSearchChatRoom}
                onKeyDown={handleKeyPressed}
                placeholder="Search Rooms"
                className="pl-8"
              />
            </div>
            {isAdmin && (
              <RoomDialogs.CreateRoom
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
              </RoomDialogs.CreateRoom>
            )}
          </div>

          <ScrollArea className="h-screen my-4">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 flex-wrap gap-4">
              {loadingRooms ? (
                <RoomItemsSkeletonLoader />
              ) : (
                chatRooms.map((item: Room) => (
                  <RoomItem key={item.roomId} room={item} />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

const RoomsPageHeader = () => (
  <div className="space-y-1">
    <h2 className="text-xl text-foreground font-semibold">
      Discover Chat Rooms
    </h2>
    <p className="text-muted-foreground text-sm">
      Find the topics that your are interested in and join along the
      conversation.
    </p>
  </div>
);
