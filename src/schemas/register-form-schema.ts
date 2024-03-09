import { FieldValues } from "react-hook-form";
import { z as zod } from "zod";

const RegisterFormSchema = zod
  .object({
    username: zod
      .string()
      .min(6, "Username must have at least 6 characters.")
      .max(32, "Username has a maximum length of 32 characters")
      .regex(
        new RegExp(/^[\w.-]+$/),
        "Username can contain only letters, digits, dash, dot and underscore"
      ),
    displayName: zod
      .string()
      .min(5, "Display name must have at least 5 characters.")
      .max(64, "Display name has a maximum length of 64 characters"),
    email: zod
      .string()
      .min(1, {
        message: "E-mail is required.",
      })
      .email("Enter a valid e-mail address.")
      .max(128, "E-mail has a maximum length of 128 characters"),
    password: zod
      .string()
      .min(6, {
        message: "Password must have at least 6 characters.",
      })
      .max(128, "Password has a maximum length of 128 characters")
      .refine((x) => /\d/.test(x), "Password must contain at least one digit.")
      .refine(
        (x) => /[a-z]/.test(x),
        "Password must contain at least one lowercase letter."
      )
      .refine(
        (x) => /[A-Z]/.test(x),
        "Password must contain at least one uppercase letter."
      )
      .refine(
        (x) => /[^a-zA-Z\d]/.test(x),
        "Password must contain at least one special character."
      ),
    confirmPassword: zod.string().min(1, {
      message: "Please confirm the password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterFormDefaultValues: FieldValues = {
  username: "",
  email: "",
  displayName: "",
  password: "",
  confirmPassword: "",
};

export { RegisterFormSchema, RegisterFormDefaultValues };
