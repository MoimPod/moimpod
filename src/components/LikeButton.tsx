"use client";

import Heart from "@/images/heart.svg";
import Bye from "@/images/bye.svg";
import { ButtonHTMLAttributes, useState } from "react";

type LikeButtonProps = {
  onClick: () => void; // 버튼 클릭 시 실행될 함수
  isClosed: boolean; // 이미 마감, 취소된경우
  isLiked: boolean; // 찜해놓은 경우
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function LikeButton({ onClick, isClosed, isLiked, className, ...rest }: LikeButtonProps) {
  const [isClicked, setIsClicked] = useState(isLiked);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
    onClick(e);
  };
  return (
    <button
      className={`group flex ${isClosed ? "h-9 w-full max-w-[116px] sm:size-12" : "size-12"} items-center justify-center rounded-full ${isClicked || isClosed ? "border-0 bg-orange-50" : "border-2 border-gray-200 bg-white"} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {/* 모임이 마감, 취소된 경우 Bye와 span을, 아닌 경우 Heart를 렌더링  */}
      {isClosed ? (
        <>
          <Bye className="group-hover:animate-hand-wave" />
          <span className="text-xs text-orange-600 sm:hidden">모임 보내주기</span>
        </>
      ) : (
        <Heart
          fill="#fff"
          stroke="#9CA3AF"
          className={`transition-all ${isClicked ? "animate-heart-scale-up fill-red-600 stroke-none" : ""}`}
        />
      )}
    </button>
  );
}
