import axiosInstance from "@/lib/axiosInstance";
import { CardData } from "@/stores/useGatheringStore";
import { useInfiniteQuery } from "@tanstack/react-query";

// 공통 데이터 가져오기 함수 (sortBy와 sortOrder는 고정)
const fetchMyCreatedGatherings = async ({ pageParam = 0, userId }: { pageParam: number; userId: number }) => {
  const response = await axiosInstance.get<CardData[]>("gatherings", {
    params: {
      limit: 5,
      offset: pageParam,
      sortBy: "dateTime",
      sortOrder: "desc",
      createdBy: userId,
    },
  });

  return {
    data: response.data,
    nextOffset: response.data.length === 5 ? pageParam + 5 : null,
  };
};

export const useGetMyCreatedGatherings = (userId: number) => {
  return useInfiniteQuery({
    queryKey: ["mypage", "gatherings", "created"],
    queryFn: ({ pageParam }) => fetchMyCreatedGatherings({ pageParam, userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 60000,
  });
};
