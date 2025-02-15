import { Suspense } from "react";
import apiClient from "@/services/appClient";
import Gathering from "../_components/Gathering";
import Reviews from "../_components/Reviews";
import Spinner from "@/components/Spinner";
import type { GatheringParticipantType, GatheringType } from "../types";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: gatheringId } = await params;
  const { data: gathering } = await apiClient.get<GatheringType>(`/gatherings/${gatheringId}`);
  const { data: participants } = await apiClient.get(`/gatherings/${gatheringId}/participants`);

  const profileImages = participants?.map((item: GatheringParticipantType) => item.User.image) || [];

  return (
    <div className="flex flex-col gap-6">
      <Gathering gathering={gathering} profileImages={profileImages} />

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Reviews gatheringId={gatheringId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
