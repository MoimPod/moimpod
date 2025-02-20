import { MyGathering } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchJoinedGatherings = async ({ pageParam = 0 }: { pageParam: number }) => {
  try {
    const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
      params: { limit: 5, offset: pageParam, sortBy: "dateTime", sortOrder: "desc" },
    });
    return {
      data: response.data,
      nextOffset: response.data.length === 5 ? pageParam + 5 : null,
    };
  } catch (error) {
    throw error;
  }
};

export const useGetJoinedGatherings = () => {
  return useInfiniteQuery({
    queryKey: ["my-gatherings"],
    queryFn: fetchJoinedGatherings,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 60000,
  });
};
