import { Suspense } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Gathering from "../_components/Gathering";
import Reviews from "../_components/Reviews";
import Spinner from "@/components/Spinner";
import FloatingBar from "../_components/FloatingBar";
import type { GatheringParticipantType, GatheringType } from "../types";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QueryClient } from "@tanstack/react-query";
import { getParticipants } from "@/app/(common)/gathering/_utils/apis";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: gatheringId } = await params;
  const { data: gathering } = await axiosInstance.get<GatheringType>(`/gatherings/${gatheringId}`);
  //const { data: participants } = await axiosInstance.get(`/gatherings/${gatheringId}/participants`);

  //const profileImages = participants?.map((item: GatheringParticipantType) => item.User.image) || [];

  const queryClient = new QueryClient();

  // 서버에서 데이터를 미리 가져와 캐싱
  await queryClient.prefetchQuery({
    queryKey: ["participants", gatheringId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/gatherings/${gatheringId}/participants`);
      return data;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* <Gathering gathering={gathering} /> */}
      {/* <Gathering gathering={gathering} profileImages={profileImages} /> */}
      <HydrationBoundary state={dehydratedState}>
        <Gathering gathering={gathering} />
      </HydrationBoundary>

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Reviews gatheringId={gatheringId} />
        </Suspense>
      </ErrorBoundary>

      <FloatingBar gatheringId={gatheringId} hostUserId={gathering.createdBy} />
    </div>
  );
}
