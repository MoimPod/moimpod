import axiosInstance from "@/lib/axiosInstance";
import { CardData } from "@/stores/useGatheringStore";
import { useQuery } from "@tanstack/react-query";

const fetchMyCreatedGatherings = async (userId: number) => {
  const response = await axiosInstance.get<CardData[]>("gatherings", {
    params: {
      limit: 100,
      userId,
    },
  });

  return response.data;
};

export const useGetMyCreatedGatherings = (userId: number) => {
  return useQuery({
    queryKey: ["user", "gatherings", "created"],
    queryFn: () => fetchMyCreatedGatherings(userId),
    staleTime: 300000,
    enabled: !!userId,
  });
};
