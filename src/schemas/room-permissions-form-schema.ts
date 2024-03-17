import { z as zod } from "zod";

const RoomPermissionsFormSchema = zod.object({
  createComment: zod.boolean(),
  editComment: zod.boolean(),
  removeComment: zod.boolean(),
  postComment: zod.boolean(),
  blockComment: zod.boolean(),
});

export { RoomPermissionsFormSchema };
