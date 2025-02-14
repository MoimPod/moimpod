"use client";

import GatheringInfo from "@/app/(common)/gathering/_components/GatheringInfo";
import Thumbnail from "@/app/(common)/gathering/_components/Thumbnail";
import type { GatheringType } from "@/app/(common)/gathering/types";

type GatheringProps = {
  gathering: GatheringType;
  profileImages: (string | null)[];
};

export default function Gathering({ gathering, profileImages }: GatheringProps) {
  return (
    <div className="flex flex-col items-center gap-4 pt-6 md:flex-row lg:pt-10">
      <Thumbnail imageUrl={gathering.image} />
      <GatheringInfo gatheringId={`${gathering.id}`} gathering={gathering} profileImages={profileImages} />
    </div>
  );
}
