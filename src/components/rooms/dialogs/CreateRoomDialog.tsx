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
import SubmitRoomForm from "@/components/forms/SubmitRoomForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createRoom } from "@/redux/thunks/rooms-thunk";

type CreateRoomDialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function CreateRoomDialog(props: CreateRoomDialogProps) {
  const { loadingDialog } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();

  const createRoomForm = useForm<zod.infer<typeof SubmitRoomFormSchema>>({
    resolver: zodResolver(SubmitRoomFormSchema),
    defaultValues: SubmitRoomFormDefaultValues,
  });

  const handleRoomCreate = async (
    formData: Zod.infer<typeof SubmitRoomFormSchema>
  ) => {
    await dispatch(createRoom({ ...formData }));
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
          form={createRoomForm}
          onFormSubmit={handleRoomCreate}
          isLoading={loadingDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
