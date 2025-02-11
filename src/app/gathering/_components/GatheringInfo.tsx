"use client";

import LikeButton from "@/components/LikeButton";
import ChipInfo from "@/components/ChipInfo";
import ProgressBar from "@/components/ProgressBar";
import GatheredProfiles from "@/app/gathering/_components/GatheredProfiles";
import Check from "@/images/check.svg";

export type GatheringProps = {
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  count: number;
  capacity: number;
};

export default function GatheringInfo({ name, dateTime, location, count, capacity }: GatheringProps) {
  const MIN_COUNT = 5;

  const handleClickFavorite = () => {
    // TODO: 찜 클릭 로컬 스토리지 로직 구현
  };

  return (
    <div className="h-auto w-full rounded-3xl border-2 border-gray-200 bg-white">
      <div className="flex justify-between p-6">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="mb-3">{location}</div>
          <ChipInfo dateTime={dateTime} />
        </div>
        <LikeButton onClick={handleClickFavorite} isClosed={false} />
      </div>

      <hr className="border-2 border-dashed" />

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-gray-900">모집정원 {count}명</div>
            <GatheredProfiles count={count} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
              <Check alt={"확정 아이콘"} className="text-white" />
            </div>
            <div className="whitespace-nowrap text-sm font-medium text-orange-500">개설확정</div>
          </div>
        </div>

        <ProgressBar progress={(count / capacity) * 100} />
        <div className="mt-2 flex justify-between text-xs font-medium text-gray-700">
          <div>최소인원 {MIN_COUNT}명</div>
          <div>최대인원 {capacity}명</div>
        </div>
      </div>
    </div>
  );
}
