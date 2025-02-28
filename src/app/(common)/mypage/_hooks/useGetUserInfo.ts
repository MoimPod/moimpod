import { User } from "@/app/(common)/mypage/types";
import { getUser } from "@/app/api/getUser";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = (token?: string) => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 300000,
    enabled: Boolean(token),
  });
};
