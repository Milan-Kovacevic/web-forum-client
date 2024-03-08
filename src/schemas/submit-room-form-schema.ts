import { FieldValues } from "react-hook-form";
import { z as zod } from "zod";

const SubmitRoomFormSchema = zod.object({
  name: zod
    .string()
    .min(1, {
      message: "Room name is required.",
    })
    .max(128, {
      message: "Maximum room name length is 128",
    }),
  description: zod
    .string()
    .max(512, {
      message: "Maximum room description length is 512",
    })
    .optional(),
});

const SubmitRoomFormDefaultValues: FieldValues = {
  name: "",
  description: "",
};

export { SubmitRoomFormSchema, SubmitRoomFormDefaultValues };
