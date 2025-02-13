"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Datepicker.module.css";

type BaseDatepickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  showTimeSelect?: boolean; // 시간 선택 여부
  showInline?: boolean; // 캘린더 inline 여부
  placeholderText?: string; // 입력 필드의 placeholder
};

// 공통 커스텀 캘린더
export const BaseDatepicker = ({
  selectedDate = null,
  onDateChange,
  showTimeSelect = false,
  showInline = false,
  placeholderText = "날짜를 선택하세요",
}: BaseDatepickerProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      showTimeSelect={showTimeSelect}
      inline={showInline}
      dateFormat={showTimeSelect ? "yyyy-MM-dd h:mm aa" : "yyyy-MM-dd"}
      placeholderText={placeholderText}
      timeFormat="h:mm aa"
      formatWeekDay={(day) => day.substr(0, 3)}
      timeIntervals={15}
      className={styles.dateInput}
      calendarClassName={styles.calendar}
      dayClassName={(date) => {
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
        const isOutsideMonth = date.getMonth() !== today.getMonth();
        if (isSelected) return styles["selected-day"];
        if (isToday) return styles.today;
        if (isOutsideMonth) return styles["outside-month"];
        return styles["default-day"];
      }}
    />
  );
};

// 시간선택
export const DatepickerWithTime = ({ selectedDate, onDateChange }: BaseDatepickerProps) => {
  return (
    <div className="p-4">
      <BaseDatepicker
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        showTimeSelect={true} // 시간 선택 활성화
        placeholderText="날짜와 시간을 선택하세요"
      />
    </div>
  );
};

// 날짜만 선택
export const SimpleDatepicker = ({ selectedDate, onDateChange }: BaseDatepickerProps) => {
  return (
    <div>
      <BaseDatepicker
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        showInline={true} // 캘린더를 인라인으로 표시
        placeholderText="날짜를 선택하세요"
      />
    </div>
  );
};
