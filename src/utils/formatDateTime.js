import {
  formatDistanceToNow,
  format,
  isSameYear,
  differenceInDays,
} from "date-fns";
import { vi } from "date-fns/locale";

export function formatDateTime(date) {
  const now = new Date();

  console.log("differenceInDays", differenceInDays(now, date));

  if (differenceInDays(now, date) <= 7) {
    return formatDistanceToNow(date, { locale: vi, addSuffix: true });
  } else if (isSameYear(date, now)) {
    return format(date, "MMMM d", { locale: vi });
  } else {
    return format(date, "MMMM d, yyyy", { locale: vi });
  }
}
