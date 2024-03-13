import { ScrollArea } from "@/components/ui/scroll-area";
import OtherUserComment from "@/components/comments/OtherUserComment";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import OwnUserComment from "@/components/comments/OwnUserComment";
import ItemLoader from "../primitives/ItemLoader";
import { PermissionDictionary } from "@/utils/constants";
import {
  editRoomComment,
  loadPostedRoomComments,
  removeRoomComment,
} from "@/redux/rooms/commentThunks";
import { useEffect } from "react";
import { clearSingleRoomAction } from "@/redux/rooms/singleRoomSlice";

export default function RoomComments() {
  const { comments, loadingComments, permissions, action, room } =
    useAppSelector((state) => state.singleRoom);
  const { identity } = useAppSelector((state) => state.identity);
  const userId = identity?.userId;
  const dispatch = useAppDispatch();

  var canEditComment =
    permissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "EditComment"
    ) !== undefined;
  var canRemoveComment =
    permissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "RemoveComment"
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
    <ScrollArea className="h-screen mt-2">
      {loadingComments ? (
        <div className="w-full h-[200px]">
          <ItemLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:gap-1 sm:px-2 h-full sm:mt-0 mt-2 px-1">
          {comments.length > 0 ? (
            comments.map((item) => {
              if (item.userId === userId)
                return (
                  <OwnUserComment
                    onCommentRemove={handleRemoveComment}
                    onCommentEdit={handleEditComment}
                    canEdit={canEditComment}
                    canRemove={canRemoveComment}
                    key={item.commentId}
                    comment={item}
                  />
                );
              else
                return <OtherUserComment key={item.commentId} comment={item} />;
            })
          ) : (
            <div className="ml-2">There are no comments to show now</div>
          )}
        </div>
      )}
    </ScrollArea>
  );
}
