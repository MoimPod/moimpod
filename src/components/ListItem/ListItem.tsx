import Image from "next/image";
import testImg from "@/images/auth_main_img.png";
import Person from "@/images/person.svg";
import Button from "@/components/Button";
import MeetingStatusChip from "@/components/ListItem/MeetingStatusChip";
import Heart from "@/images/heart.svg";
import Profile from "@/images/profile.svg";

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
        {/* <div className="mb-[11px] flex gap-2">
          <MeetingStatusChip styleType="upcoming">이용 예정</MeetingStatusChip>
          <MeetingStatusChip styleType="confirmed">개설확정</MeetingStatusChip>
          <MeetingStatusChip styleType="waiting">개설 대기</MeetingStatusChip>
          <MeetingStatusChip styleType="completed">이용 완료</MeetingStatusChip>
        </div> */}
        <div className="flex gap-0.5">
          <Heart className="fill-red-600" />
          <Heart className="fill-red-600" />
          <Heart className="fill-red-600" />
          <Heart className="fill-red-600" />
          <Heart className="fill-red-600" />
        </div>
        <div className="mb-2">
          <p className="over w-full break-words text-sm text-gray-700">
            이 속성은 처음에 마이크로소프트에서 표준이 아니고 접두어가 없는 word-wrap으로 나왔고, 대부분 브라우저에서
            똑같은 이름으로 구현되었습니다. 요즘은 overflow-wrap으로 다시 지어지고, word-wrap은 동의어가 되었습니다.이
            속성은 처음에 마이크로소프트에서 표준이 아니고 접두어가 없는 word-wrap으로 나왔고, 대부분 브라우저에서
            똑같은 이름으로 구현되었습니다. 요즘은 overflow-wrap으로 다시 지어지고, word-wrap은 동의어가 되었습니다.
          </p>
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
        {/* <div>
          <Button className="w-[120px]" size="sm" styleType="outline">
            예약 취소하기
          </Button>
        </div> */}
        <div className="mb-2 flex w-full max-w-[311px] items-center md:max-w-max">
          <span className="text-xs text-gray-700">달램핏 오피스 스트레칭 이용 · 을지로 3가</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <Profile width="24" height="24" />
            <span>닉네임이에요~</span>
          </div>
          <span className="text-gray-700">|</span>
          <span>2024.12.14</span>
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

type MeetingDetailsProps = {
  dateTime: string;
  capacity: number;
  participantCount: number;
};
ListItem.MeetingDetails = ({ dateTime, capacity, participantCount }: MeetingDetailsProps) => {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return (
    <div className="mb-4 flex items-center gap-3 text-sm">
      <span>
        {month}월 {day}일 · {hours}:{minutes}
      </span>
      <div className="flex items-center gap-[2px] text-gray-700">
        <Person />
        <span>
          {participantCount}/{capacity}
        </span>
      </div>
    </div>
  );
};

type MeetingScoreProps = {
  score: number;
};
ListItem.MeetingScore = ({ score }: MeetingScoreProps) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: score }, (_, index) => (
        <Heart key={index} />
      ))}
    </div>
  );
};

type ReviewCommentProps = {
  comment: string;
};
ListItem.ReviewComment = ({ comment }: ReviewCommentProps) => {
  return (
    <div className="mb-2">
      <p className="over w-full break-words text-sm text-gray-700">{comment}</p>
    </div>
  );
};

type ReviewDate = {
  dateTime: string;
  username: string;
};
ListItem.ReviewInfo = ({ dateTime, username }: ReviewDate) => {
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString("ko-KR").replaceAll("-", ".");
  return (
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <div className="flex items-center gap-3">
        <Profile width="24" height="24" />
        <span>{username}</span>
      </div>
      <span className="text-gray-700">|</span>
      <span>{formattedDate}</span>
    </div>
  );
};

ListItem.ReviewLocation = ({ location, meetingType }: MeetingLocationProps) => {
  const meetingTypes = {
    OFFICE_STRETCHING: "달램핏 오피스 스트레칭",
    MINDFULNESS: "달램핏 마인드풀니스",
    WORKATION: "워케이션",
  };
  return (
    <div className="mb-2 flex w-full max-w-[311px] items-center md:max-w-max">
      <span className="text-xs text-gray-700">
        {meetingTypes[meetingType]} 이용 · {location}
      </span>
    </div>
  );
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
      className="h-[156px] w-full max-w-[311px] rounded-3xl md:w-[280px]"
    />
  );
};
