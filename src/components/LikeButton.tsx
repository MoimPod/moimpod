"use client";

import Heart from "@/images/heart.svg";
import Bye from "@/images/bye.svg";
import { useState } from "react";

type LikeButtonProps = {
  onClick: () => void;
  isClosed: boolean;
};

export default function LikeButton({ onClick, ...rest }: LikeButtonProps) {
  // 모임이 마감, 취소된 경우
  const { isClosed } = rest;
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };
  return (
    <button
      className={`group flex ${isClosed ? "h-9 w-full max-w-[116px] sm:size-12" : "size-12"} items-center justify-center rounded-full ${clicked || isClosed ? "border-0 bg-orange-50" : "border-2 bg-white"} border-gray-200`}
      onClick={handleClick}
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
          className={`transition-all ${clicked ? "animate-heart-scale-up fill-red-600 stroke-none" : ""}`}
        />
      )}
    </button>
  );
}
