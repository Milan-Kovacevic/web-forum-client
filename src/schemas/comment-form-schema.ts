import { FieldValues } from "react-hook-form";
import { z as zod } from "zod";

const COMMENT_SIZE: number = 400;
const CommentFormSchema = zod.object({
  content: zod
    .string()
    .min(1, {
      message: "Comment content is required.",
    })
    .max(COMMENT_SIZE, {
      message: `Maximum size of the comments is ${COMMENT_SIZE}`,
    }),
});

const CommentFormDefaultValues: FieldValues = {
  content: "",
};

export { CommentFormSchema, CommentFormDefaultValues };
