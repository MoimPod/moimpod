import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchReviews } from "../_utils/api";

export const useGetReviews = (gatheringId: string) => {
  return useSuspenseQuery({
    queryKey: ["reviews", gatheringId],
    queryFn: () => fetchReviews({ gatheringId }),
    select: (data) => ({
      reviews: data.data.map((review) => ({
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
