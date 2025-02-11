import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/appClient";

const fetchGathering = async (id: number | string) => {
  try {
    const { data } = await apiClient.get(`/gatherings/${id}`);
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const useGetGatheringInfo = (gatheringId: string) => {
  return useQuery({
    queryKey: ["gathering", gatheringId],
    queryFn: () => fetchGathering(gatheringId),
    staleTime: 1000 * 60 * 5,
  });
};
