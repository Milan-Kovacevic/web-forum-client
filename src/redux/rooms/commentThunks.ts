import commentsService from "@/services/comments-service";
import {
  CreateCommentInput,
  EditCommentInput,
  PostCommentInput,
} from "@/types/inputs/comment-inputs";
import { ReduxThunksTypeNames } from "@/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadPendingRoomComments = createAsyncThunk(
  "loadPendingComments/singleRoom",
  (roomId: string) => {
    return commentsService.getPendingRoomComments(roomId);
  }
);

export const loadPostedRoomComments = createAsyncThunk(
  "loadPostedComments/singleRoom",
  (roomId: string) => {
    return commentsService.getPostedRoomComments(roomId);
  }
);

export const getUserCommentsForRoom = createAsyncThunk(
  `getCommentsForRoom/${ReduxThunksTypeNames.ROOM_DETAILS}/${ReduxThunksTypeNames.COMMENTS}`,
  (roomId: string) => {
    return commentsService.getUserCommentsForRoom(roomId);
  }
);

export const createNewRoomComment = createAsyncThunk(
  `createNewRoomComment/${ReduxThunksTypeNames.ROOM_DETAILS}/${ReduxThunksTypeNames.COMMENTS}`,
  (input: CreateCommentInput) => {
    return commentsService.createNewComment(input);
  }
);

export const editRoomComment = createAsyncThunk(
  `editRoomComment/${ReduxThunksTypeNames.ROOM_DETAILS}/${ReduxThunksTypeNames.COMMENTS}`,
  (input: EditCommentInput) => {
    return commentsService.editComment(input);
  }
);

export const removeRoomComment = createAsyncThunk(
  `removeRoomComment/${ReduxThunksTypeNames.ROOM_DETAILS}/${ReduxThunksTypeNames.COMMENTS}`,
  (commentId: string) => {
    return commentsService.removeComment(commentId).then(() => commentId);
  }
);

export const removeAnyRoomComment = createAsyncThunk(
  "removeRoomComment/singleRoom",
  (commentId: string) => {
    return commentsService.removeComment(commentId);
  }
);

export const editAnyRoomComment = createAsyncThunk(
  "editAnyRoomComment/singleRoom",
  (input: EditCommentInput) => {
    return commentsService.editComment(input);
  }
);

export const approveRoomComment = createAsyncThunk(
  "approveRoomComment/singleRoom",
  (input: PostCommentInput) => {
    return commentsService.postComment(input);
  }
);

export const blockRoomComment = createAsyncThunk(
  "blockRoomComment/singleRoom",
  (commentId: string) => {
    return commentsService.blockComment(commentId);
  }
);
