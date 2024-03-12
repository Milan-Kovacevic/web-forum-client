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
import { loadRooms } from "@/redux/rooms/roomsThunks";
import { clearRoomsState } from "@/redux/rooms/roomsSlice";
import { Room } from "@/types/models/rooms";
import { AdminOnly } from "@/utils/constants";
import RoomsPageHeader from "@/components/rooms/RoomsPageHeader";

export default function RoomsPage() {
  const { loadingRooms, rooms, finishedAction } = useAppSelector(
    (state) => state.rooms
  );
  const { identity } = useAppSelector((state) => state.identity);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const role = identity?.roleType;

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  useEffect(() => {
    if (finishedAction === null || finishedAction === undefined) return;
    if (finishedAction === "Create") setIsDialogOpen(false);
    else if (finishedAction === "Edit") {
      toast.success(`Chat room was updated successfully.`);
    } else if (finishedAction === "Delete") {
      toast.success(`Chat room was removed successfully.`);
    }
    dispatch(loadRooms());
    dispatch(clearRoomsState());
  }, [finishedAction]);

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
              <Input placeholder="Search Rooms" className="pl-8" />
            </div>
            {AdminOnly.find((r) => r === role) && (
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
            )}
          </div>

          <ScrollArea className="h-screen my-4">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 flex-wrap gap-4">
              {loadingRooms ? (
                <RoomsPlaceholder />
              ) : (
                rooms.map((item: Room) => (
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
