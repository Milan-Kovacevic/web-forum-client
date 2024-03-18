import { LoginProvider } from "@/types/models/application";
import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDateDistance = (date: string) => {
  return formatDistanceToNow(parseISO(date + "Z"), {
    addSuffix: true,
    includeSeconds: true,
  });
};

export const isValidLoginProvider = (
  provider: string
): provider is LoginProvider => {
  return (["GitHub", "Google", "Facebook"] as const).includes(
    provider as LoginProvider
  );
};
