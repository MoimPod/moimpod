"use client";

import { useState, useEffect, useRef } from "react";
import SortIcon from "@/images/sort_icon.svg";

type SortOption = { label: string; value: string };

type SortButtonProps = {
  setSortType: (sortType: string) => void;
  sortOption: readonly SortOption[];
  defaultSort?: string;
};

export default function SortButton({ setSortType, sortOption, defaultSort }: SortButtonProps) {
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(defaultSort ?? sortOption[0]?.value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    if (isSortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSortDropdownOpen]);

  // 정렬 옵션 선택
  const handleSort = (sortType: string) => {
    setSelectedSort(sortType);
    setSortDropdownOpen(false);
    setSortType(sortType); // 선택한 정렬 기준을 상위 컴포넌트에 전달
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* 정렬 버튼 */}
      <button
        onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}
        className="mb-2 flex cursor-pointer items-center rounded-xl border bg-gray-50 p-2 text-sm font-medium"
      >
        <div className="mr-1">
          <SortIcon />
        </div>
        <span className="hidden md:block">
          {sortOption.find((option) => option.value === selectedSort)?.label || "정렬"}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isSortDropdownOpen && (
        <div className="absolute z-10 w-[110px] rounded-lg border bg-white p-2 text-sm font-medium shadow-md max-md:right-0">
          {sortOption.map(({ label, value }) => (
            <div key={value} onClick={() => handleSort(value)} className="rounded-lg p-2 hover:bg-sky-100">
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
