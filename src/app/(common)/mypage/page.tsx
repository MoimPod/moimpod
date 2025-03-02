import MypageContent from "@/app/(common)/mypage/_components/MypageContent";
import { ProfileSection } from "@/app/(common)/mypage/_components/ProfileSection";
import { MyGathering, Reviews } from "@/app/(common)/mypage/types";
import getQueryClient from "@/lib/getQueryClient";
import { CardData } from "@/stores/useGatheringStore";
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
      const response = await axios.get<UserType>(`${process.env.NEXT_PUBLIC_API_BASE_URL}auths/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user", "gatherings"],
      queryFn: async () => {
        const response = await axios.get<MyGathering[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}gatherings/joined`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 100,
          },
        });
        return response.data.sort((a, b) => dayjs(b.dateTime).valueOf() - dayjs(a.dateTime).valueOf());
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ["user", "reviews", "reviewable"],
      queryFn: async () => {
        const response = await axios.get<MyGathering[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}gatherings/joined`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 100,
            completed: true,
            reviewed: false,
          },
        });
        const data = response.data.filter((gathering) => !gathering.canceledAt);
        return data.sort((a, b) => dayjs(b.dateTime).valueOf() - dayjs(a.dateTime).valueOf());
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["user", "reviews", "written"],
      queryFn: async () => {
        const user = queryClient.getQueryData<UserType>(["user"]);
        const response = await axios.get<Reviews>(`${process.env.NEXT_PUBLIC_API_BASE_URL}reviews`, {
          params: {
            limit: 100,
            userId: user?.id,
          },
        });

        return response.data.data.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["user", "gatherings", "created"],
      queryFn: async () => {
        const user = queryClient.getQueryData<UserType>(["user"]);
        const response = await axios.get<CardData[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}gatherings`, {
          params: {
            limit: 100,
            sortBy: "dateTime",
            sortOrder: "desc",
            createdBy: user?.id,
          },
        });

        return response.data;
      },
    }),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-[30px] pt-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">마이 페이지</h2>
          <ProfileSection />
        </div>
        {/* 마이페이지의 콘텐츠 */}
        <MypageContent />
      </HydrationBoundary>
    </div>
  );
}
