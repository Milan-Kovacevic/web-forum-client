import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ItemLoader from "../../../components/primitives/ItemLoader";
import { PermissionDictionary } from "@/utils/constants";
import {
  editRoomComment,
  removeRoomComment,
} from "@/redux/rooms/commentThunks";
import RoomCommentType from "./RoomCommentType";

export default function RoomComments() {
  const { roomComments, loadingRoomComments, myPermissions } = useAppSelector(
    (state) => state.roomDetails
  );
  const { identity } = useAppSelector((state) => state.identity);
  const userId = identity?.userId;
  const dispatch = useAppDispatch();

  var canEditComment =
    myPermissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "EditComment"
    ) !== undefined;
  var canRemoveComment =
    myPermissions.find(
      (item) => PermissionDictionary[item.permissionId].type == "RemoveComment"
    ) !== undefined;

  const handleEditComment = (commentId: string, content: string) => {
    dispatch(editRoomComment({ commentId: commentId, newContent: content }));
  };

  const handleRemoveComment = (commentId: string) => {
    dispatch(removeRoomComment(commentId));
  };

  return (
    <ScrollArea className="h-screen mt-2">
      {loadingRoomComments ? (
        <ItemLoader className="w-full h-[300px]" />
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:gap-1 sm:px-2 h-full sm:mt-0 mt-2 px-1">
          {roomComments.length > 0 ? (
            roomComments.map((item) => {
              if (item.userId === userId)
                return (
                  <RoomCommentType.OwnUserComment
                    onCommentRemove={handleRemoveComment}
                    onCommentEdit={handleEditComment}
                    canEdit={canEditComment}
                    canRemove={canRemoveComment}
                    key={item.commentId}
                    comment={item}
                  />
                );
              else
                return (
                  <RoomCommentType.OtherUserComment
                    key={item.commentId}
                    comment={item}
                  />
                );
            })
          ) : (
            <NoCommentsDisplay />
          )}
        </div>
      )}
    </ScrollArea>
  );
}

const NoCommentsDisplay = () => (
  <div className="ml-2.5 italic">There are no comments to show now</div>
);
