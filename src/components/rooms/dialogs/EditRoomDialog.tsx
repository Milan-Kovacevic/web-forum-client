import { useEditRoom } from "@/hooks/useRooms";
import { Room } from "@/models/responses/rooms";
import FormInputFieldItem from "@/components/primitives/FormInputFieldItem";
import FormTextareaFieldItem from "@/components/primitives/FormTextareaFieldItem";
import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SubmitRoomFormSchema } from "@/schemas/submit-room-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import SubmitRoomForm from "@/components/forms/SubmitRoomForm";

type EditRoomDialogProps = {
  room: Room;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onRoomEdited: (room?: Room) => void;
};

export default function EditRoomDialog(props: EditRoomDialogProps) {
  const { isLoading, editRoom } = useEditRoom(props.room.roomId);
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
    await editRoom(
      { ...formData, roomId: props.room.roomId },
      props.onRoomEdited
    );
  };

  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={props.onOpenChange}
      defaultOpen={!isLoading}
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
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
