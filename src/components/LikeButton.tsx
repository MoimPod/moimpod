import Heart from "@/images/heart.svg";
import { useState } from "react";

type LikeButtonProps = {
  onClick: () => void;
};

export default function LikeButton({ onClick, ...rest }: LikeButtonProps) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };
  return (
    <button
      className={`flex size-12 items-center justify-center rounded-full border-2 transition-all ${clicked ? "border-0 bg-orange-50" : "bg-white"} border-gray-200`}
      onClick={handleClick}
    >
      <Heart
        fill="#fff"
        stroke="#9CA3AF"
        className={`transition-all ${clicked ? "animate-heart-scale-up fill-red-600 stroke-none" : ""}`}
      />
    </button>
  );
}
