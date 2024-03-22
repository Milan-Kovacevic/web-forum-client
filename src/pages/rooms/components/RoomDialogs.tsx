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
import { createRoom } from "@/redux/rooms/roomThunks";
import { Room } from "@/types/models/rooms";
import ConfirmAlertDialog from "@/components/primitives/ConfirmAlertDialog";
import { EditRoomInput } from "@/types/inputs/room-inputs";

type CreateRoomDialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

type EditRoomDialogProps = {
  room: Room;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onEditRoom: (input: EditRoomInput) => void;
};

type RemoveRoomDialogProps = {
  children: ReactNode;
  room: Room;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onRemoveRoom: (room: Room) => void;
};

const CreateRoom = (props: CreateRoomDialogProps) => {
  const { loadingDialog } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();

  const createRoomForm = useForm<zod.infer<typeof SubmitRoomFormSchema>>({
    resolver: zodResolver(SubmitRoomFormSchema),
    defaultValues: SubmitRoomFormDefaultValues,
  });

  const handleRoomCreate = async (
    formData: Zod.infer<typeof SubmitRoomFormSchema>
  ) => {
    await dispatch(createRoom({ ...formData })).then(() => {
      props.onOpenChange(false);
    });
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
};

const EditRoom = (props: EditRoomDialogProps) => {
  const { loadingDialog } = useAppSelector((state) => state.rooms);

  const editRoomForm = useForm<Zod.infer<typeof SubmitRoomFormSchema>>({
    resolver: zodResolver(SubmitRoomFormSchema),
    defaultValues: {
      name: props.room.name,
      description: props.room.description,
    },
  });

  const handleSaveRoomChanges = (
    formData: Zod.infer<typeof SubmitRoomFormSchema>
  ) => {
    props.onEditRoom({ ...formData, roomId: props.room.roomId });
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
          <DialogTitle className="text-xl">Edit Chat Room</DialogTitle>
          <DialogDescription>
            Enter a new chat room information. Click save when you're done.
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
};

const RemoveRoom = (props: RemoveRoomDialogProps) => {
  const { loadingDialog } = useAppSelector((state) => state.rooms);

  const handleRemoveConfirmed = async () => {
    props.onRemoveRoom(props.room);
  };

  return (
    <ConfirmAlertDialog
      isLoading={loadingDialog}
      children={props.children}
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onConfirm={handleRemoveConfirmed}
      title="Are you absolutely sure?"
      subtitle="This action cannot be undone. This will permanently delete selected chat room and all of its comments."
    />
  );
};

export default { CreateRoom, EditRoom, RemoveRoom };
