import apiClient from "@/services/appClient";
import Gathering from "../_components/Gathering";
import Reviews from "../_components/Reviews";
import type { GatheringParticipantType, GatheringType } from "../types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: gatheringId } = await params;
  const { data: gathering } = await apiClient.get<GatheringType>(`/gatherings/${gatheringId}`);
  const { data: participants } = await apiClient.get(`/gatherings/${gatheringId}/participants`);

  const profileImages = participants?.map((item: GatheringParticipantType) => item.User.image) || [];

  return (
    <div className="flex flex-col">
      <Gathering gathering={gathering} profileImages={profileImages} />
      <Reviews gatheringId={gatheringId} />
    </div>
  );
}
