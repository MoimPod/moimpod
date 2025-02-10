"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { SimpleDatepicker, DatepickerWithTime } from "@/components/Datepicker";
import { format } from "date-fns";
import ArrowDownBlackIcon from "@/images/dropdown_down_arrow_black.svg";
import ArrowDownWhiteIcon from "@/images/dropdown_down_arrow_white.svg";

export default function DateSelect() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative max-w-sm" ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <div
        className={`mb-2 flex w-[110px] cursor-pointer rounded-lg border p-2 text-sm font-medium ${!isDateDropdownOpen ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-white"} `}
        onClick={() => setDateDropdownOpen(!isDateDropdownOpen)}
      >
        {selectedDate ? format(selectedDate, "yy/MM/dd") : "날짜 선택"}
        {!isDateDropdownOpen ? <ArrowDownBlackIcon /> : <ArrowDownWhiteIcon />}
      </div>

      {/* 날짜 선택 */}
      {isDateDropdownOpen && (
        <div className="absolute rounded-lg border bg-white p-6 px-8 shadow-md">
          <SimpleDatepicker />
          <DatepickerWithTime />
          {/* 버튼 */}
          <div className="mt-4 flex justify-center">
            <Button
              styleType="outline"
              size="sm"
              className="m-2 h-[40px] w-[118px]"
              onClick={() => {
                setSelectedDate(null);
                setDateDropdownOpen(false);
              }}
            >
              초기화
            </Button>
            <Button
              styleType="solid"
              size="sm"
              className="m-2 h-[40px] w-[118px]"
              disabled={!selectedDate} // 날짜가 선택되지 않으면 비활성화
              onClick={() => {
                setDateDropdownOpen(false);
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
