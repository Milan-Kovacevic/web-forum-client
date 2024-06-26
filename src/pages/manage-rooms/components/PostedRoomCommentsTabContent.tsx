import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ItemLoader from "@/components/primitives/ItemLoader";
import { PermissionDictionary } from "@/utils/constants";
import {
  editAnyRoomComment,
  loadPostedRoomComments,
  removeAnyRoomComment,
} from "@/redux/rooms/commentThunks";
import { useEffect } from "react";
import { clearManageRoomAction } from "@/redux/rooms/manageRoomSlice";
import PostedComment from "@/pages/manage-rooms/components/comments/PostedComment";
import { Comment } from "@/types/models/comments";

export default function PostedRoomCommentsTabContent() {
  const { postedComments, loadingPostedComments, managedAction, managedRoom } =
    useAppSelector((state) => state.manageRoom);
  const dispatch = useAppDispatch();

  const handleRemoveComment = (commentId: string) => {
    dispatch(removeAnyRoomComment(commentId));
  };

  const handleEditComment = (commentId: string, content: string) => {
    dispatch(editAnyRoomComment({ commentId: commentId, newContent: content }));
  };

  useEffect(() => {
    if (!managedAction || !managedRoom) return;
    if (managedAction === "Remove" || managedAction === "Edit") {
      dispatch(loadPostedRoomComments(managedRoom?.roomId));
      dispatch(clearManageRoomAction());
    }
  }, [managedAction]);

  return (
    <TabsContent value="posted" className="h-full mb-36">
      <div className="flex flex-col gap-3 px-1 py-2">
        {postedComments.length == 0 && !loadingPostedComments && (
          <NoPostedComments />
        )}
        {loadingPostedComments ? (
          <PostedCommentsLoader />
        ) : (
          <PostedCommentsList
            items={postedComments}
            onCommentEdited={handleEditComment}
            onCommentRemoved={handleRemoveComment}
          />
        )}
      </div>
    </TabsContent>
  );
}

type PostedCommentsListProps = {
  items: Comment[];
  onCommentEdited: (commentId: string, content: string) => void;
  onCommentRemoved: (commentId: string) => void;
};

const PostedCommentsList = (props: PostedCommentsListProps) => {
  const roomPermissions = useAppSelector(
    (state) => state.manageRoom.roomPermissions
  );

  var canEditComment =
    roomPermissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "EditComment"
    ) !== undefined;
  var canRemoveComment =
    roomPermissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "RemoveComment"
    ) !== undefined;

  return props.items.map((item) => (
    <PostedComment
      key={item.commentId}
      comment={item}
      canEdit={canEditComment}
      canRemove={canRemoveComment}
      onCommentEdited={props.onCommentEdited}
      onCommentRemoved={props.onCommentRemoved}
    />
  ));
};

const NoPostedComments = (): JSX.Element => (
  <div className="ml-2 mt-1 text-sm text-accent-foreground italic">
    There are no posted comments to show...
  </div>
);

const PostedCommentsLoader = (): JSX.Element => (
  <div className="w-full h-[200px]">
    <ItemLoader />
  </div>
);
