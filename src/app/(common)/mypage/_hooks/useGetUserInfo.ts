import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchUserInfo = async () => {
  try {
    const { data } = await axiosInstance.get("auths/user");
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
