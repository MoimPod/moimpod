"use client";

import CreateGatheringsModal from "@/app/_home/_components/CreateGatheringsModal";
import Tab from "@/components/Tab";
import { useFetchGatherings } from "@/app/_home/_hooks/useFetchGatherings";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CategoryButton from "@/components/CategoryButton";
import DateSelect from "@/components/Filtering/DateSelect";
import LocationSelect from "@/components/Filtering/LocationSelect";
import SortButton from "@/components/Filtering/SortButton";
import GatheringLogo from "@/images/gathering_logo.svg";
import { useEffect, useState } from "react";
import Dalaemfit from "@/images/dalaemfit.svg";
import Workation from "@/images/workation.svg";

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

const serviceTab = [
  { name: "달램핏", icon: Dalaemfit },
  { name: "워케이션", icon: Workation },
];

export default function CardList() {
  // 원본 데이터
  const { data: cards = [], isLoading, error } = useFetchGatherings();
  // 정렬된 데이터
  const [sortedCards, setSortedCards] = useState<CardData[]>([]);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

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
          <Tab
            category={
              <CategoryButton categories={["전체", "오피스 스트레칭", "마인드풀니스"]}>
                <CategoryButton.Title category="전체" />
                <CategoryButton.Title category="오피스 스트레칭" />
                <CategoryButton.Title category="마인드풀니스" />
              </CategoryButton>
            }
            targetIndex={0}
          >
            {serviceTab.map((tabItem, idx) => (
              <Tab.Item key={tabItem.name} index={idx}>
                {tabItem.name}
                <tabItem.icon />
              </Tab.Item>
            ))}
          </Tab>
          <div className="ml-auto w-[114px]">
            <Button styleType="solid" size="sm" className="h-10 md:h-11" onClick={handleOpen}>
              모임 만들기
            </Button>
          </div>
        </div>
      </div>
      <hr className="my-3" />

      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-3 md:flex-nowrap">
            <LocationSelect
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
            />
            <div className="sm:w-auto">
              <DateSelect />
            </div>
          </div>
          <SortButton cards={cards} onSort={setSortedCards} />
        </div>
        {sortedCards.length === 0 ? (
          <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
            <p>아직 모임이 없어요</p>
            <p className="mt-2">지금 바로 모임을 만들어보세요</p>
          </div>
        ) : (
          sortedCards.map((card) => <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />)
        )}
      </div>

      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
