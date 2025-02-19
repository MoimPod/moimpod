import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postReviews = async (reviewData: { gatheringId: number; score: number; comment: string }) => {
  try {
    const { data } = await axiosInstance.post(`/reviews`, reviewData);
    console.log("요청 성공");
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
      queryClient.invalidateQueries({ queryKey: ["my-gatherings"] });
    },
  });
}
