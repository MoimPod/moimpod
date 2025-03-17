import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const isPastDate = (date: string) => {
  return dayjs(date).tz("Asia/Seoul").isBefore(dayjs().tz("Asia/Seoul"));
};
