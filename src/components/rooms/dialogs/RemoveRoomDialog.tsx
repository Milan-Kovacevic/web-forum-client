import { Room } from "@/types/models/rooms";
import { Icons } from "@/components/primitives/Icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { removeRoom } from "@/redux/rooms/roomThunks";

type RemoveRoomDialogProps = {
  children: ReactNode;
  room: Room;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function RemoveRoomDialog(props: RemoveRoomDialogProps) {
  const { loadingDialog } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();

  const handleRoomRemove = async () => {
    dispatch(removeRoom(props.room.roomId));
  };

  return (
    <AlertDialog open={props.isOpen} onOpenChange={props.onOpenChange}>
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
          <Button
            disabled={loadingDialog}
            onClick={handleRoomRemove}
            variant="default"
            size="sm"
            type="submit"
          >
            {loadingDialog && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
