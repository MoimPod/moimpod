import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const postJoin = async (gatheringId: string) => {
  const { data } = await axiosInstance.post(`/gatherings/${gatheringId}/join`);
  return data;
};

export const useJoin = () => {
  return useMutation({
    mutationFn: (gatheringId: string) => postJoin(gatheringId),
    onSuccess: () => console.log("success!"),
    onError: (e) => console.error(e.message),
  });
};
