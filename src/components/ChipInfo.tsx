type ChipInfoProps = {
  dateTime: string;
};

export default function ChipInfo({ dateTime }: ChipInfoProps) {
  // 날짜를 "MM-DD" 형식으로 변환하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${month}월 ${day}일`;
  };

  // 시간를 "HH:MM" 형식으로 변환하는 함수
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex gap-2">
      <div className="h-6 w-[58px] rounded bg-gray-900">
        {/* 날짜 */}
        <div className="mt-1 text-center text-xs font-medium text-white">{formatDate(dateTime)}</div>
      </div>
      <div className="h-6 w-[58px] rounded bg-gray-900">
        {/* 시간 */}
        <div className="mt-1 text-center text-xs font-medium text-orange-500">{formatTime(dateTime)}</div>
      </div>
    </div>
  );
}
