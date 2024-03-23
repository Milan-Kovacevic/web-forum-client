import { MessageCirclePlusIcon, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import RoomItem from "@/pages/rooms/components/RoomItem";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { Room } from "@/types/models/rooms";
import { AdminOnly } from "@/utils/constants";
import RoomItemsSkeletonLoader from "@/pages/rooms/components/RoomItemsSkeletonLoader";
import RoomDialogs from "@/pages/rooms/components/RoomDialogs";
import { useSearchableRooms } from "@/hooks/useSearchableRooms";

export default function RoomsPage() {
  const { identity } = useAppSelector((state) => state.identity);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isAdmin = AdminOnly.find((r) => r === identity?.roleType);

  // custom hook
  const { onTextChanged, onKeyPressed, chatRooms, loadingRooms, searchText } =
    useSearchableRooms();

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
                onChange={onTextChanged}
                onKeyDown={onKeyPressed}
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
              ) : chatRooms.length > 0 ? (
                chatRooms.map((item: Room) => (
                  <RoomItem key={item.roomId} room={item} />
                ))
              ) : (
                <div className="ml-2 items-center flex-wrap flex flex-row gap-1">
                  <p className="text-base">There are no results for</p>
                  <span className="text-base italic font-medium">
                    '{searchText}'
                  </span>
                </div>
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
