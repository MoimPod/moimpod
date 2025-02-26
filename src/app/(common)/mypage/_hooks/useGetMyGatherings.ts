import { ReviewQuery } from "@/app/(common)/gathering/types";
import { MyGathering } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface FetchMyGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
}

// 공통 데이터 가져오기 함수
const fetchMyGatherings = async (query?: FetchMyGatheringsParams) => {
  const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
    params: {
      limit: 100,
      ...query,
    },
  });
  return response.data;
};

export const useGetMyGatherings = (queryKey: string[], query: FetchMyGatheringsParams = {}) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchMyGatherings(query),
    staleTime: 300000,
  });
};
