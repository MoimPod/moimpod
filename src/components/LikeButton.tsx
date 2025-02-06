import Heart from "@/images/heart.svg";
import { useState } from "react";

export default function LikeButton({ onClick }: { onClick: () => void }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };
  return (
    <button
      className="flex size-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white"
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
