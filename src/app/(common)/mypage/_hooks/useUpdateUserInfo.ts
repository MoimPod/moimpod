import axiosInstance from "@/lib/axiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const updateUserInfo = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.put(`/auths/user`, formData);
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      queryClient.setQueryData(["userInfo"], data);
    },
  });
};
