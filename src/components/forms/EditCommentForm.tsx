import { Form } from "@/components/ui/form";
import { CommentFormSchema } from "@/schemas/comment-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";
import { Button } from "../ui/button";
import { Icons } from "../primitives/Icons";
import FormTextareaFieldItem from "../primitives/FormTextareaFieldItem";

type EditCommentFormProps = {
  form: UseFormReturn<zod.infer<typeof CommentFormSchema>>;
  onCommentSend: (data: zod.infer<typeof CommentFormSchema>) => void;
  isLoading: boolean;
};

export default function EditCommentForm(props: EditCommentFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onCommentSend)}
        className=" w-full justify-center flex flex-col items-center gap-2 mt-2"
      >
        <FormTextareaFieldItem
          control={props.form.control}
          name="content"
          description="Enter the comment message"
          display="New Message"
          maxLength={400}
          className="my-2 space-y-2"
          inputClassName="w-full h-40 mt-1"
        />

        <Button
          size="sm"
          variant="default"
          className="self-end shadow-md"
          type="submit"
        >
          {props.isLoading && (
            <Icons.Spinner className="h-4 w-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
