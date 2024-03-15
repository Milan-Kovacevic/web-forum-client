import { Comment } from "@/types/models/comments";
import { Card } from "@/components/ui/card";
import { formatDateDistance } from "@/utils/utility";
import { RoleDictionary } from "@/utils/constants";
import { Button } from "../ui/button";
import { CircleSlash2Icon, PenLineIcon, Trash2Icon } from "lucide-react";
import RemoveAlertDialog from "../primitives/RemoveAlertDialog";
import { useAppSelector } from "@/hooks/useRedux";
import { useState } from "react";
import EditCommentDialog from "./EditCommentDialog";

type ManageCommentItemProps = {
  comment: Comment;
  canRemove: boolean;
  canEdit: boolean;
  onCommentRemove: (commentId: string) => void;
  onCommentEdit: (commentId: string, content: string) => void;
};

export default function ManageCommentItem(props: ManageCommentItemProps) {
  const { loadingComments } = useAppSelector((state) => state.singleRoom);
  const [removeAlertOpen, setRemoveAlertOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleRemoveComment = () => {
    setRemoveAlertOpen(false);
    props.onCommentRemove(props.comment.commentId);
  };

  const handleEditComment = (content: string) => {
    setEditDialogOpen(false);
    props.onCommentEdit(props.comment.commentId, content);
  };

  return (
    <div>
      <div className="relative self-start h-full w-full">
        <Card className="py-3 px-5 h-auto sm:min-w-64 min-h-20 w-full shadow-md dark:bg-muted/30 border-border">
          <div className="lg:grid lg:grid-cols-12 flex flex-col md:gap-2 gap-3">
            <div className="flex flex-col gap-1 flex-wrap col-span-5">
              <div className="flex flex-row gap-2 items-center mb-1">
                <span className="font-medium row-start-1 row-end-2 text-xs text-muted-foreground w-16 self-end mb-0.5">
                  User info:
                </span>
                <div className="row-start-1 row-end-2 flex flex-row flex-wrap gap-0.5 items-center">
                  <p className="font-medium text-sm text-accent-foreground/80">
                    {props.comment.userDisplayName}
                  </p>
                  <span className="text-xs mt-0.5">
                    |{RoleDictionary[props.comment.roleId].name}
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <span className="font-medium text-xs text-muted-foreground w-16">
                  Created:
                </span>
                <p className="font-medium text-accent-foreground/80 text-xs">
                  {formatDateDistance(props.comment.dateCreated)}
                </p>
              </div>

              <div className="flex flex-row gap-2">
                <span className="text-xs text-muted-foreground w-16">
                  Edited:
                </span>
                {props.comment.dateUpdated ? (
                  <p className="font-medium text-accent-foreground/80 text-xs">
                    {formatDateDistance(props.comment.dateUpdated)}
                  </p>
                ) : (
                  <p className="italic text-xs text-muted-foreground">Never</p>
                )}
              </div>

              <div className="flex flex-row gap-2">
                <span className="font-medium text-xs text-muted-foreground w-16">
                  Posted:
                </span>
                {props.comment.datePosted ? (
                  <p className="text-accent-foreground/80 text-xs">
                    {formatDateDistance(props.comment.datePosted)}
                  </p>
                ) : (
                  <p className="italic text-xs text-muted-foreground">
                    Not Posted Yet
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-6 flex flex-col gap-1">
              <p className="text-muted-foreground text-sm">Message:</p>
              <p className="text-accent-foreground text-xs">
                {props.comment.content}
              </p>
            </div>
            <div className="col-start-13 col-end-13 flex flex-col gap-1.5">
              <EditCommentDialog
                isOpen={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                originalComment={props.comment}
                onSubmit={handleEditComment}
              >
                <Button
                  disabled={!props.canEdit}
                  size="sm"
                  variant="secondary"
                  className="h-8 px-3 mt-1"
                >
                  {props.canEdit ? (
                    <PenLineIcon className="h-4 w-4 text-card-foreground/80" />
                  ) : (
                    <CircleSlash2Icon className="h-4 w-4 text-card-foreground/80" />
                  )}
                </Button>
              </EditCommentDialog>

              <RemoveAlertDialog
                isLoading={loadingComments}
                isOpen={removeAlertOpen}
                onOpenChange={setRemoveAlertOpen}
                onConfirm={handleRemoveComment}
              >
                <Button
                  disabled={!props.canRemove}
                  size="sm"
                  variant="secondary"
                  className="h-8 px-3"
                >
                  {props.canRemove ? (
                    <Trash2Icon className="h-4 w-4 text-card-foreground/80" />
                  ) : (
                    <CircleSlash2Icon className="h-4 w-4 text-card-foreground/80" />
                  )}
                </Button>
              </RemoveAlertDialog>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
