export type CreateRoomRequest = {
  name: string;
  description?: string;
};

export type EditRoomRequest = {
  roomId: string;
  name: string;
  description?: string;
};
