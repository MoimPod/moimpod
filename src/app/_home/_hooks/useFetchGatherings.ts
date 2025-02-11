import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CardData } from "@/stores/useCardStore";

// 데이터를 가져오는 함수
const fetchCards = async (teamId: number) => {
  try {
    const response = await axios.get<CardData[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${teamId}/gatherings`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("요청 실패: ", error);
    return [];
  }
};

// 커스텀 훅
export const useFetchGatherings = (teamId: number) => {
  return useQuery({
    queryKey: ["gatherings", teamId],
    queryFn: () => fetchCards(teamId),
    staleTime: 60000,
  });
};
