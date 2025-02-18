"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ChipInfo from "./ChipInfo";
import Tag from "./Tag";
import testCard from "../../public/images/testCard.png";
import { CardData } from "@/stores/useGateringStore";
import LikeButton from "./LikeButton";
import JoinArrow from "@/images/join_now_arrow.svg";

type CardProps = {
  id: number;
  name: string;
  location: string;
  dateTime: string;
  registrationEnd: string;
  participantCount: number;
  capacity: number;
  image: string;
};

export default function Card({
  id,
  name,
  location,
  dateTime,
  registrationEnd,
  participantCount,
  capacity,
  image,
}: CardProps) {
  const router = useRouter();

  const progress = capacity > 0 ? (participantCount / capacity) * 100 : 0;
  const isClosed = Boolean(registrationEnd && new Date(registrationEnd) < new Date()); //모집이 마감되었는지
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    router.push(`gathering/${id}`);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className="my-5 items-center rounded-3xl border-0 bg-white shadow md:flex md:h-[156px] lg:flex lg:h-[156px]"
    >
      {/* 카드 이미지 */}
      <div className="relative">
        <Tag registrationEnd={registrationEnd} />
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
          <LikeButton onClick={handleLikeClick} isLiked={isLiked} isClosed={isClosed} className="ml-auto" />
        </div>

        {/* 날짜 정보 */}
        <ChipInfo dateTime={dateTime} />

        {/* 인원 정보 */}
        <p className="mt-5 text-sm text-gray-500">
          {participantCount}/{capacity}
        </p>

        <div className="mb-3 flex items-center gap-x-5">
          <ProgressBar progress={progress} />
          {participantCount === capacity ? (
            <button className="mr-4 flex gap-1 whitespace-nowrap font-semibold text-sky-400">Closed</button>
          ) : (
            <button className="mr-4 flex gap-1 whitespace-nowrap font-semibold text-primary-color">
              join now
              <JoinArrow className="mt-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
