import { Card } from "@/components/ui/card";
import {
  ClockIcon,
  PenLineIcon,
  SaveIcon,
  Trash2Icon,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import { Comment } from "@/types/models/comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { SetStateAction, useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import RemoveAlertDialog from "../primitives/RemoveAlertDialog";
import { useAppSelector } from "@/hooks/useRedux";

type MyCommentProps = {
  comment: Comment;
  canEdit: boolean;
  canRemove: boolean;
  onCommentRemove: (commentId: string) => void;
  onCommentEdit: (commentId: string, content: string) => void;
};

export default function MyComment(props: MyCommentProps) {
  const [isEditing, setEditing] = useState(false);
  const [removeAlertOpen, setRemoveAlertOpen] = useState(false);
  const [editContent, setEditContent] = useState(props.comment.content);
  const { loadingComments } = useAppSelector((state) => state.singleRoom);

  const handleEditComment = () => {
    if (!isEditing) {
      setEditing(true);
    } else if (editContent != "" && editContent.length < 400) {
      props.onCommentEdit(props.comment.commentId, editContent);
    }
  };

  const handleCancelEdit = () => {
    if (isEditing) {
      setEditContent(props.comment.content);
      setEditing(false);
    }
  };

  const handleRemoveComment = () => {
    setRemoveAlertOpen(false);
    props.onCommentRemove(props.comment.commentId);
  };

  const handleCommentContentChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditContent(event.target.value);
  };

  return (
    <div className="flex flex-row w-full gap-1">
      <div className="flex gap-2 xl:w-10/12 lg:w-11/12 md:w-5/6 w-full">
        <Avatar className="sm:block hidden text-sm ml-1 mt-4 w-11 h-11 rounded-full border shadow-md dark:border-none dark:bg-accent/20 bg-accent/10 border-secondary">
          <AvatarFallback className="dark:bg-muted/10">
            <UserRoundIcon className="text-secondary-foreground h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="mb-1 flex flex-wrap justify-between items-end self-start">
            <div className="flex items-center gap-0 h-7 self-end">
              <p className="ml-1 mb-0.5 text-xs font-medium text-secondary-foreground self-end">
                You: {props.comment.userDisplayName}
              </p>
              {isEditing && editContent !== props.comment.content && (
                <div className="ml-2 h-6 self-end">
                  <span className="text-xs">|</span>
                  <span className="text-xs font-medium text-primary">
                    {isEditing && editContent === ""
                      ? "Can't be empty..."
                      : "Not saved..."}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-1 items-center mr-2">
              <ClockIcon className="h-3 w-3" />
              <span className="text-xs">
                {!props.comment.datePosted
                  ? formatDistanceToNow(new Date(props.comment.dateCreated), {
                      addSuffix: true,
                      includeSeconds: true,
                    })
                  : formatDistanceToNow(new Date(props.comment.datePosted), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
              </span>
            </div>
          </div>
          <div className="relative self-start h-full">
            {!isEditing ? (
              <div className="relative">
                {!props.comment.datePosted && (
                  <div className="z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 animate-bounce rounded-full bg-primary mt-0.5"></span>
                    <p className="text-primary text-xs font-medium text-center sm:text-sm">
                      Waiting for comment approval...
                    </p>
                  </div>
                )}

                <Card
                  className={cn(
                    "w-full shadow-md dark:bg-accent/60 bg-accent border-secondary dark:border-primary py-3 px-4 sm:min-w-64 min-h-20",
                    !props.comment.datePosted
                      ? "opacity-10 border-primary border-2"
                      : ""
                  )}
                >
                  <p className="text-card-foreground/80 text-sm">
                    {props.comment.content}
                  </p>
                </Card>
              </div>
            ) : (
              <Textarea
                maxLength={400}
                onChange={handleCommentContentChange}
                value={editContent}
                className="text-card-foreground/80 text-sm w-full shadow-md dark:bg-accent/40 bg-accent/50 border-secondary dark:border-primary py-3 px-4 sm:min-w-64 min-h-20 flex-1 -mt-0.5 resize-none"
                placeholder="Write your comment..."
              />
            )}
          </div>
        </div>
      </div>
      {(props.canEdit || props.canRemove) && (
        <div className="flex flex-col self-start sm:mt-0 mt-6 sm:self-end sm:mb-0 gap-1">
          <Button
            disabled={!props.canEdit}
            size="sm"
            variant="ghost"
            className="h-8 px-3"
            onClick={handleEditComment}
          >
            {!isEditing ? (
              <PenLineIcon className="h-4 w-4 text-card-foreground/80" />
            ) : (
              <SaveIcon className="h-4 w-4 text-primary animate-pulse" />
            )}
          </Button>
          {isEditing ? (
            <Button
              disabled={!props.canEdit && !isEditing}
              size="sm"
              variant="ghost"
              className="h-8 px-3"
              onClick={handleCancelEdit}
            >
              {!isEditing ? (
                <Trash2Icon className="h-4 w-4 text-card-foreground/80" />
              ) : (
                <XIcon className="h-4 w-4 text-card-foreground/80" />
              )}
            </Button>
          ) : (
            <RemoveAlertDialog
              isLoading={loadingComments}
              isOpen={removeAlertOpen}
              onOpenChange={setRemoveAlertOpen}
              onConfirm={handleRemoveComment}
            >
              <Button
                disabled={!props.canRemove}
                size="sm"
                variant="ghost"
                className="h-8 px-3"
              >
                <Trash2Icon className="h-4 w-4 text-card-foreground/80" />
              </Button>
            </RemoveAlertDialog>
          )}
        </div>
      )}
    </div>
  );
}
