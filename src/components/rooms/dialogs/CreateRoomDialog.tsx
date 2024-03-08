import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import {
  SubmitRoomFormDefaultValues,
  SubmitRoomFormSchema,
} from "@/schemas/submit-room-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInputFieldItem from "@/components/primitives/FormInputFieldItem";
import { ReactNode } from "react";
import { Icons } from "@/components/primitives/Icons";
import { useCreateRoom } from "@/api/hooks/useRooms";
import { Room } from "@/api/models/responses/rooms";

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
        <Form {...submitRoomForm}>
          <form
            onSubmit={submitRoomForm.handleSubmit(handleSaveRoomChanges)}
            className="flex gap-3 flex-col w-full justify-center"
          >
            <div className="grid gap-2 py-4">
              <FormInputFieldItem
                className="col-span-3"
                control={submitRoomForm.control}
                display="Name"
                name="name"
                placeholder="room name"
              />
              <FormInputFieldItem
                className="col-span-3"
                control={submitRoomForm.control}
                display="Description"
                name="description"
                description="Enter a short description about room topic"
                placeholder="room description"
              />
            </div>

            <DialogFooter>
              <Button
                disabled={isLoading}
                variant="default"
                size="sm"
                type="submit"
              >
                {isLoading && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
