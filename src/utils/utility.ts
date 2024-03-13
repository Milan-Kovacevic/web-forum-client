import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDateDistance = (date: string) => {
  return formatDistanceToNow(parseISO(date + "Z"), {
    addSuffix: true,
    includeSeconds: true,
  });
};
