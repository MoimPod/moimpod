"use client";

import { useParams } from "next/navigation";
import { useGetGatheringInfo } from "@/app/(common)/gathering/_hooks/useGetGatheringInfo";
import Thumbnail from "@/app/(common)/gathering/_components/Thumbnail";
import GatheringInfo from "@/app/(common)/gathering/_components/GatheringInfo";
import Spinner from "@/components/Spinner";

export default function GatheringDetail() {
  const { id: gatheringId } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetGatheringInfo(gatheringId);

  if (isLoading)
    return (
      <div className="mt-[33vh] flex h-screen w-full items-start justify-center">
        <Spinner />
      </div>
    );
  if (error) return <p>죄송합니다. 에러가 발생하였습니다.</p>;

  return (
    <div className="flex flex-col items-center gap-4 pt-6 md:flex-row lg:pt-10">
      <Thumbnail imageUrl={data.image} />
      <GatheringInfo
        gatheringId={`${data.id}`}
        name={data.name}
        dateTime={data.dateTime}
        registrationEnd={data.registrationEnd}
        location={data.location}
        count={data.participantCount}
        capacity={data.capacity}
      />
    </div>
  );
}
