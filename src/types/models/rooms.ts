export type Room = {
  roomId: string;
  name: string;
  dateCreated: string;
  description?: string;
};

export type RoomStats = {
  lastComment: string;
  totalComments: number;
  totalModerators: number;
};

export type RoomPermission = {
  permissionId: number;
  name: string;
};
