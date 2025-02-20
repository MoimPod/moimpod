import axiosInstance from "@/lib/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

type MyGathering = {
  teamId: number; // 팀 id
  id: number; // 모임 id
  type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION"; // 모임 서비스 종류
  name: string; // 모임의 이름
  dateTime: string; // 모임 날짜 및 시간
  registrationEnd: string; // 모집 마감 날짜 및 시간
  location: string; // 모임 장소
  participantCount: number; // 현재 참여자 수
  capacity: number; // 정원
  image: string; // 이미지 url
  createdBy: number; // 모임 생성자 id
  canceledAt: string | null; // 모임 취소 날짜 및 시간
  joinedAt: string; // 사용자가 모임 참여 신청한 일자
  isCompleted: boolean; // 모임 종료 여부
  isReviewed: boolean; // 리뷰 작성 여부
};

export const useGetJoinedGatherings = () => {
  return useInfiniteQuery({
    queryKey: ["my-gatherings"],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      try {
        const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
          params: { limit: 5, offset: pageParam, sortBy: "dateTime", sortOrder: "desc" },
        });
        return {
          data: response.data,
          nextOffset: response.data.length === 5 ? pageParam + 5 : null, // 다음 데이터가 있다면 마지막 id 저장
        };
      } catch (error) {
        throw error;
      }
    },
    initialPageParam: 0, // 첫 요청 시 0
    getNextPageParam: (lastPage) => lastPage.nextOffset, // 다음 요청 시 lastPage의 마지막 cursor 사용
    staleTime: 60000,
  });
};
