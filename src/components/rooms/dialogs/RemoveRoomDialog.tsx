import { Room } from "@/types/models/rooms";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { removeRoom } from "@/redux/rooms/roomsThunks";
import ConfirmALertDialog from "@/components/primitives/ConfirmAlertDialog";

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
    <ConfirmALertDialog
      isLoading={loadingDialog}
      children={props.children}
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onConfirm={handleRoomRemove}
      title="Are you absolutely sure?"
      subtitle="This action cannot be undone. This will permanently delete selected chat room and all of its comments."
    />
  );
}
