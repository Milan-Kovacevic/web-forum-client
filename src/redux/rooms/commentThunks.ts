import commentsService from "@/services/comments-service";
import {
  CreateCommentInput,
  EditCommentInput,
  PostCommentInput,
} from "@/types/inputs/comment-inputs";
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

export const loadUserCommentsForRoom = createAsyncThunk(
  "loadUserComments/singleRoom",
  (roomId: string) => {
    return commentsService.getUserCommentsForRoom(roomId);
  }
);

export const postNewRoomComment = createAsyncThunk(
  "postNewRoomComment/singleRoom",
  (input: CreateCommentInput) => {
    return commentsService.createNewComment(input);
  }
);

export const removeRoomComment = createAsyncThunk(
  "removeRoomComment/singleRoom",
  (commentId: string) => {
    return commentsService.removeComment(commentId);
  }
);

export const editRoomComment = createAsyncThunk(
  "editRoomComment/singleRoom",
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
