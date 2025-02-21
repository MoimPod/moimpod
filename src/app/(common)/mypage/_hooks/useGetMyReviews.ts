import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

type Gathering = {
  teamId: number;
  id: number;
  type: "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  name: string;
  dateTime: string;
  location: string;
  image: string;
};

type User = {
  teamId: number;
  id: number;
  name: string;
  image: string;
};

type DataItem = {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: Gathering;
  User: User;
};

type MyReviews = {
  data: DataItem[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};

const fetchMyReviews = async ({ pageParam = 0, userId }: { pageParam: number; userId: number }) => {
  const response = await axiosInstance.get<MyReviews>("reviews", {
    params: {
      limit: 5,
      offset: pageParam,
      userId,
    },
  });

  return {
    data: response.data,
    nextOffset: response.data.data.length === 5 ? pageParam + 5 : null,
  };
};

export const useGetMyReviews = (userId: number) => {
  return useInfiniteQuery({
    queryKey: ["mypage", "reviews", "written"],
    queryFn: ({ pageParam }) => fetchMyReviews({ pageParam, userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 60000,
  });
};
