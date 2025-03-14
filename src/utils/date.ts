import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const isPastDate = (date: string) => {
  return dayjs.utc(date).isBefore(dayjs.utc().add(9, "hour"));
};
