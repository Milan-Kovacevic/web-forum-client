import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { PermissionDictionary } from "@/utils/constants";
import { useEffect, useState } from "react";
import CommentForm from "../../../components/forms/CommentForm";
import { useForm } from "react-hook-form";
import {
  CommentFormDefaultValues,
  CommentFormSchema,
} from "@/schemas/comment-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { postNewRoomComment } from "@/redux/rooms/commentThunks";

export default function CommentInputTextarea() {
  const { loadingComments, permissions, room } = useAppSelector(
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

  const handleCommentPosted = (
    formData: Zod.infer<typeof CommentFormSchema>
  ) => {
    if (!room) return;
    dispatch(
      postNewRoomComment({ roomId: room?.roomId, content: formData.content })
    );
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
