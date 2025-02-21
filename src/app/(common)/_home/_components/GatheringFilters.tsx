"use client";

import { useState } from "react";
import DateSelect from "@/components/Filtering/DateSelect";
import LocationSelect from "@/components/Filtering/LocationSelect";
import SortButton from "@/components/Filtering/SortButton";

type GatheringFiltersProps = {
  onChange: (filters: { location?: string; dateTime?: string; sortBy?: string }) => void;
};

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
      <div className="flex flex-wrap gap-3 md:flex-nowrap">
        <LocationSelect
          selectedLocation={selectedLocation}
          setSelectedLocation={(location) => {
            setSelectedLocation(location);
            handleFilterChange();
          }}
        />
        <div className="sm:w-auto">
          <DateSelect
            onDateChange={(date) => {
              setSelectedDate(date);
              handleFilterChange();
            }}
          />
        </div>
      </div>
      <SortButton
        setSortType={(sort) => {
          setSortType(sort);
          handleFilterChange();
        }}
      />
    </div>
  );
}
