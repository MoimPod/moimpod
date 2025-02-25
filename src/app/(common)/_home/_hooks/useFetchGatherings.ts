import { useInfiniteQuery } from "@tanstack/react-query";
import { CardData } from "@/stores/useGatheringStore";
import axiosInstance from "@/lib/axiosInstance";

type FetchParams = {
  city?: string;
  district?: string;
  dateTime?: string;
  sortBy?: string;
};

// 데이터를 가져오는 함수
export const useFetchGatherings = (filters?: FetchParams) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", filters],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      try {
        const response = await axiosInstance.get<CardData[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}gatherings`, {
          params: { ...filters, limit: 10, offset: pageParam },
        });
        console.log("카드 확인용: ", response.data);
        return {
          data: response.data,
          nextOffset: response.data.length === 10 ? pageParam + 10 : null, // 다음 데이터가 있다면 마지막 id 저장
        };
      } catch (error) {
        console.error("데이터 조회 실패:", error);
        throw error;
      }
    },
    initialPageParam: 0, // 첫 요청 시 0
    getNextPageParam: (lastPage) => lastPage.nextOffset, // 다음 요청 시 lastPage의 마지막 cursor 사용
    staleTime: 60000,
  });
};
