"use client";

import { useState } from "react";
import Image from "next/image";

type AvatarProps = {
  imageUrl?: string;
  size?: number;
};

export default function Avatar({ imageUrl, size = 40 }: AvatarProps) {
  const [isError, setIsError] = useState(false);
  const DEFAULT_IMAGE = "/images/profile.svg";

  return (
    <div className="relative">
      <Image
        src={isError || !imageUrl ? DEFAULT_IMAGE : imageUrl}
        alt={"프로필 이미지"}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => setIsError(true)}
      />
    </div>
  );
}
