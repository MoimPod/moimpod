import Check from "@/images/check.svg";
import { cn } from "@/utils/classnames";
import { HTMLAttributes } from "react";

// isCompleted가 true면 이용 완료
// isCompleted가 false면 이용 예정
// canceledAt이 truthy하면 취소
// participantCount가 >= 5 면 개설 확정
// participantCount가 <= 5 면 개설 대기

type MeetingStatusChipProps = {
  styleType: "upcoming" | "completed" | "confirmed" | "waiting";
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function MeetingStatusChip({ styleType, children, className, ...rest }: MeetingStatusChipProps) {
  const baseStyles = "break-keep rounded-3xl px-3 py-[6px] text-sm";

  const variantStyles = {
    upcoming: "bg-orange-100 text-orange-600",
    completed: "bg-gray-200 text-gray-500",
    confirmed: "flex items-center gap-1 border border-orange-100 bg-white text-orange-600",
    waiting: "border border-gray-200 bg-white text-gray-500",
  };
  return (
    <div className={cn(baseStyles, variantStyles[styleType], className)}>
      {styleType === "confirmed" && <Check />}
      {children}
    </div>
  );
}
