import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import {
  SubmitRoomFormDefaultValues,
  SubmitRoomFormSchema,
} from "@/schemas/submit-room-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useCreateRoom } from "@/hooks/useRooms";
import { Room } from "@/models/responses/rooms";
import SubmitRoomForm from "@/components/forms/SubmitRoomForm";

type CreateRoomDialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onRoomCreated: (room?: Room) => void;
};

export default function CreateRoomDialog(props: CreateRoomDialogProps) {
  const { isLoading, createRoom } = useCreateRoom();
  const submitRoomForm = useForm<zod.infer<typeof SubmitRoomFormSchema>>({
    resolver: zodResolver(SubmitRoomFormSchema),
    defaultValues: SubmitRoomFormDefaultValues,
  });

  const handleSaveRoomChanges = async (
    formData: Zod.infer<typeof SubmitRoomFormSchema>
  ) => {
    await createRoom({ ...formData }, props.onRoomCreated);
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
          form={submitRoomForm}
          onFormSubmit={handleSaveRoomChanges}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
