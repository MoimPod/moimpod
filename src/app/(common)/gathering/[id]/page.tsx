import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import ErrorBoundary from "@/components/ErrorBoundary";
import getQueryClient from "@/lib/getQueryClient";
import Gathering from "../_components/Gathering";
import Reviews from "../_components/Reviews";
import FloatingBar from "../_components/FloatingBar";
import { REVIEW_LIMIT } from "../_utils/constants";
import type { GatheringType, ReviewQuery } from "@/types";
import { getParticipants } from "@/app/(common)/gathering/_utils/apis";
import { getReviews } from "@/hooks/useGetReviews";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ReviewQuery>;
}) {
  const { id: gatheringId } = await params;
  const { data: gathering } = await axiosInstance.get<GatheringType>(`/gatherings/${gatheringId}`);
  const query = await searchParams;

  const reviewParams = Object.assign(
    {
      gatheringId: gatheringId,
      sortBy: "createdAt",
      sortOrder: "desc",
      offset: "0",
      limit: REVIEW_LIMIT.toString(),
    },
    query,
  );

  const queryClient = getQueryClient();

  // 서버에서 데이터를 미리 가져와 캐싱
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["participants", gatheringId],
      queryFn: () => getParticipants(gatheringId),
    }),

    queryClient.prefetchQuery({
      queryKey: ["reviews", reviewParams],
      queryFn: () => getReviews(reviewParams),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mb-[84px] flex w-full flex-col gap-6">
      <HydrationBoundary state={dehydratedState}>
        <Gathering gatheringId={gatheringId} gathering={gathering} />
        <ErrorBoundary>
          <Reviews reviewQuery={reviewParams} />
        </ErrorBoundary>
      </HydrationBoundary>

      <FloatingBar gatheringId={gatheringId} gathering={gathering} hostUserId={gathering.createdBy} />
    </div>
  );
}
