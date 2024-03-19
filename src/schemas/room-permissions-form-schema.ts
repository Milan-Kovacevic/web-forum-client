import { z as zod } from "zod";

const RoomPermissionsFormSchema = zod.object({
  CreateComment: zod.boolean(),
  EditComment: zod.boolean(),
  RemoveComment: zod.boolean(),
  PostComment: zod.boolean(),
  BlockComment: zod.boolean(),
});

export { RoomPermissionsFormSchema };
