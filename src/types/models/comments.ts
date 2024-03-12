export type Comment = {
  commentId: string;
  content: string;
  dateCreated: string;
  dateUpdated?: string;
  datePosted?: string;
  userId: string;
  userDisplayName: string;
  roleId: number;
};
