import { useInfiniteQuery } from "@tanstack/react-query";
import { GatheringType } from "@/types";
import axiosInstance from "@/lib/axiosInstance";
import { InfiniteData } from "@tanstack/react-query";

type FetchParams = {
  location?: string;
  date?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: "asc"; // 오름차순 정렬
};

// type 기본값 설정
const defaultFilters: FetchParams = {
  type: "DALLAEMFIT",
};

// 데이터 패칭 함수
export const fetchGatherings = async ({
  pageParam = 0,
  filters = {},
}: {
  pageParam: number;
  filters?: FetchParams;
}) => {
  try {
    const mergedFilters = { ...defaultFilters, ...filters };

    const response = await axiosInstance.get<GatheringType[]>("gatherings", {
      params: { ...mergedFilters, limit: 10, offset: pageParam },
    });

    return {
      data: response.data,
      nextOffset: response.data.length === 10 ? pageParam + 10 : null, // 다음 데이터 존재 여부 체크
    };
  } catch (error) {
    console.error("데이터 조회 실패:", error);
    throw error;
  }
};

// 클라이언트에서 무한스크롤을 위한 데이터 패칭
export const useFetchGatherings = (filters?: FetchParams) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", filters],
    queryFn: ({ pageParam = 0 }) => fetchGatherings({ pageParam, filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset, // 다음 페이지 존재 여부 반환
    staleTime: 60000,
  });
};
