"use client";

import { useState, useEffect } from "react";
import { CardData, useGatheringStore } from "@/stores/useGateringStore";
import { useFetchGatherings } from "@/app/_home/_hooks/useFetchGatherings";
import DateSelect from "@/components/Filtering/DateSelect";
import LocationSelect from "@/components/Filtering/LocationSelect";
import SortButton from "@/components/Filtering/SortButton";

type GatheringFiltersProps = {
  onFetch: (cards: CardData[]) => void;
};

export default function GatheringFilters({ onFetch }: GatheringFiltersProps) {
  const { data: fetchedCards = [] } = useFetchGatherings();

  const { setFilters, fetchGatherings } = useGatheringStore();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [sortType, setSortType] = useState<string>("registrationEnd"); // 기본값: 마감 임박

  useEffect(() => {
    // 선택된 값이 변경될 때마다 API 요청
    setFilters({ city: selectedCity, district: selectedDistrict, sortBy: sortType });
    fetchGatherings();
  }, [selectedCity, selectedDistrict, setFilters, fetchGatherings]);

  useEffect(() => {
    onFetch(fetchedCards);
  }, [fetchedCards]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-3 md:flex-nowrap">
        <LocationSelect
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />
        <div className="sm:w-auto">
          <DateSelect />
        </div>
      </div>
      <SortButton setSortType={setSortType} />
    </div>
  );
}
