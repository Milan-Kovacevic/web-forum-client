export type CreateCommentInput = {
  roomId: string;
  content: string;
};

export type EditCommentInput = {
  commentId: string;
  newContent: string;
};
