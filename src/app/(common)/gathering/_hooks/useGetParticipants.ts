import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import type { GatheringParticipantType } from "../types";

const getParticipants = async (gatheringId: string): Promise<GatheringParticipantType[]> => {
  const { data } = await axiosInstance(`/gatherings/${gatheringId}/participants`);
  return data;
};

export const useGetParticipants = (gatheringId: string) => {
  return useQuery({
    queryKey: [gatheringId, "participants"],
    queryFn: () => getParticipants(gatheringId),
    select: (data) => data.map((participant) => participant.userId),
  });
};
