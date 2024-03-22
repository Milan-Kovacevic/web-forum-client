import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Room } from "@/types/models//rooms";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import RoomDialogs from "@/pages/rooms/components/RoomDialogs";
import { EditRoomInput } from "@/types/inputs/room-inputs";
import { editRoom, removeRoom } from "@/redux/rooms/roomThunks";
import { toast } from "sonner";

type ManageRoomPopupProps = {
  room: Room;
  isPopupOpen: boolean;
  setPopupOpen: (value: boolean) => void;
};

export default function ManageRoomPopup(props: ManageRoomPopupProps) {
  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleEditRoom = (input: EditRoomInput) => {
    dispatch(editRoom(input)).then(() => {
      setEditDialogOpen(false);
      props.setPopupOpen(false);
      toast.success(`Chat room was updated successfully.`);
    });
  };

  const handleRemoveRoom = (room: Room) => {
    dispatch(removeRoom(room.roomId));
    setRemoveDialogOpen(false);
    props.setPopupOpen(false);
    toast.success(`Chat room '${room.name}' was removed successfully.`);
  };

  return (
    <div className="self-end block">
      <Popover onOpenChange={props.setPopupOpen} open={props.isPopupOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontalIcon className="h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-5">
          <div className="grid gap-4">
            <h4 className="leading-none text-sm mb-1">Manage chat room</h4>
            <div className="space-x-2">
              <RoomDialogs.EditRoom
                room={props.room}
                isOpen={isEditDialogOpen}
                onOpenChange={setEditDialogOpen}
                onEditRoom={handleEditRoom}
              >
                <Button size="sm" variant="secondary">
                  <PencilIcon className="h-4" />
                  <span className="font-medium mx-1">Edit</span>
                </Button>
              </RoomDialogs.EditRoom>

              <RoomDialogs.RemoveRoom
                room={props.room}
                isOpen={isRemoveDialogOpen}
                onOpenChange={setRemoveDialogOpen}
                onRemoveRoom={handleRemoveRoom}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRemoveDialogOpen(true)}
                >
                  <Trash2Icon className="h-4" />
                  <span className="font-medium mx-1">Remove</span>
                </Button>
              </RoomDialogs.RemoveRoom>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
