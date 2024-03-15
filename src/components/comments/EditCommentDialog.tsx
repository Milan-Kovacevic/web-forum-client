import { Comment } from "@/types/models/comments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import EditCommentForm from "../forms/EditCommentForm";
import { useForm } from "react-hook-form";
import { CommentFormSchema } from "@/schemas/comment-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type EditCommentDialogProps = {
  originalComment: Comment;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onSubmit: (content: string) => void;
};

export default function EditCommentDialog(props: EditCommentDialogProps) {
  const commentForm = useForm<Zod.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      content: props.originalComment.content,
    },
  });

  const handleCommentSend = (formData: Zod.infer<typeof CommentFormSchema>) => {
    props.onSubmit(formData.content);
  };
  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={props.onOpenChange}
      defaultOpen={false}
    >
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[460px] px-8 py-7">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit chat comment</DialogTitle>
          <DialogDescription>
            Enter a new message. Click save changes when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditCommentForm
          form={commentForm}
          isLoading={false}
          onCommentSend={handleCommentSend}
        />
      </DialogContent>
    </Dialog>
  );
}
