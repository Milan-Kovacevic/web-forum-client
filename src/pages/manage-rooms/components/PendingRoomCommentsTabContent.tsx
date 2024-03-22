import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ItemLoader from "@/components/primitives/ItemLoader";
import { PermissionDictionary } from "@/utils/constants";
import {
  approveRoomComment,
  blockRoomComment,
  loadPendingRoomComments,
  loadPostedRoomComments,
} from "@/redux/rooms/commentThunks";
import { useEffect } from "react";
import { clearManageRoomAction } from "@/redux/rooms/manageRoomSlice";
import { Comment } from "@/types/models/comments";
import PendingComment from "@/pages/manage-rooms/components/comments/PendingComment";

export default function PendingRoomCommentsTabContent() {
  const {
    pendingComments,
    loadingPendingComments,
    managedAction,
    managedRoom,
  } = useAppSelector((state) => state.manageRoom);
  const dispatch = useAppDispatch();

  const handleBlockComment = (commentId: string) => {
    dispatch(blockRoomComment(commentId));
  };

  const handlePostComment = (commentId: string, updatedContent: string) => {
    dispatch(
      approveRoomComment({
        commentId: commentId,
        updatedContent: updatedContent,
      })
    );
  };

  useEffect(() => {
    if (!managedAction || !managedRoom) return;
    if (managedAction === "Block" || managedAction === "Post") {
      dispatch(loadPendingRoomComments(managedRoom?.roomId));
      dispatch(loadPostedRoomComments(managedRoom?.roomId));
      dispatch(clearManageRoomAction());
    }
  }, [managedAction]);

  return (
    <TabsContent value="pending">
      <div className="flex flex-col gap-3 px-1 py-2">
        {pendingComments.length == 0 && !loadingPendingComments && (
          <NoPendingComments />
        )}
        {loadingPendingComments ? (
          <PendingCommentsLoader />
        ) : (
          <PendingCommentsList
            items={pendingComments}
            onCommentBlocked={handleBlockComment}
            onCommentPosted={handlePostComment}
          />
        )}
      </div>
    </TabsContent>
  );
}

type PendingCommentsListProps = {
  items: Comment[];
  onCommentBlocked: (commentId: string) => void;
  onCommentPosted: (commentId: string, content: string) => void;
};

const PendingCommentsList = (props: PendingCommentsListProps) => {
  const roomPermissions = useAppSelector(
    (state) => state.manageRoom.roomPermissions
  );

  var canPostComment =
    roomPermissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "PostComment"
    ) !== undefined;
  var canBlockComment =
    roomPermissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "BlockComment"
    ) !== undefined;

  return props.items.map((item) => (
    <PendingComment
      key={item.commentId}
      comment={item}
      canPost={canPostComment}
      canBlock={canBlockComment}
      onCommentPosted={props.onCommentPosted}
      onCommentBlocked={props.onCommentBlocked}
    />
  ));
};

const NoPendingComments = (): JSX.Element => (
  <div className="ml-2 mt-1 text-sm text-accent-foreground italic">
    There are no pending comments to show...
  </div>
);

const PendingCommentsLoader = (): JSX.Element => (
  <div className="w-full h-[200px]">
    <ItemLoader />
  </div>
);
