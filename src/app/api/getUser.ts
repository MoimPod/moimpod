import axiosInstance from "@/lib/axiosInstance";

export type User = {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export const getUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("auths/user");
  return response.data;
};
