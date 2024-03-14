import ManageRoomItem from "@/components/manage-rooms/ManageRoomItem";
import RoomsPlaceholder from "@/components/rooms/RoomsPlaceholder";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/useRedux";
import { Room } from "@/types/models/rooms";
import { Search } from "lucide-react";

export default function ManageRoomsPage() {
  const { loadingRooms, rooms } = useAppSelector((state) => state.rooms);
  return (
    <div className="h-full w-full flex max-w-screen-2xl sm:p-8 py-4 px-2 mx-auto">
      <div className="px-6 flex-1 my-2 h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full dark:shadow-sm shadow-lg dark:shadow-accent rounded-lg border border-border h-screen"
          style={{ height: undefined }} // reset of radix style
        >
          <ResizablePanel
            className="max-w-xl md:min-w-80 min-w-40"
            defaultSize={30}
          >
            <div className="p-6">
              <p className="mb-3 text-lg font-semibold">Manage Chat Rooms</p>
              <div className="relative w-auto flex flex-1 max-w-md">
                <Search
                  size="sm"
                  className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
                />
                <Input placeholder="Search Rooms" className="pl-8" />
              </div>
              <ScrollArea className="my-4 mt-6">
                <div className="grid grid-cols-1 flex-wrap gap-2">
                  {loadingRooms ? (
                    <RoomsPlaceholder />
                  ) : (
                    rooms.map((item: Room) => (
                      <ManageRoomItem key={item.roomId} room={item} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className=""></ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
