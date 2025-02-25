import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export type CardData = {
  id: number;
  type: "DALLAEMFIT" | "WORKATION";
  name: string;
  location: string;
  dateTime: string;
  registrationEnd: string;
  participantCount: number;
  capacity: number;
  createdBy: number;
  image: string;
  canceledAt: string | null;
};

type GatheringStore = {
  allCards: CardData[]; // API에서 받아온 전체 모임 데이터
  filteredCards: CardData[]; // 필터링된 모임 데이터
  selectedLocation: string;
  selectedCategory: string;
  sortBy: string;
  selectedDateTime: string | null;
  setFilters: (filters: { location?: string; category?: string; date?: string; sortBy?: string }) => void;
  fetchGatherings: () => Promise<void>;
};

export const useGatheringStore = create<GatheringStore>((set, get) => ({
  allCards: [],
  filteredCards: [],
  selectedLocation: "",
  selectedCategory: "전체",
  sortBy: "dateTime",
  selectedDateTime: null,
  setFilters: (filters) => {
    set((state) => ({
      ...state,
      ...filters,
    }));
  },
  fetchGatherings: async () => {
    const { selectedLocation, selectedCategory, selectedDateTime, sortBy } = get();

    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}gatherings`, {
        params: {
          id: undefined, // 특정 id 검색이 필요할 때 사용
          type: selectedCategory !== "전체" ? selectedCategory : undefined, // DALLAEMFIT, WORKATION 등
          location: selectedLocation || undefined, // 선택한 장소
          dateTime: selectedDateTime || undefined, // 특정 날짜 선택
          createdBy: undefined, // 특정 사용자가 만든 모임 검색 시 사용
          sortBy, // dateTime, registrationEnd, participantCount 등
        },
      });

      set({ allCards: response.data, filteredCards: response.data });
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  },
}));
