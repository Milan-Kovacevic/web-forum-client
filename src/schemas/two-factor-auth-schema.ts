import { FieldValues } from "react-hook-form";
import { z as zod } from "zod";

const TwoFactorAuthSchema = zod.object({
  twoFactorCode: zod
    .string()
    .min(1, "Two factor code is required.")
    .length(6, "Two factor code is 6 characters long."),
});

const TwoFactorAuthFormDefaultValues: FieldValues = {
  twoFactorCode: "",
};

export { TwoFactorAuthSchema, TwoFactorAuthFormDefaultValues };
