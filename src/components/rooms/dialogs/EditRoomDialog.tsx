import { Room } from "@/types/models/rooms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitRoomFormSchema } from "@/schemas/submit-room-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import SubmitRoomForm from "@/components/forms/SubmitRoomForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { editRoom } from "@/redux/thunks/rooms-thunk";

type EditRoomDialogProps = {
  room: Room;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function EditRoomDialog(props: EditRoomDialogProps) {
  const { loadingDialog } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();

  const editRoomForm = useForm<Zod.infer<typeof SubmitRoomFormSchema>>({
    resolver: zodResolver(SubmitRoomFormSchema),
    defaultValues: {
      name: props.room.name,
      description: props.room.description,
    },
  });

  const handleSaveRoomChanges = async (
    formData: Zod.infer<typeof SubmitRoomFormSchema>
  ) => {
    await dispatch(editRoom({ ...formData, roomId: props.room.roomId }));
  };

  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={props.onOpenChange}
      defaultOpen={!loadingDialog}
    >
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[460px] px-8 py-7">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Chat Room</DialogTitle>
          <DialogDescription>
            Create a new room for conversation. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <SubmitRoomForm
          form={editRoomForm}
          onFormSubmit={handleSaveRoomChanges}
          isLoading={loadingDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
