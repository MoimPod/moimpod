"use client";

import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import CustomDatepicker from "@/components/Filtering/CustomDatepicker";
import CustomTimepicker from "@/components/Filtering/CustomTimepicker";

type DateTimePickerProps = {
  selectedDateTime: Date | null;
  onDateTimeChange: (dateTime: Date | null) => void;
};

export default function DateTimePicker({ selectedDateTime, onDateTimeChange }: DateTimePickerProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(selectedDateTime);
  const [selectedTime, setSelectedTime] = useState<string>("12:00"); // 기본 시간

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      onDateTimeChange(newDateTime);
    }
  }, [selectedDate, selectedTime, onDateTimeChange]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 날짜 & 시간 선택 필드 */}
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border bg-gray-50 p-2 text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedDateTime ? format(selectedDateTime, "yyyy-MM-dd HH:mm") : "날짜 & 시간 선택"}</span>
        <svg
          className="h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* 드롭다운 (Datepicker + Timepicker) */}
      {isOpen && (
        <div className="absolute z-10 mt-2 rounded-lg border bg-white p-4 shadow-md">
          <div className="flex gap-4">
            {/* 날짜 선택 */}
            <CustomDatepicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            {/* 시간 선택 */}
            <CustomTimepicker selectedTime={selectedTime} onTimeChange={setSelectedTime} />
          </div>
        </div>
      )}
    </div>
  );
}
