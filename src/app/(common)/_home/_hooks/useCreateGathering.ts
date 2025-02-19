import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

type FormData = {
  name: string;
  location: string;
  image: File | null;
  service: string;
  meetingDateTime: string;
  deadlineDateTime: string;
  capacity: string;
};

export const useCreateGathering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post("/gatherings", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gatherings"] }); // 기존 데이터 무효화 & 새로고침
    },
    onError: (error) => {
      console.error("모임 생성 오류:", error);
    },
  });
};
