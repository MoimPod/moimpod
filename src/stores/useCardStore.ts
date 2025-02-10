import { create } from "zustand";

// 카드 데이터 타입 정의
export type CardData = {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
};

interface CardStoreState {
  cards: CardData[];
  setCards: (cards: CardData[]) => void;
}

export const useCardStore = create<CardStoreState>((set) => ({
  cards: [], // 초기 카드 목록
  setCards: (cards) => set({ cards }), // 카드 목록 업데이트
}));
