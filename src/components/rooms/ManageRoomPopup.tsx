import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Room } from "@/types/models//rooms";
import RemoveRoomDialog from "./dialogs/RemoveRoomDialog";
import EditRoomDialog from "./dialogs/EditRoomDialog";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";

type ManageRoomPopupProps = {
  room: Room;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function ManageRoomPopup(props: ManageRoomPopupProps) {
  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);
  const { finishedAction } = useAppSelector((state) => state.rooms);

  useEffect(() => {
    if (finishedAction === "Edit") {
      setEditDialogOpen(false);
    } else if (finishedAction == "Delete") {
      setRemoveDialogOpen(false);
    }
  }, [finishedAction]);

  return (
    <div className="self-end block">
      <Popover onOpenChange={props.setOpen} open={props.isOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontalIcon className="h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-5">
          <div className="grid gap-4">
            <h4 className="leading-none text-sm mb-1">Manage chat room</h4>
            <div className="space-x-2">
              <EditRoomDialog
                room={props.room}
                isOpen={isEditDialogOpen}
                onOpenChange={setEditDialogOpen}
              >
                <Button size="sm" variant="secondary">
                  <PencilIcon className="h-4" />
                  <span className="font-medium mx-1">Edit</span>
                </Button>
              </EditRoomDialog>

              <RemoveRoomDialog
                room={props.room}
                isOpen={isRemoveDialogOpen}
                onOpenChange={setRemoveDialogOpen}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRemoveDialogOpen(true)}
                >
                  <Trash2Icon className="h-4" />
                  <span className="font-medium mx-1">Remove</span>
                </Button>
              </RemoveRoomDialog>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
