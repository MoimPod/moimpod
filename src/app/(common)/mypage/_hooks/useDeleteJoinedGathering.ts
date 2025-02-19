import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserInfo = async (gatheringId: number) => {
  try {
    const { data } = await axiosInstance.delete(`/gatherings/${gatheringId}/leave`);
    return data;
  } catch (error) {
    throw new Error("요청을 수행하지 못했습니다.");
  }
};

export default function useDeleteJoinedGathering() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gatheringId: number) => updateUserInfo(gatheringId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-gatherings"] });
    },
  });
}
