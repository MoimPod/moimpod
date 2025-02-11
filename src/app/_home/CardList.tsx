"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { useFetchGatherings } from "./_hooks/useFetchGatherings";
import CategoryButton from "./_components/CategoryButton";
import LocationSelect from "./_components/LocationSelect";
import ServiceTab from "./_components/ServiceTab";
import DateSelect from "./_components/DateSelect";
import GatheringLogo from "@/images/gathering_logo.svg";
import Button from "@/components/Button";
import SortButton from "./_components/SortButton";

export type CardData = {
  id: number;
  name: string;
  location: string;
  dateTime: string;
  registrationEnd: string | null;
  participantCount: number;
  capacity: number;
  image: string;
};
export default function CardList() {
  const teamId = 3;

  // 원본 데이터
  const { data: cards = [], isLoading, error } = useFetchGatherings(teamId);

  // 정렬된 데이터
  const [sortedCards, setSortedCards] = useState<CardData[]>([]);

  useEffect(() => {
    if (cards.length > 0) {
      setSortedCards(cards);
    }
  }, [cards]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="px-20 pt-10">
      <div className="mb-5 flex gap-6">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-2xl font-semibold text-gray-900">지금 모임에 참여해보세요</div>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <ServiceTab />
          <div className="ml-auto w-[114px]">
            <Button styleType="solid" size="sm" className="h-[40px] md:h-[44px] lg:h-[44px]">
              모임 만들기
            </Button>
          </div>
        </div>

        <CategoryButton />
      </div>
      <hr />
      <div>
        <div className="my-3 flex gap-3">
          <LocationSelect />
          <DateSelect />
          <SortButton cards={cards} onSort={setSortedCards} />
        </div>
        {sortedCards.map((card) => (
          <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
        ))}
      </div>
    </div>
  );
}
