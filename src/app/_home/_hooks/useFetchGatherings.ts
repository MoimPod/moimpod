import { useQuery } from "@tanstack/react-query";
import { CardData } from "@/stores/useGateringStore";
import axiosInstance from "@/lib/axiosInstance";

type FetchParams = {
  city?: string;
  district?: string;
  dateTime?: string;
  sortBy?: string;
};

// 데이터를 가져오는 함수
export const useFetchGatherings = (filters: FetchParams) => {
  return useQuery({
    queryKey: ["gatherings"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<CardData[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}gatherings?limit=10`,

          { params: filters },
        );
        return response.data; // API 요청 대신 더미 데이터 반환
      } catch (error) {
        console.error("데이터 조회 실패:", error);
        throw error;
      }
    },
    staleTime: 60000,
  });
};

// 더미 데이터 추가
// const mockCards: CardData[] = [
//   {
//     id: 1,
//     type: "WORKATION",
//     name: "오피스 스트레칭",
//     location: "서울 강남구",
//     dateTime: "2025-06-01 19:00",
//     registrationEnd: "2025-05-30",
//     participantCount: 8,
//     capacity: 8,
//     image: "/images/sample_card_1.png",
//     createdBy: 1,
//     canceledAt: "",
//   },
//   {
//     id: 2,
//     name: "달램핏",
//     location: "부산 해운대구",
//     dateTime: "2025-02-11 08:00",
//     registrationEnd: "2025-02-11",
//     participantCount: 15,
//     capacity: 20,
//     image: "/images/sample_card_2.png",
//     createdBy: 2,
//     type: "DALLAEMFIT",
//     canceledAt: "",
//   },
//   {
//     id: 3,
//     name: "마인드 풀니스",
//     location: "경기도 수원시",
//     dateTime: "2025-07-05 16:30",
//     registrationEnd: "2025-07-02",
//     participantCount: 5,
//     capacity: 20,
//     image: "/images/sample_card_2.png",
//     createdBy: 2,
//     type: "DALLAEMFIT",
//     canceledAt: "",
//   },
//   {
//     id: 4,
//     name: "오피스 스트레칭",
//     location: "부산 남구",
//     dateTime: "2025-03-01 19:00",
//     registrationEnd: "2025-02-17 19:00",
//     participantCount: 13,
//     capacity: 20,
//     image: "/images/sample_card_1.png",
//     createdBy: 1,
//     type: "WORKATION",
//     canceledAt: "",
//   },
// ];
