import { CommentFormSchema } from "@/schemas/comment-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";
import {
  Form,
  FormControl,
  FormDefaultMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Icons } from "../primitives/Icons";
import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type CommentFormProps = {
  form: UseFormReturn<zod.infer<typeof CommentFormSchema>>;
  onCommentSend: (data: zod.infer<typeof CommentFormSchema>) => void;
  isLoading: boolean;
  isDisabled: boolean;
};

export default function CommentForm(props: CommentFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onCommentSend)}
        className=" w-full justify-center flex sm:flex-row flex-col items-center gap-2"
      >
        <FormField
          disabled={props.isDisabled}
          control={props.form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full space-y-1.5">
              <FormDefaultMessage className="text-xs w-full ml-2" />
              <FormControl>
                <Textarea
                  maxLength={500}
                  placeholder="Write your comment..."
                  className="pl-5 py-3 bg-card shadow-md max-h-24 rounded-xl flex-1 resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={props.isDisabled}
          size="sm"
          variant="default"
          className="self-end shadow-md"
          type="submit"
        >
          {props.isLoading ? (
            <Icons.Spinner className="h-4 w-4 animate-spin" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Form>
  );
}
