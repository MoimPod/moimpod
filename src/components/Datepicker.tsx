"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Datepicker.module.css";

type DatepickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

export default function Datepicker({ selectedDate, onDateChange }: DatepickerProps) {
  return (
    <div className="m-4">
      <DatePicker
        dateFormat="MMMM yyyy"
        dateFormatCalendar="MMMM yyyy"
        formatWeekDay={
          (nameOfDay) => nameOfDay.substring(0, 3) // 요일을 3글자로 자르기
        }
        selected={selectedDate}
        onChange={onDateChange} // 선택한 날짜를 부모 컴포넌트로 전달
        startDate={selectedDate}
        inline
        calendarClassName={styles.calendar}
        dayClassName={(date) =>
          date?.toDateString() === selectedDate?.toDateString() ? styles["selected-day"] : styles["default-day"]
        }
      />
    </div>
  );
}
