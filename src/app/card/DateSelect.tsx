"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Datepicker from "@/components/Card/Datepicker";

export default function DateSelect() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);

  // 날짜 상태 업데이트
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value); // 선택된 날짜를 상태로 설정
  };

  return (
    <div className="relative max-w-sm">
      {/* 드롭다운 버튼 */}
      <div
        className={`mb-2 flex w-[110px] cursor-pointer rounded-lg border p-2 text-sm font-medium ${!isDateDropdownOpen ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-white"} `}
        onClick={() => setDateDropdownOpen(!isDateDropdownOpen)}
      >
        {selectedDate ? selectedDate : "날짜 선택"}
        {!isDateDropdownOpen ? (
          <Image
            src={"/images/dropdown_down_arrow_black.svg"}
            alt={"화살표  ic"}
            width={24}
            height={24}
            className="ml-auto"
          />
        ) : (
          <Image
            src={"/images/dropdown_down_arrow_white.svg"}
            alt={"화살표  ic"}
            width={24}
            height={24}
            className="ml-auto"
          />
        )}
      </div>

      {/* 날짜 선택 */}
      {isDateDropdownOpen && (
        <div className="absolute rounded-lg border bg-white p-6 px-8 shadow-md">
          <Datepicker />
          {/* 버튼 */}
          <div className="mt-4 flex justify-center">
            <Button
              styleType="outline"
              size="sm"
              className="m-2 h-[40px] w-[118px]"
              onClick={() => setSelectedDate(null)}
            >
              초기화
            </Button>
            <Button
              styleType="solid"
              size="sm"
              className="m-2 h-[40px] w-[118px]"
              onClick={() => {
                setDateDropdownOpen(false);
                console.log("선택된 날짜:", selectedDate);
              }}
            >
              적용
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
