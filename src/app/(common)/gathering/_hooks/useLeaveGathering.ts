import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

// 모임 참여 취소
const leaveGathering = async (gatheringId: string) => {
  const { data } = await axiosInstance.delete(`/gatherings/${gatheringId}/leave`);
  return data;
};

export const useLeaveGathering = (gatheringId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gatheringId: string) => leaveGathering(gatheringId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [gatheringId, "participants"],
      }),
    onError: (error) => {
      console.error("모임 취소 중 오류 발생:", error);
    },
  });
};
