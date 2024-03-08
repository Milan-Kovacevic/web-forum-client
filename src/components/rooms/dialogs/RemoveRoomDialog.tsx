import { useRemoveRoom } from "@/api/hooks/useRooms";
import { Room } from "@/api/models/responses/rooms";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

type RemoveRoomDialogProps = {
  children: ReactNode;
  onRoomRemove: (room: Room) => void;
  room: Room;
};

export default function RemoveRoomDialog(props: RemoveRoomDialogProps) {
  const { removeRoom } = useRemoveRoom(props.room, props.onRoomRemove);

  const handleRoomRemove = async () => {
    await removeRoom();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete selected
            chat room and all comments in it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRoomRemove}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
