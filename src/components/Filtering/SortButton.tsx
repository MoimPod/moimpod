"use client";

import { useState } from "react";
import SortIcon from "@/images/sort_icon.svg";

type SortButtonProps = {
  setSortType: (sortType: string) => void;
};

const sortOption = [
  { label: "마감 임박", value: "registrationEnd" },
  { label: "참여 인원 순", value: "participantCount" },
] as const;

export default function SortButton({ setSortType }: SortButtonProps) {
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"registrationEnd" | "participantCount">("registrationEnd");

  // 정렬 옵션 선택
  const handleSort = (sortType: "registrationEnd" | "participantCount") => {
    setSelectedSort(sortType);
    setSortDropdownOpen(false);
    setSortType(sortType); // 선택한 정렬 기준을 상위 컴포넌트에 전달
  };

  return (
    <div>
      {/* 정렬 버튼 */}
      <button
        onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}
        className="mb-2 flex cursor-pointer rounded-xl border bg-gray-50 p-2 text-sm font-medium"
      >
        <div className="mr-1">
          <SortIcon />
        </div>
        <span className="hidden md:block">{selectedSort === "registrationEnd" ? "마감 임박" : "참여 인원 순"}</span>
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
