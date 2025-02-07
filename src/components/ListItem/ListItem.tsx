import Image from "next/image";
import testImg from "@/images/auth_main_img.png";
import Person from "@/images/person.svg";
import Button from "@/components/Button";
import MeetingStatusChip from "@/components/ListItem/MeetingStatusChip";

export default function ListItem() {
  return (
    <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
      <Image
        src={testImg}
        alt="모임 이미지"
        width={280}
        height={156}
        className="h-[156px] w-full max-w-[311px] rounded-3xl md:w-[280px]"
      />
      {/* 모임 정보 **/}
      <div className="flex flex-col">
        <div className="mb-[11px] flex gap-2">
          <MeetingStatusChip styleType="upcoming">이용 예정</MeetingStatusChip>
          <MeetingStatusChip styleType="confirmed">개설확정</MeetingStatusChip>
          <MeetingStatusChip styleType="waiting">개설 대기</MeetingStatusChip>
          <MeetingStatusChip styleType="completed">이용 완료</MeetingStatusChip>
        </div>
        <div className="mb-[5px] flex w-full max-w-[311px] items-center md:max-w-max">
          <span className="text-lg font-semibold">
            달램핏 오피스 스트레칭 | <span className="text-sm">을지로 3가</span>
          </span>
        </div>
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span>1월 7일 · 17:30 </span>
          <div className="flex items-center gap-[2px] text-gray-700">
            <Person />
            <span>20/20</span>
          </div>
        </div>
        <div>
          <Button className="w-[120px]" size="sm" styleType="outline">
            예약 취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}

type MeetingLocationProps = {
  location: "건대입구" | "을지로 3가" | "신림" | "홍대입구";
  meetingType: "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
};
ListItem.MeetingLocation = ({ location, meetingType }: MeetingLocationProps) => {
  const meetingTypes = {
    OFFICE_STRETCHING: "달램핏 오피스 스트레칭",
    MINDFULNESS: "달램핏 마인드풀니스",
    WORKATION: "워케이션",
  };
  return (
    <div className="mb-[5px] flex w-full max-w-[311px] items-center md:max-w-max">
      <span className="text-lg font-semibold">
        {meetingTypes[meetingType]} | <span className="text-sm">{location}</span>
      </span>
    </div>
  );
};
