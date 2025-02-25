import Alarm from "@/images/alarm.svg";
import { format, formatISO, isBefore, isToday, differenceInDays, parseISO } from "date-fns";

type TagProps = {
  registrationEnd: string; // 모집 마감 날짜를 받음
};

export default function Tag({ registrationEnd }: TagProps) {
  const now = new Date();
  const nowUTC = parseISO(formatISO(now)); // 현재 시간을 UTC 형식으로 변환
  const endDate = parseISO(registrationEnd); // 문자열을 Date 객체로 변환

  let displayText = "";

  if (isToday(endDate)) {
    if (isBefore(endDate, nowUTC)) {
      // 현재 시간보다 마감 시간이 지났다면 "모집 마감" 출력
      displayText = "모집 마감";
    } else {
      // 시간이 남았다면
      const hours = format(endDate, "HH");
      const minutes = format(endDate, "mm");

      displayText = minutes === "00" ? `오늘 ${hours}시 마감` : `오늘 ${hours}시 ${minutes}분 마감`;
    }
  } else {
    // 날짜가 남았다면 "N일 후 마감"으로 표시
    const daysLeft = differenceInDays(endDate, now);

    displayText = `${daysLeft}일 후 마감`;
  }

  return (
    <div className="absolute right-0 top-0 flex h-8 items-center justify-center rounded-bl-lg rounded-tr-3xl bg-primary-color py-1 pl-2 pr-4 text-sm font-medium text-white md:rounded-tr-none lg:rounded-tr-none">
      <Alarm className="mt-0.5" />

      <span className="ml-1">{displayText}</span>
    </div>
  );
}
