"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import CustomDatepicker from "@/components/Filtering/CustomDatepicker";
import { format } from "date-fns";
import Dropdown from "@/components/Dropdown";

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
      <Dropdown
        selected={selectedDate ? format(selectedDate, "yy/MM/dd") : "날짜 선택"}
        onSelect={() => setDateDropdownOpen(!isDateDropdownOpen)}
        onToggle={setDateDropdownOpen}
        placeholder="날짜 선택"
      >
        {/* 날짜 선택 */}
        {isDateDropdownOpen && (
          <div className="absolute z-10 rounded-xl border bg-white p-6 px-10 shadow-md">
            <CustomDatepicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            {/* 버튼 */}
            <div className="mt-3 flex justify-center gap-2">
              <Button
                styleType="outline"
                size="sm"
                className="h-10 w-[118px]"
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
                className="h-10 w-[118px]"
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
      </Dropdown>
    </div>
  );
}
