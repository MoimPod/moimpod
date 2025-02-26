"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { CardData } from "@/stores/useGatheringStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import ChipInfo from "./ChipInfo";
import Tag from "./Tag";
import AnimatedParticipantCount from "./AnimateParticipantCount";
import LikeButton from "./LikeButton";
import JoinArrow from "@/images/join_now_arrow.svg";
import ConfirmedStamp from "@/components/ConfirmedStamp";

export default function Card({
  id,
  name,
  location,
  dateTime,
  registrationEnd,
  participantCount,
  capacity,
  image,
}: CardData) {
  const router = useRouter();
  const { toggleFavorite, favorites } = useFavoritesStore();

  const progress = capacity > 0 ? (participantCount / capacity) * 100 : 0;
  const isClosed = Boolean(registrationEnd && new Date(registrationEnd) < new Date()); //모집이 마감되었는지

  const isLiked = favorites.includes(id.toString());

  const handleCardClick = () => {
    router.push(`gathering/${id}`);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(id.toString()); // 찜한 모임 토글
  };

  return (
    <div>
      <div className="relative my-5 items-center rounded-3xl bg-white hover:shadow-md md:flex md:h-[156px] lg:flex lg:h-[156px]">
        {/* Inactive Layer: 모집 마감된 경우 반투명 레이어 추가 */}
        {isClosed && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gray-500 bg-opacity-40 font-semibold text-white">
            모집 마감
          </div>
        )}

        {/* 카드 이미지 */}
        <div className="">
          <Tag registrationEnd={registrationEnd} />
          <Image
            src={image}
            alt={`${name} 모임 이미지 - ${location}`}
            width={280}
            height={156}
            className="h-[156px] w-full rounded-t-3xl md:w-[280px] md:rounded-l-3xl md:rounded-tr-none"
          />
        </div>

        {/* 카드 내용 */}
        <div className="flex-1 pb-3 pl-6 pr-6 pt-4">
          <div className="flex">
            <div className="mb-2 flex-col space-y-2">
              {/* 모임 제목 */}
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{name} |</h2>
                <p className="text-sm text-gray-500">{location}</p>
              </div>
              {/* 날짜 정보 */}
              <ChipInfo dateTime={dateTime} />
            </div>
            <LikeButton onClick={handleLikeClick} isLiked={isLiked} isClosed={isClosed} className="ml-auto md:mt-3" />
          </div>

          <div className="mt-5 flex items-center gap-3">
            {/* 인원 정보 */}
            <div className="text-sm text-gray-500">
              <AnimatedParticipantCount participantCount={participantCount} capacity={capacity} />
            </div>
            {participantCount >= 5 ? <ConfirmedStamp /> : null}
          </div>

          <div className="flex items-center gap-x-5">
            <ProgressBar progress={progress} />
            {participantCount === capacity || isClosed ? (
              <button onClick={handleCardClick} className="flex gap-1 whitespace-nowrap font-semibold text-sky-400">
                Closed
              </button>
            ) : (
              <button
                onClick={handleCardClick}
                className="flex gap-1 whitespace-nowrap font-semibold text-primary-color"
              >
                join now
                <JoinArrow className="mt-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
