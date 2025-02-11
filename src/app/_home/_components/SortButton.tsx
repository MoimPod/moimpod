"use client";

import { useEffect, useState } from "react";
import SortIcon from "@/images/sort_icon.svg";
import { CardData } from "@/stores/useCardStore";

type SortButtonProps = {
  cards: CardData[];
  onSort: (sortedCards: CardData[]) => void;
};

const sortOption = [
  { label: "마감 임박", value: "registrationEnd" },
  { label: "참여 인원 순", value: "participantCount" },
] as const;

export default function SortButton({ cards, onSort }: SortButtonProps) {
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"registrationEnd" | "participantCount">("registrationEnd");

  // 정렬 함수
  const handleSort = (sortType: "registrationEnd" | "participantCount") => {
    setSelectedSort(sortType);
    setSortDropdownOpen(false);
  };

  useEffect(() => {
    const sortedCards = [...cards].sort((a, b) => {
      if (selectedSort === "registrationEnd") {
        const dateA = a.registrationEnd ? new Date(a.registrationEnd + "T00:00:00").getTime() : Infinity;
        const dateB = b.registrationEnd ? new Date(b.registrationEnd + "T00:00:00").getTime() : Infinity;

        return dateA - dateB; // 마감일 오름차순 정렬
      } else {
        return b.participantCount - a.participantCount; // 내림차순 정렬
      }
    });

    onSort(sortedCards);
  }, [selectedSort, cards]);

  return (
    <div>
      {/* 정렬 버튼 */}
      <button
        onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}
        className={`mb-2 flex w-[110px] cursor-pointer rounded-lg border p-2 text-sm font-medium ${!isSortDropdownOpen ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-white"} `}
      >
        <SortIcon />
        {selectedSort === "registrationEnd" ? "마감 임박" : "참여 인원 순"}
      </button>

      {/* 드롭다운 메뉴 */}
      {isSortDropdownOpen && (
        <div className="absolute z-10 w-[110px] rounded-lg border bg-white p-2 text-sm font-medium shadow-md">
          {sortOption.map(({ label, value }) => (
            <div key={value} onClick={() => handleSort(value)} className="rounded-lg p-2 hover:bg-orange-100">
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
