import { Comment } from "@/types/models/comments";
import { Card } from "@/components/ui/card";
import ManagedCommentCardParts from "@/pages/manage-rooms/components/comments/ManagedCommentCardParts";

type PendingCommentProps = {
  comment: Comment;
  canPost: boolean;
  canBlock: boolean;
  onCommentPosted: (commentId: string, content: string) => void;
  onCommentBlocked: (commentId: string) => void;
};

export default function PendingComment(props: PendingCommentProps) {
  return (
    <Card className="py-3 px-5 sm:min-w-64 min-h-20 shadow-md dark:bg-muted/30 border-border h-full w-full">
      <div className="lg:grid lg:grid-cols-12 flex flex-col md:gap-2 gap-3">
        <ManagedCommentCardParts.CardDetails comment={props.comment} />
        <ManagedCommentCardParts.CardContent comment={props.comment} />
        <ManagedCommentCardParts.PendingCommentActions {...props} />
      </div>
    </Card>
  );
}
