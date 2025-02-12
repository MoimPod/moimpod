"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { useFetchGatherings } from "@/app/_home/_hooks/useFetchGatherings";
import CategoryButton from "@/components/Filtering/CategoryButton";
import LocationSelect from "@/components/Filtering/LocationSelect";
import ServiceTab from "@/app/_home/_components/ServiceTab";
import DateSelect from "@/components/Filtering/DateSelect";
import GatheringLogo from "@/images/gathering_logo.svg";
import Button from "@/components/Button";
import SortButton from "@/components/SortButton";
import CreateGatheringsModal from "@/app/_home/_components/CreateGatheringsModal";

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
  // 원본 데이터
  const { data: cards = [], isLoading, error } = useFetchGatherings();
  // 정렬된 데이터
  const [sortedCards, setSortedCards] = useState<CardData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cards.length > 0) {
      setSortedCards(cards);
    }
  }, [cards]);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

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
            <Button styleType="solid" size="sm" className="h-[40px] md:h-[44px] lg:h-[44px]" onClick={handleOpen}>
              모임 만들기
            </Button>
          </div>
        </div>
        <CategoryButton categories={["전체", "오피스 스트레칭", "마인드풀니스"]}>
          <CategoryButton.Title category="전체" />
          <CategoryButton.Title category="오피스 스트레칭" />
          <CategoryButton.Title category="마인드풀니스" />
        </CategoryButton>{" "}
      </div>
      <hr />

      <div>
        <div className="my-3 flex items-center justify-between">
          <div className="flex gap-3">
            <LocationSelect />
            <DateSelect />
          </div>
          <SortButton cards={cards} onSort={setSortedCards} />
        </div>
        {sortedCards.map((card) => (
          <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
        ))}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
