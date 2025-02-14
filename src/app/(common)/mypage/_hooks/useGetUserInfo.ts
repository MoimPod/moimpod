import apiClient from "@/services/appClient";
import { useQuery } from "@tanstack/react-query";

const fetchUserInfo = async () => {
  try {
    const { data } = await apiClient.get(
      `/auths/user`,
      // 임시로 설정하는 헤더. 추후에 axiosInstance 설정되면 바꾸기.
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiIzIiwidXNlcklkIjoxMzQzLCJpYXQiOjE3Mzk1MjAzNTgsImV4cCI6MTczOTUyMzk1OH0.fCUB_NlrA2oJ6QZsM1zz2yUPI0twhm3Ttxv6dlpFWgo`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

type User = {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export const useGetUserInfo = (user: User) => {
  return useQuery<User>({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(),
    initialData: user,
  });
};
