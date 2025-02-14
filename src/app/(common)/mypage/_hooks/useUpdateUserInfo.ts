import apiClient from "@/services/appClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const updateUserInfo = async (formData: FormData) => {
  try {
    const { data } = await apiClient.put(
      `/auths/user`,
      formData,
      // 임시로 설정하는 헤더. 추후에 axiosInstance 설정되면 바꾸기.
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiIzIiwidXNlcklkIjoxMzQzLCJpYXQiOjE3Mzk1MjAzNTgsImV4cCI6MTczOTUyMzk1OH0.fCUB_NlrA2oJ6QZsM1zz2yUPI0twhm3Ttxv6dlpFWgo`,
        },
      },
    );
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
