import commentsService from "@/services/comments-service";
import {
  CreateCommentInput,
  EditCommentInput,
} from "@/types/inputs/comment-inputs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadPostedRoomComments = createAsyncThunk(
  "loadPostedComments/singleRoom",
  (roomId: string) => {
    return commentsService.getPostedRoomComments(roomId);
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
