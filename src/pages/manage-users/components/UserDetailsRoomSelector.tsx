import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getAllRooms } from "@/redux/rooms/roomThunks";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MessageSquareShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { setManagedUserChatRoom } from "@/redux/users/manageUserSlice";
import { Room } from "@/types/models/rooms";

export default function UserDetailsRoomSelector() {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { rooms } = useAppSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(getAllRooms());
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen((isDialogOpen) => !isDialogOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleRoomSelected = (room: Room) => {
    dispatch(setManagedUserChatRoom(room));
    setDialogOpen(false);
  };

  return (
    <div className="h-auto max-h-96 flex flex-col">
      <div className="flex flex-row gap-3 items-center">
        <Button
          size="sm"
          className="sm:h-8 h-7 sm:px-3 px-2.5 sm:text-sm text-xs font-medium"
          variant="secondary"
          onClick={() => setDialogOpen(true)}
        >
          Choose Room
        </Button>
        <div className="flex flex-col gap-0 items-center">
          <Separator orientation="vertical" className="h-2.5" />
          <span className="!bg-clip-text bg-background font-normal text-xs py-0.5 text-accent-foreground">
            or
          </span>
          <Separator orientation="vertical" className="h-2.5" />
        </div>
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </div>

      <CommandDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <CommandInput placeholder="Search room..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList aria-disabled="false">
            {rooms.map((item) => (
              <CommandItem
                key={item.roomId}
                onSelect={() => handleRoomSelected(item)}
                onClick={() => handleRoomSelected(item)}
              >
                <MessageSquareShareIcon className="text-accent-foreground h-3 mx-2" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandList>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
