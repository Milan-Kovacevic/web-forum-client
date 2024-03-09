import { UseFormReturn } from "react-hook-form";
import { SubmitRoomFormSchema } from "../../schemas/submit-room-form-schema";
import { Form } from "@/components/ui/form";
import FormInputFieldItem from "@/components/primitives/FormInputFieldItem";
import FormTextareaFieldItem from "@/components/primitives/FormTextareaFieldItem";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/primitives/Icons";

type SubmitRoomFormProps = {
  form: UseFormReturn<Zod.infer<typeof SubmitRoomFormSchema>>;
  onFormSubmit: (data: Zod.infer<typeof SubmitRoomFormSchema>) => void;
  isLoading: boolean;
};

export default function SubmitRoomForm(props: SubmitRoomFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onFormSubmit)}
        className="flex gap-3 flex-col w-full justify-center"
      >
        <div className="grid gap-2 py-4">
          <FormInputFieldItem
            className="col-span-3"
            control={props.form.control}
            display="Name"
            name="name"
            placeholder="room name"
          />
          <FormTextareaFieldItem
            className="col-span-3"
            control={props.form.control}
            display="Description"
            name="description"
            description="Enter a short description about room topic"
            placeholder="room description"
          />
        </div>

        <DialogFooter>
          <Button
            disabled={props.isLoading}
            variant="default"
            size="sm"
            type="submit"
          >
            {props.isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
