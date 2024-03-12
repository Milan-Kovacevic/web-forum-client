import { Comment } from "@/types/models/comments";
import { sendAxiosRequest } from "./base-service";
import { ApiEndpoints, RequestMethods } from "@/utils/constants";
import {
  CreateCommentInput,
  EditCommentInput,
} from "@/types/inputs/comment-inputs";

const getPostedRoomComments = async (roomId: string) => {
  return sendAxiosRequest<void, Comment[]>({
    url: ApiEndpoints.POSTED_ROOM_COMMENTS.replace("roomId", roomId),
    method: RequestMethods.GET,
    requireAuth: true,
  }).then((response) => response.data);
};

const createNewComment = async (input: CreateCommentInput) => {
  return sendAxiosRequest<CreateCommentInput, Comment>({
    url: ApiEndpoints.COMMENTS,
    method: RequestMethods.POST,
    requireAuth: true,
    data: input,
  }).then((response) => response.data);
};

const removeComment = async (commentId: string) => {
  return sendAxiosRequest<void, void>({
    url: ApiEndpoints.SINGLE_COMMENT.replace("{commentId}", commentId),
    method: RequestMethods.DELETE,
    requireAuth: true,
  }).then((response) => response.data);
};

const editComment = async (input: EditCommentInput) => {
  return sendAxiosRequest<EditCommentInput, Comment>({
    url: ApiEndpoints.SINGLE_COMMENT.replace("{commentId}", input.commentId),
    method: RequestMethods.PUT,
    requireAuth: true,
    data: input,
  }).then((response) => response.data);
};

export default {
  getPostedRoomComments,
  createNewComment,
  removeComment,
  editComment,
};
