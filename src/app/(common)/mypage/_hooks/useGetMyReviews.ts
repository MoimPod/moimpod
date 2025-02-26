import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

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

const fetchMyReviews = async (userId: number) => {
  const response = await axiosInstance.get<MyReviews>("reviews", {
    params: {
      limit: 100,
      userId,
    },
  });

  return response.data.data;
};

export const useGetMyReviews = (userId: number) => {
  return useQuery({
    queryKey: ["user", "reviews", "written"],
    queryFn: () => fetchMyReviews(userId),
    staleTime: 300000,
    enabled: !!userId,
  });
};
