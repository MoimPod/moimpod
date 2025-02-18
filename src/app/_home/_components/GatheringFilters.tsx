"use client";

import { useState } from "react";
import DateSelect from "@/components/Filtering/DateSelect";
import LocationSelect from "@/components/Filtering/LocationSelect";
import SortButton from "@/components/Filtering/SortButton";

type GatheringFiltersProps = {
  onChange: (filters: { city?: string; district?: string; dateTime?: string; sortBy?: string }) => void;
};

export default function GatheringFilters({ onChange }: GatheringFiltersProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sortType, setSortType] = useState<string>("registrationEnd"); // 기본값: 마감 임박

  const handleFilterChange = () => {
    onChange({
      city: selectedCity || undefined,
      district: selectedDistrict || undefined,
      dateTime: selectedDate ? selectedDate.toISOString() : undefined,
      sortBy: sortType,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-3 md:flex-nowrap">
        <LocationSelect
          selectedCity={selectedCity}
          setSelectedCity={(city) => {
            setSelectedCity(city);
            handleFilterChange();
          }}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={(district) => {
            setSelectedDistrict(district);
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
