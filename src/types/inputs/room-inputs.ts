export type CreateRoomInput = {
  name: string;
  description?: string;
};

export type EditRoomInput = {
  roomId: string;
  name: string;
  description?: string;
};
