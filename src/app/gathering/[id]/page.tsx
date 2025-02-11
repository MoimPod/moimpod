"use client";

import { useParams } from "next/navigation";
import { useGetGatheringInfo } from "@/app/gathering/_hooks/useGetGatheringInfo";
import GatheringInfo from "@/app/gathering/_components/GatheringInfo";
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
    <div className="max-w flex flex-col items-center gap-4 p-4 md:flex-row">
      {/* <Thumbnail imageUrl={data.image} /> */}
      <GatheringInfo
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
