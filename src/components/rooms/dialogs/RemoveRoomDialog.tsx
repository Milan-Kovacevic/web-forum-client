import { Room } from "@/types/models/rooms";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { removeRoom } from "@/redux/rooms/roomsThunks";
import RemoveAlertDialog from "@/components/primitives/RemoveAlertDialog";

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
    <RemoveAlertDialog
      isLoading={loadingDialog}
      children={props.children}
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onConfirm={handleRoomRemove}
    />
  );
}
