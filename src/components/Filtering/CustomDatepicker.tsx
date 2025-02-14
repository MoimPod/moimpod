"use client";

import React from "react";
import { Datepicker } from "flowbite-react";

type CustomDatepickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

export default function CustomDatepicker({ selectedDate, onDateChange }: CustomDatepickerProps) {
  const datepickerTheme = {
    popup: {
      header: {
        title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
          },
        },
      },
    },
    views: {
      days: {
        items: {
          item: {
            selected: "bg-blue-500 text-white hover:bg-blue-600", // 선택된 날짜 색상 변경
          },
        },
      },
    },
  };
  return (
    <div>
      <Datepicker
        inline
        onChange={onDateChange}
        showClearButton={false}
        showTodayButton={false}
        theme={datepickerTheme}
      />
    </div>
  );
}
