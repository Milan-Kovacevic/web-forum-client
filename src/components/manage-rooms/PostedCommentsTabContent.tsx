import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ManageCommentItem from "@/components/comments/ManageCommentItem";
import ItemLoader from "@/components/primitives/ItemLoader";
import { PermissionDictionary } from "@/utils/constants";
import {
  editRoomComment,
  loadPostedRoomComments,
  removeRoomComment,
} from "@/redux/rooms/commentThunks";
import { useEffect } from "react";
import { clearSingleRoomAction } from "@/redux/rooms/singleRoomSlice";
import { ScrollArea } from "@/components/ui/scroll-area";

type PostedCommentsTabContentProps = {
  value: string;
};

export default function PostedCommentsTabContent(
  props: PostedCommentsTabContentProps
) {
  const { comments, loadingComments, permissions, action, room } =
    useAppSelector((state) => state.singleRoom);
  const dispatch = useAppDispatch();

  var canRemoveComment =
    permissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "RemoveComment"
    ) !== undefined;
  var canEditComment =
    permissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "EditComment"
    ) !== undefined;

  const handleRemoveComment = (commentId: string) => {
    dispatch(removeRoomComment(commentId));
  };

  const handleEditComment = (commentId: string, content: string) => {
    dispatch(editRoomComment({ commentId: commentId, newContent: content }));
  };

  useEffect(() => {
    if (!action || !room) return;
    if (action === "Remove" || action === "Edit") {
      dispatch(loadPostedRoomComments(room?.roomId));
      dispatch(clearSingleRoomAction());
    }
  }, [action]);

  return (
    <TabsContent value={props.value}>
      <div className="flex flex-col gap-2.5 px-1 py-2">
        {comments.length == 0 && !loadingComments && (
          <div className="ml-2 mt-1 text-sm text-accent-foreground">
            There are no comments to show now
          </div>
        )}
        {loadingComments ? (
          <div className="w-full h-[200px]">
            <ItemLoader />
          </div>
        ) : (
          comments.map((item) => (
            <ManageCommentItem
              key={item.commentId}
              comment={item}
              canRemove={canRemoveComment}
              canEdit={canEditComment}
              onCommentRemove={handleRemoveComment}
              onCommentEdit={handleEditComment}
            />
          ))
        )}
      </div>
    </TabsContent>
  );
}
