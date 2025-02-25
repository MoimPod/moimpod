import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const joinGathering = async (gatheringId: string) => {
  const { data } = await axiosInstance.post(`/gatherings/${gatheringId}/join`);
  return data;
};

export const useJoin = (gatheringId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gatheringId: string) => joinGathering(gatheringId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["participants", gatheringId],
      }),
    onError: (e) => console.error(e.message),
  });
};
