"use client";

import { useState } from "react";
import DateSelect from "@/components/Filtering/DateSelect";
import LocationSelect from "@/components/Filtering/LocationSelect";
import SortButton from "@/components/SortButton";

type GatheringFiltersProps = {
  onChange: (filters: { location?: string; dateTime?: string; sortBy?: string }) => void;
};

const sortOption = [
  { label: "마감 임박", value: "registrationEnd" },
  { label: "참여 인원 순", value: "participantCount" },
  { label: "모임 날짜 순", value: "dateTime" },
] as const;

export default function GatheringFilters({ onChange }: GatheringFiltersProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortType, setSortType] = useState<string>("registrationEnd"); // 기본값: 마감 임박

  const handleFilterChange = () => {
    onChange({
      location: selectedLocation || undefined,
      dateTime: selectedDate ? selectedDate.toISOString() : undefined,
      sortBy: sortType,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <LocationSelect
          selectedLocation={selectedLocation}
          setSelectedLocation={(location) => {
            setSelectedLocation(location);
            handleFilterChange();
          }}
          className="w-full"
        />
        <DateSelect
          onDateChange={(date) => {
            setSelectedDate(date);
            handleFilterChange();
          }}
        />
      </div>
      <SortButton
        setSortType={(sort) => {
          setSortType(sort);
          handleFilterChange();
        }}
        sortOption={sortOption}
      />
    </div>
  );
}
