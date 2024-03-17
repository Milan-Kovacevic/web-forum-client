export type ChangeUserAccountInput = {
  userId: string;
  isEnabled?: boolean;
  role?: number;
};

export type ChangeUserRoomPermissionsInput = {
  userId: string;
  roomId: string;
  permissions: number[];
};
