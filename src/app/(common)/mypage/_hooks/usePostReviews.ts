import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postReviews = async (reviewData: { gatheringId: number; score: number; comment: string }) => {
  try {
    const { data } = await axiosInstance.post(`/reviews`, reviewData);
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export default function usePostReviews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReviews,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === "user" && (key[1] === "reviews" || key[1] === "gatherings");
        },
      });
    },
  });
}
