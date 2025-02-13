import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/appClient";

const fetchParticipants = async (id: number | string) => {
  try {
    const { data } = await apiClient.get(`/gatherings/${id}/participants`);
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const useGetParticipants = <T>(gatheringId: string) => {
  return useQuery<T>({
    queryKey: ["participants", gatheringId],
    queryFn: () => fetchParticipants(gatheringId),
    staleTime: 1000 * 60 * 5,
  });
};
