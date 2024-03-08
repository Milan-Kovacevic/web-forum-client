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
import { RoomInput } from "@/services/types/inputs/room-inputs";

type SubmitRoomDialogContentProps = {
  onSaveChanges: (props: zod.infer<typeof SubmitRoomFormSchema>) => void;
  isDialogOpen: boolean;
  onDialogOpenChange: (value: boolean) => void;
  children: ReactNode;
  roomData?: RoomInput | null;
};

export default function SubmitRoomDialog(props: SubmitRoomDialogContentProps) {
  const submitRoomForm = useForm<zod.infer<typeof SubmitRoomFormSchema>>({
    resolver: zodResolver(SubmitRoomFormSchema),
    defaultValues:
      props.roomData == null
        ? SubmitRoomFormDefaultValues
        : {
            name: props.roomData!.name,
            description: props.roomData!.description,
          },
  });

  return (
    <Dialog
      open={props.isDialogOpen}
      onOpenChange={props.onDialogOpenChange}
      defaultOpen={true}
    >
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] px-8 py-7">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Chat Room</DialogTitle>
          <DialogDescription>
            Make changes to selected room. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...submitRoomForm}>
          <form
            onSubmit={submitRoomForm.handleSubmit(props.onSaveChanges)}
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
              <Button variant="default" size="sm" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
