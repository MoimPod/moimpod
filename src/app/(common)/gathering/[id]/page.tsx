"use client";

import { useParams } from "next/navigation";
import { useGetGatheringInfo } from "../_hooks/useGetGatheringInfo";
import { useGetParticipants } from "../_hooks/useGetParticipants";
import Thumbnail from "@/app/(common)/gathering/_components/Thumbnail";
import GatheringInfo from "@/app/(common)/gathering/_components/GatheringInfo";
import Spinner from "@/components/Spinner";
import type { GatheringParticipant } from "../types";

export default function GatheringDetail() {
  //TODO: 에러처리
  const { id: gatheringId } = useParams<{ id: string }>();
  const { data: gathering, error, isLoading } = useGetGatheringInfo(gatheringId);
  const { data: participants } = useGetParticipants<GatheringParticipant[]>(gatheringId);
  const profileImages = participants?.map((item) => item.User.image);

  if (isLoading)
    return (
      <div className="mt-[33vh] flex h-screen w-full items-start justify-center">
        <Spinner />
      </div>
    );
  if (error) return <p>죄송합니다. 에러가 발생하였습니다.</p>;

  return (
    <div className="flex flex-col items-center gap-4 pt-6 md:flex-row lg:pt-10">
      <Thumbnail imageUrl={gathering.image} />
      <GatheringInfo
        gatheringId={`${gathering.id}`}
        name={gathering.name}
        dateTime={gathering.dateTime}
        registrationEnd={gathering.registrationEnd}
        location={gathering.location}
        count={gathering.participantCount}
        capacity={gathering.capacity}
        profileImages={profileImages || []}
      />
    </div>
  );
}
