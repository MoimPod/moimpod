type ChipInfoProps = {
  dateTime: string;
  registrationEnd: string;
};

export default function ChipInfo({ dateTime, registrationEnd }: ChipInfoProps) {
  // 날짜를 "MM-DD" 형식으로 변환하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${month}월 ${day}일`;
  };

  return (
    <div className="flex gap-2">
      <div className="h-[24px] w-[58px] rounded-sm bg-gray-900">
        {/* dateTime */}
        <div className="mt-1 text-center text-xs font-medium text-white">{formatDate(dateTime)}</div>
      </div>
      <div className="h-[24px] w-[58px] rounded-sm bg-gray-900">
        {/* registrationEnd */}
        <div className="mt-1 text-center text-xs font-medium text-orange-500">{formatDate(registrationEnd)}</div>
      </div>
    </div>
  );
}
