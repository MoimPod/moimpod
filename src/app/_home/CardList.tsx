"use client";

import { useState } from "react";
import CreateGatheringsModal from "@/app/_home/_components/CreateGatheringsModal";
import ServiceTab from "./_components/SeviceTab";
import GatheringFilters from "./_components/GatheringFilters";
import Card from "@/components/Card";
import Button from "@/components/Button";
import GatheringLogo from "@/images/gathering_logo.svg";
import { CardData } from "@/stores/useGateringStore";

export default function CardList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-5 flex gap-6 pt-8">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
          <div className="text-2xl font-semibold text-gray-900">지금 모임에 참여해보세요</div>
        </div>
      </div>
      <div className="px-6 pt-6">
        <div className="flex items-center">
          <ServiceTab />
          <div className="ml-auto w-[114px]">
            <Button styleType="solid" size="sm" className="h-10 md:h-11" onClick={handleOpen}>
              모임 만들기
            </Button>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="px-6">
        <GatheringFilters onFetch={(fetchedCards) => setCards(fetchedCards)} />
        {cards.length === 0 ? (
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>아직 모임이 없어요</p>
            <p className="mt-2">지금 바로 모임을 만들어보세요</p>
          </div>
        ) : (
          <div>
            {cards.map((card) => (
              <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
            ))}
          </div>
        )}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
