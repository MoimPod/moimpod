import apiClient from "@/services/appClient";
import { useQuery } from "@tanstack/react-query";
import type { ReviewQuery, ReviewsResponse, Review } from "../types";

const fetchReviews = async (query?: ReviewQuery): Promise<ReviewsResponse> => {
  try {
    const { data } = await apiClient.get("/reviews", { params: query });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const useGetReviews = (query?: ReviewQuery) => {
  return useQuery({
    queryKey: ["reviews", query],
    queryFn: () => fetchReviews(query),
    staleTime: 1000 * 60 * 5,
    select: (data) => ({
      reviews: data.data.map((review: Review) => ({
        id: review.id,
        score: review.score,
        comment: review.comment,
        createdAt: review.createdAt,
        user: {
          id: review.User.id,
          name: review.User.name,
          image: review.User.image,
        },
      })),
      totalItemCount: data.totalItemCount,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
    }),
  });
};
