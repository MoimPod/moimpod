import { format } from "date-fns";

export function formatSeoulTime(date: Date): string {
  // Asia/Seoul은 UTC+9
  const seoulDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return format(seoulDate, "yyyy-MM-dd'T'HH:mm:ss");
}
