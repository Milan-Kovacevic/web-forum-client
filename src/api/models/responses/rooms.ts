export type Room = {
  roomId: string;
  name: string;
  description?: string;
};

export type RoomStats = {
  lastComment: string;
  totalComments: number;
  totalModerators: number;
};
