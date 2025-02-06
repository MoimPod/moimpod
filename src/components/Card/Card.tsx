// components/Card/Card.tsx

import React from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ChipInfo from "./ChipInfo";
import Tag from "./Tag";
import testCard from "./testCard.png";

type CardProps = {
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
};

export default function Card({ name, location, dateTime, registrationEnd, participantCount, capacity }: CardProps) {
  const progress = capacity > 0 ? (participantCount / capacity) * 100 : 0;

  return (
    <div className="m-3 items-center rounded-3xl border-0 shadow md:flex md:h-[156px] lg:flex lg:h-[156px]">
      {/* 카드 이미지 */}
      <div className="relative">
        <Tag text="오늘 21시 마감" />
        <Image
          src={testCard}
          alt={"test 이미지"}
          width={280}
          height={156}
          className="h-[156px] w-full rounded-t-3xl border-2 md:w-[280px] md:rounded-l-3xl lg:w-[280px] lg:rounded-l-3xl"
        />
      </div>

      {/* 카드 내용 */}
      <div className="flex-1 pb-3 pl-6 pr-6 pt-4">
        {/* 모임 제목 */}
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-lg font-bold">{name} |</h2>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="ml-auto">❤️</p>
        </div>

        {/* 날짜 정보 */}
        <ChipInfo dateTime={dateTime} registrationEnd={registrationEnd} />

        {/* 인원 정보 */}
        <p className="mt-5 text-sm text-gray-500">
          {participantCount}/{capacity}
        </p>

        <div className="mb-3 flex items-center gap-x-5">
          <ProgressBar progress={progress} />
          <button className="mr-4 flex gap-1 whitespace-nowrap font-semibold text-orange-500">
            join now
            <Image src={"/images/card_arrow.svg"} alt={"화살표  ic"} width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
