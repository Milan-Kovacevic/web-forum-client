import { useRemoveRoom } from "@/hooks/useRooms";
import { Room } from "@/models/responses/rooms";
import { Icons } from "@/components/primitives/Icons";
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
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type RemoveRoomDialogProps = {
  children: ReactNode;
  onRoomRemove: (room: Room) => void;
  room: Room;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function RemoveRoomDialog(props: RemoveRoomDialogProps) {
  const { isLoading, removeRoom } = useRemoveRoom(props.room);

  const handleRoomRemove = async () => {
    await removeRoom(props.onRoomRemove);
    props.onOpenChange(true);
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
            disabled={isLoading}
            onClick={handleRoomRemove}
            variant="default"
            size="sm"
            type="submit"
          >
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
