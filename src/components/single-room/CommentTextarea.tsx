import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { PermissionDictionary } from "@/utils/constants";
import { useEffect, useState } from "react";
import CommentForm from "../forms/CommentForm";
import { useForm } from "react-hook-form";
import {
  CommentFormDefaultValues,
  CommentFormSchema,
} from "@/schemas/comment-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loadPostedRoomComments,
  postNewRoomComment,
} from "@/redux/rooms/commentThunks";
import { clearSingleRoomAction } from "@/redux/rooms/singleRoomSlice";

export default function CommentTextarea() {
  const { loadingComments, permissions, room, action } = useAppSelector(
    (state) => state.singleRoom
  );
  const dispatch = useAppDispatch();
  const [canPostComment, setCanPostComment] = useState(false);
  const commentForm = useForm<Zod.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: CommentFormDefaultValues,
  });

  useEffect(() => {
    var canPost =
      permissions.find(
        (item) =>
          PermissionDictionary[item.permissionId].type == "CreateComment"
      ) !== undefined;
    setCanPostComment(canPost);
  }, [permissions]);

  useEffect(() => {
    if (!action || !room) return;
    if (action === "Create") {
      dispatch(loadPostedRoomComments(room?.roomId));
      dispatch(clearSingleRoomAction());
    }
  }, [action]);

  const handleCommentPosted = (
    formData: Zod.infer<typeof CommentFormSchema>
  ) => {
    if (!room) return;
    dispatch(
      postNewRoomComment({ roomId: room?.roomId, content: formData.content })
    );
    // commentForm.setFocus("content");
    commentForm.reset();
  };

  return (
    <div className="flex sm:flex-row flex-col items-center gap-2">
      <CommentForm
        form={commentForm}
        isDisabled={loadingComments || !canPostComment}
        isLoading={loadingComments}
        onCommentSend={handleCommentPosted}
      />
    </div>
  );
}
