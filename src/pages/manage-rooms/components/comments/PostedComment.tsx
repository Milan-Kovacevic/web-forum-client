import { Comment } from "@/types/models/comments";
import { Card } from "@/components/ui/card";
import ManagedCommentCardParts from "@/pages/manage-rooms/components/comments/ManagedCommentCardParts";

type PostedCommentProps = {
  comment: Comment;
  canRemove: boolean;
  canEdit: boolean;
  onCommentRemoved: (commentId: string) => void;
  onCommentEdited: (commentId: string, content: string) => void;
};

export default function PostedComment(props: PostedCommentProps) {
  return (
    <Card className="py-3 px-5 sm:min-w-64 min-h-20 shadow-md dark:bg-muted/30 border-border h-full w-full">
      <div className="lg:grid lg:grid-cols-12 flex flex-col md:gap-2 gap-3">
        <ManagedCommentCardParts.CardDetails comment={props.comment} />
        <ManagedCommentCardParts.CardContent comment={props.comment} />
        <ManagedCommentCardParts.PostedCommentActions {...props} />
      </div>
    </Card>
  );
}
