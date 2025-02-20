import { MyGathering } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

interface FetchMyGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
}

// 공통 데이터 가져오기 함수 (sortBy와 sortOrder는 고정)
const fetchMyGatherings = async ({
  pageParam = 0,
  filters,
}: {
  pageParam: number;
  filters: FetchMyGatheringsParams;
}) => {
  try {
    const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
      params: {
        limit: 5,
        offset: pageParam,
        sortBy: "dateTime",
        sortOrder: "desc",
        completed: filters.completed,
        reviewed: filters.reviewed,
      },
    });

    return {
      data: response.data,
      nextOffset: response.data.length === 5 ? pageParam + 5 : null,
    };
  } catch (error) {
    throw error;
  }
};

export const useGetMyGatherings = (queryKey: string[], filters: FetchMyGatheringsParams = {}) => {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetchMyGatherings({ pageParam, filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 60000,
  });
};
