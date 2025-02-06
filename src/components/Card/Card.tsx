// components/Card/Card.tsx

import React from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

type CardProps = {
  image: string;
  name: string;
  dateTime: string;
  location: string;
  participantCount: number;
  capacity: number;
};

export default function Card({ image, name, dateTime, location, participantCount, capacity }: CardProps) {
  const progress = capacity > 0 ? (participantCount / capacity) * 100 : 0;

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4 shadow">
      {/* 카드 이미지 */}
      <Image src={image} alt={name} width={96} height={96} className="rounded-lg object-cover" />
      {/* 카드 내용 */}
      <div className="flex-1">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-500">
          {new Date(dateTime).toLocaleDateString()} | {new Date(dateTime).toLocaleTimeString()}
        </p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">
          {participantCount}/{capacity}
        </p>
        <ProgressBar progress={progress} />
      </div>
      <button className="font-bold text-orange-500">Join Now</button>
    </div>
  );
}
