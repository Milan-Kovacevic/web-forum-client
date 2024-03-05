import { FieldValues } from "react-hook-form";
import { z as zod } from "zod";

const LoginFormSchema = zod.object({
  username: zod
    .string()
    .min(1, {
      message: "Username is required.",
    })
    .max(32, {
      message: "Maximum username length is 32",
    }),
  password: zod
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .max(64, {
      message: "Maximum password length is 64",
    }),
});

const LoginFormDefaultValues: FieldValues = {
  username: "",
  password: "",
};

export { LoginFormSchema, LoginFormDefaultValues };
