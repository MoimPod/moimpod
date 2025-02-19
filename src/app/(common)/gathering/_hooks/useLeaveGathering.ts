import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

// 모임 참여 취소
const leaveGathering = async (gatheringId: string) => {
  const { data } = await axiosInstance.delete(`/gatherings/${gatheringId}/leave`);
  return data;
};

export const useLeaveGathering = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (gatheringId: string) => leaveGathering(gatheringId),
    onSuccess: () => console.log("Success!"),
    onError: (error) => {
      console.error("모임 취소 중 오류 발생:", error);
    },
  });
};
