import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CardData } from "@/stores/useCardStore";

// 데이터를 가져오는 함수
// const fetchCards = async (teamId: number) => {
//   try {
//     const response = await axios.get<CardData[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${teamId}/gatherings`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("요청 실패: ", error);
//     return [];
//   }
// };

// 더미 데이터 추가
const mockCards: CardData[] = [
  {
    id: 1,
    name: "오피스 스트레칭",
    location: "서울 강남구",
    dateTime: "2024-06-01 19:00",
    registrationEnd: "2024-05-30",
    participantCount: 8,
    capacity: 10,
    image: "/images/sample_card_1.png",
    createdBy: 1,
    teamId: 3,
    type: "OFFICE_STRETCHING",
    canceledAt: null,
  },
  {
    id: 2,
    name: "달램핏",
    location: "부산 해운대구",
    dateTime: "2024-06-05 08:00",
    registrationEnd: "2024-06-02",
    participantCount: 15,
    capacity: 20,
    image: "/images/sample_card_2.png",
    createdBy: 2,
    teamId: 3,
    type: "DALLAEMFIT",
    canceledAt: null,
  },
];

// 커스텀 훅
// export const useFetchGatherings = (teamId: number) => {
//   return useQuery({
//     queryKey: ["gatherings", teamId],
//     queryFn: () => fetchCards(teamId),
//     staleTime: 60000,
//   });
// };
export const useFetchGatherings = (teamId: number) => {
  return useQuery({
    queryKey: ["gatherings", teamId],
    queryFn: async () => {
      console.log("더미 데이터 사용 중!");
      return mockCards; // API 요청 대신 더미 데이터 반환
    },
    staleTime: 60000,
  });
};
