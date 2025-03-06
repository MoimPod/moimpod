import MypageContent from "@/app/(common)/mypage/_components/MypageContent";
import { ProfileSection } from "@/app/(common)/mypage/_components/ProfileSection";
import { MyGathering } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import getQueryClient from "@/lib/getQueryClient";
import { UserType } from "@/types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import axios from "axios";

import dayjs from "dayjs";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) return null;
      const response = await axios.get<UserType>("auths/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["user", "gatherings", "joined"],
    queryFn: async () => {
      if (!token) return [];
      const response = await axios.get<MyGathering[]>("gatherings/joined", {
        params: { limit: 100 },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.sort((a, b) => dayjs(b.dateTime).valueOf() - dayjs(a.dateTime).valueOf());
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-[30px] pt-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">마이 페이지</h2>
        <ProfileSection />
      </div>
      {/* 마이페이지의 콘텐츠 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MypageContent />
      </HydrationBoundary>
    </div>
  );
}
