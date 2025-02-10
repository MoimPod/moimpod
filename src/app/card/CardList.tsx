"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useCardStore, CardData } from "@/stores/useCardStore";
import Card from "@/components/Card";
import Image from "next/image";
import CategoryButton from "./CategoryButton";
import LocationSelect from "./LocationSelect";
import ServiceTab from "./ServiceTab";
import DateSelect from "./DateSelect";

export default function CardList() {
  const { cards, setCards } = useCardStore();

  const teamId = 3;

  // API 호출 후 zustand에 데이터 저장
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<CardData[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${teamId}/gatherings`);
        setCards(response.data);
      } catch (error) {
        console.error("목록 조회 데이터 가져오는 중 오류 발생", error);
      }
    };

    fetchCards();
  }, [setCards]);

  return (
    <div className="px-20 pt-10">
      <div className="mb-5 flex gap-6">
        <Image src={"/images/main_card_list_logo.svg"} alt={"main logo"} width={72} height={72} />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-2xl font-semibold text-gray-900">지금 모임에 참여해보세요</div>
        </div>
      </div>
      <div>
        <ServiceTab />
        <CategoryButton />
      </div>
      <hr />
      <div>
        <div className="my-3 flex gap-3">
          <LocationSelect />
          <DateSelect />
        </div>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
