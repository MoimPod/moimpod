import Image from "next/image";
import Heart from "@/images/heart.svg";
import Profile from "@/images/profile.svg";
import CapacityStatus from "@/components/CapacityStatus";
import { cn } from "@/utils/classnames";
import Check from "@/images/check.svg";

type ListItemProps = {
  children: React.ReactNode;
};

export default function ListItem({ children }: ListItemProps) {
  return (
    <div
      className={`flex w-full max-w-[311px] flex-col items-stretch gap-4 border-gray-300 py-6 md:max-w-none md:flex-row`}
    >
      {children}
    </div>
  );
}

type StatusChipProps = {
  styleType: "upcoming" | "completed" | "confirmed" | "waiting";
  children: React.ReactNode;
};
ListItem.StatusChip = ({ styleType, children }: StatusChipProps) => {
  const baseStyles = "break-keep rounded-3xl px-3 py-[6px] text-sm";

  const variantStyles = {
    upcoming: "bg-orange-100 text-orange-600",
    completed: "bg-gray-200 text-gray-500",
    confirmed: "flex items-center gap-1 border border-orange-100 bg-white text-orange-600",
    waiting: "border border-gray-200 bg-white text-gray-500",
  };
  return (
    <li className={cn(baseStyles, variantStyles[styleType])}>
      {styleType === "confirmed" && <Check />}
      {children}
    </li>
  );
};

type StatusProps = {
  isCompleted: boolean;
  participantCount: number;
};
ListItem.Status = ({ isCompleted, participantCount }: StatusProps) => {
  return (
    <ul className="flex gap-2">
      {isCompleted ? (
        <ListItem.StatusChip styleType="completed">이용 완료</ListItem.StatusChip>
      ) : (
        <>
          <ListItem.StatusChip styleType="upcoming">이용 예정</ListItem.StatusChip>
          <ListItem.StatusChip styleType={participantCount >= 5 ? "confirmed" : "waiting"}>
            {participantCount >= 5 ? "개설확정" : "개설대기"}
          </ListItem.StatusChip>
        </>
      )}
    </ul>
  );
};

type TitleProps = {
  subtitle: string;
  title: string;
};
ListItem.Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div className="flex w-full max-w-[311px] items-center gap-2 md:max-w-max">
      <span className="text-lg font-semibold text-gray-900">{title}</span>
      <span className="text-lg font-semibold text-gray-900">|</span>
      <span className="text-sm text-gray-700">{subtitle}</span>
    </div>
  );
};

type SubInfoProps = {
  date: string;
  participantCount: number;
  capacity: number;
};
ListItem.SubInfo = ({ date, participantCount, capacity }: SubInfoProps) => {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <div>{date}</div>
      <CapacityStatus participantCount={participantCount} capacity={capacity} />
    </div>
  );
};

type ScoreProps = {
  score: number;
};
ListItem.Score = ({ score }: ScoreProps) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: score }, (_, index) => (
        <Heart key={index} className="fill-red-600 stroke-none" />
      ))}
    </div>
  );
};

ListItem.Body = ({ children }: { children: React.ReactNode }) => {
  return <p className="w-full break-words text-sm text-gray-700">{children}</p>;
};

type ImageProps = {
  imageSrc: string;
};
ListItem.Image = ({ imageSrc }: ImageProps) => {
  return (
    <Image
      src={imageSrc}
      alt="모임 이미지"
      width={280}
      height={156}
      className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
    />
  );
};

type MetaInfoProps = {
  imageUrl?: string;
  primary?: string;
  secondary: string;
};
ListItem.MetaInfo = ({ imageUrl, primary, secondary }: MetaInfoProps) => {
  return (
    <div className="flex items-center text-xs text-gray-500">
      {primary && (
        <div className="flex items-center gap-2">
          {imageUrl ? (
            <Image alt="사용자 이미지" src={imageUrl} width="24" height="24" className="rounded-full" />
          ) : (
            <Profile width="24" height="24" />
          )}
          <span className="text-xs text-gray-700">{primary}</span>
          <span className="mr-3 text-xs text-gray-700">|</span>
        </div>
      )}
      <span className="text-xs text-gray-500">{secondary}</span>
    </div>
  );
};
