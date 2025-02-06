// components/Card/Card.tsx

import React from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ChipInfo from "./ChipInfo";
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
    <div className="m-3 items-center gap-4 rounded-3xl border-0 p-4 shadow md:flex lg:flex">
      {/* 카드 이미지 */}
      <Image
        src={testCard}
        alt={"test 이미지"}
        width={280}
        height={156}
        className="rounded-t-lg border-2 md:rounded-l-lg lg:rounded-l-lg"
      />
      {/* 카드 내용 */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{name} |</h2>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <ChipInfo dateTime={dateTime} registrationEnd={registrationEnd} />

        <p className="text-sm text-gray-500">
          {participantCount}/{capacity}
        </p>
        <div className="flex items-center gap-8">
          <ProgressBar progress={progress} />
          <button className="whitespace-nowrap font-semibold text-orange-500">Join Now</button>
        </div>
      </div>
    </div>
  );
}
