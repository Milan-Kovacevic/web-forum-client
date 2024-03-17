import { useAppSelector } from "@/hooks/useRedux";
import { Comment } from "@/types/models/comments";
import { useState } from "react";
import EditCommentDialog from "./EditCommentDialog";
import { Button } from "../ui/button";
import {
  CircleSlash2Icon,
  MessageCirclePlusIcon,
  MessageCircleXIcon,
  PenLineIcon,
  Trash2Icon,
} from "lucide-react";
import { RoleDictionary } from "@/utils/constants";
import { formatDateDistance } from "@/utils/utility";
import ConfirmAlertDialog from "../primitives/ConfirmAlertDialog";

type ManagedCommentCardProps = {
  comment: Comment;
};
type PendingCommentActionsProps = {
  comment: Comment;
  canPost: boolean;
  canBlock: boolean;
  onCommentPosted: (commentId: string, updatedContent: string) => void;
  onCommentBlocked: (commentId: string) => void;
};
type PostedCommentActionsProps = {
  comment: Comment;
  canRemove: boolean;
  canEdit: boolean;
  onCommentRemoved: (commentId: string) => void;
  onCommentEdited: (commentId: string, content: string) => void;
};

const CardDetails = (props: ManagedCommentCardProps) => (
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

    <CardDetailsItem
      valueKey="Created:"
      value={formatDateDistance(props.comment.dateCreated)}
    />
    <CardDetailsItem
      valueKey="Edited:"
      value={
        (props.comment.dateUpdated &&
          formatDateDistance(props.comment.dateUpdated)) ??
        null
      }
      optionalValue="Never"
    />
    <CardDetailsItem
      valueKey="Posted:"
      value={
        (props.comment.datePosted &&
          formatDateDistance(props.comment.datePosted)) ??
        null
      }
      optionalValue="Not Posted Yet"
    />
  </div>
);

const CardContent = (props: ManagedCommentCardProps) => {
  return (
    <div className="col-span-6 flex flex-col gap-1">
      <p className="text-muted-foreground text-sm">Message:</p>
      <p className="text-accent-foreground text-xs">{props.comment.content}</p>
    </div>
  );
};

export const PostedCommentActions = (props: PostedCommentActionsProps) => {
  const [removeAlertOpen, setRemoveAlertOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const { loadingPostedComments } = useAppSelector((state) => state.manageRoom);

  const handleRemoveComment = () => {
    setRemoveAlertOpen(false);
    props.onCommentRemoved(props.comment.commentId);
  };

  const handleEditComment = (content: string) => {
    setEditDialogOpen(false);
    props.onCommentEdited(props.comment.commentId, content);
  };

  return (
    <div className="col-start-13 col-end-13 flex flex-col gap-1.5">
      <EditCommentDialog
        isOpen={editDialogOpen}
        isLoading={loadingPostedComments}
        onOpenChange={setEditDialogOpen}
        originalComment={props.comment}
        onSubmit={handleEditComment}
        title="Edit chat comment"
        subtitle="Enter a new message. Click save changes when you're done."
      >
        <Button
          disabled={!props.canEdit}
          size="sm"
          variant="secondary"
          className="h-8 px-3 mt-1 w-full"
        >
          {props.canEdit ? (
            <PenLineIcon className="h-4 w-4 text-card-foreground/80" />
          ) : (
            <CircleSlash2Icon className="h-4 w-4 text-card-foreground/80" />
          )}
        </Button>
      </EditCommentDialog>

      <ConfirmAlertDialog
        isLoading={loadingPostedComments}
        isOpen={removeAlertOpen}
        onOpenChange={setRemoveAlertOpen}
        onConfirm={handleRemoveComment}
        title="Are you absolutely sure?"
        subtitle="This action cannot be undone. This will permanently delete selected comment."
      >
        <Button
          disabled={!props.canRemove}
          size="sm"
          variant="secondary"
          className="h-8 px-3 w-full"
        >
          {props.canRemove ? (
            <Trash2Icon className="h-4 w-4 text-card-foreground/80" />
          ) : (
            <CircleSlash2Icon className="h-4 w-4 text-card-foreground/80" />
          )}
        </Button>
      </ConfirmAlertDialog>
    </div>
  );
};

export const PendingCommentActions = (props: PendingCommentActionsProps) => {
  const [removeAlertOpen, setRemoveAlertOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const { loadingPostedComments, loadingPendingComments } = useAppSelector(
    (state) => state.manageRoom
  );

  const handlePostComment = (content: string) => {
    setRemoveAlertOpen(false);
    props.onCommentPosted(props.comment.commentId, content);
  };

  const handleBlockComment = () => {
    setEditDialogOpen(false);
    props.onCommentBlocked(props.comment.commentId);
  };

  return (
    <div className="col-start-13 col-end-13 flex flex-col gap-1.5">
      <EditCommentDialog
        isOpen={editDialogOpen}
        isLoading={loadingPendingComments}
        onOpenChange={setEditDialogOpen}
        originalComment={props.comment}
        onSubmit={handlePostComment}
        title="Approve room comment"
        subtitle="Optionally update the comment message. Click save changes when you're done."
      >
        <Button
          disabled={!props.canPost}
          size="sm"
          variant="secondary"
          className="h-8 px-3 mt-1 w-full"
        >
          {props.canPost ? (
            <MessageCirclePlusIcon className="h-5 w-5 text-card-foreground/80" />
          ) : (
            <CircleSlash2Icon className="h-5 w-5 text-card-foreground/80" />
          )}
        </Button>
      </EditCommentDialog>

      <ConfirmAlertDialog
        isLoading={loadingPostedComments}
        isOpen={removeAlertOpen}
        onOpenChange={setRemoveAlertOpen}
        onConfirm={handleBlockComment}
        title="Are you absolutely sure?"
        subtitle="This action will block/reject the selected comment."
      >
        <Button
          disabled={!props.canBlock}
          size="sm"
          variant="secondary"
          className="h-8 px-3 w-full"
        >
          {props.canBlock ? (
            <MessageCircleXIcon className="h-5 w-5 text-card-foreground/80" />
          ) : (
            <CircleSlash2Icon className="h-5 w-5 text-card-foreground/80" />
          )}
        </Button>
      </ConfirmAlertDialog>
    </div>
  );
};

type CardDetailsItemProps = {
  valueKey: string;
  value: string | null;
  optionalValue?: string;
};

const CardDetailsItem = (props: CardDetailsItemProps) => {
  return (
    <div className="flex flex-row gap-2">
      <span className="text-xs text-muted-foreground w-16">
        {props.valueKey}
      </span>
      {props.value != null && (
        <p className="font-medium text-accent-foreground/80 text-xs">
          {props.value}
        </p>
      )}
      {props.value == null && props.optionalValue && (
        <p className="italic text-xs text-muted-foreground">
          {props.optionalValue}
        </p>
      )}
    </div>
  );
};

export default {
  CardDetails,
  CardContent,
  PendingCommentActions,
  PostedCommentActions,
};
