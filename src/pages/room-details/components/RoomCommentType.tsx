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
import { Textarea } from "@/components/ui/textarea";
import { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ConfirmAlertDialog from "@/components/primitives/ConfirmAlertDialog";
import { useAppSelector } from "@/hooks/useRedux";
import { formatDateDistance } from "@/utils/utility";
import { RoleDictionary } from "@/utils/constants";

type OwnUserCommentProps = {
  comment: Comment;
  canEdit: boolean;
  canRemove: boolean;
  onCommentRemove: (commentId: string) => void;
  onCommentEdit: (commentId: string, content: string) => void;
};

type OtherUserCommentProps = {
  comment: Comment;
};

const OwnUserComment = (props: OwnUserCommentProps) => {
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
    <div className="flex flex-col">
      <div className="flex flex-row w-full gap-1">
        <div className="flex gap-2 xl:w-10/12 lg:w-full md:w-5/6 w-full">
          <Avatar className="sm:block hidden text-sm ml-1 mt-4 w-11 h-11 rounded-full border shadow-md dark:border-none dark:bg-muted/40 border-secondary">
            <AvatarFallback className="dark:bg-accent/40 bg-accent">
              ME
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="mb-1 flex flex-wrap justify-between items-end self-start">
              <div className="flex gap-0 h-7 self-end">
                <p className="ml-1 text-sm font-normal text-accent-foreground/70 self-end">
                  {props.comment.userDisplayName}
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
                <ClockIcon className="h-2.5 w-2.5 mt-0.5" />
                <span className="text-xs font-medium text-accent-foreground/80">
                  {!props.comment.datePosted
                    ? formatDateDistance(props.comment.dateCreated)
                    : formatDateDistance(props.comment.datePosted)}
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
                      "w-full shadow-md dark:bg-accent/60 bg-accent border-secondary py-3 px-4 sm:min-w-64 min-h-20",
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
          {(props.canEdit || props.canRemove) && (
            <div className="flex flex-col self-end sm:mb-1 gap-1 w-10 -ml-1">
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
                <ConfirmAlertDialog
                  isLoading={loadingComments}
                  isOpen={removeAlertOpen}
                  onOpenChange={setRemoveAlertOpen}
                  onConfirm={handleRemoveComment}
                  title="Are you absolutely sure?"
                  subtitle="This action cannot be undone. This will permanently delete selected comment."
                >
                  <Button
                    disabled={!props.canRemove}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-3"
                  >
                    <Trash2Icon className="h-4 w-4 text-card-foreground/80" />
                  </Button>
                </ConfirmAlertDialog>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="self-start sm:ml-16 ml-2">
        <span className="text-xs text-muted-foreground">Edited ~ </span>
        {props.comment.dateUpdated ? (
          <span className="text-xs font-medium text-accent-foreground/80">
            {formatDateDistance(props.comment.dateUpdated)}
          </span>
        ) : (
          <span className="text-xs font-medium">Never</span>
        )}
      </div>
    </div>
  );
};

const OtherUserComment = (props: OtherUserCommentProps) => {
  const RoleType = RoleDictionary[props.comment.roleId].name;

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-start w-full">
        <div className="flex gap-2 xl:w-10/12 lg:w-full md:w-5/6 w-full">
          <Avatar className="sm:block hidden text-sm ml-1 mt-3.5 w-11 h-11 rounded-full border shadow-md border-border">
            <AvatarFallback className="dark:bg-muted/30 bg-background/80">
              <UserRoundIcon className="text-secondary-foreground h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="m-1 flex flex-wrap justify-between items-end self-start">
              <div className="flex items-center gap-1">
                <p className="ml-0.5 text-sm  text-secondary-foreground">
                  {props.comment.userDisplayName}
                </p>
                <span className="text-xs text-muted-foreground">|</span>
                <p className="text-accent-foreground text-xs">{RoleType}</p>
              </div>
              <div className="flex gap-1 items-center mr-2">
                <ClockIcon className="h-3 w-3" />
                <span className="text-xs">
                  {!props.comment.datePosted
                    ? "Unknown"
                    : formatDateDistance(props.comment.datePosted)}
                </span>
              </div>
            </div>

            <div className="relative self-start h-full w-full">
              <Card className="py-3 px-5 h-auto sm:min-w-64 min-h-20 w-full shadow-md dark:bg-muted/30">
                <p className="text-card-foreground/80 text-sm">
                  {props.comment.content}
                </p>
              </Card>
            </div>
          </div>
          <div className="flex flex-col self-end sm:mb-1 gap-1 w-11 -ml-0.5"></div>
        </div>
      </div>

      <div className="self-start sm:ml-16 ml-2">
        <span className="text-xs text-muted-foreground">Edited ~ </span>
        {props.comment.dateUpdated ? (
          <span className="text-xs font-medium">
            {formatDateDistance(props.comment.dateUpdated)}
          </span>
        ) : (
          <span className="text-xs font-medium text-accent-foreground/80">
            Never
          </span>
        )}
      </div>
    </div>
  );
};

export default { OtherUserComment, OwnUserComment };
