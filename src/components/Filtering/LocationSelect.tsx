"use client";

import { useState } from "react";
import Dropdown from "@/components/Dropdown";

type LocationSelectProps = {
  className?: string;
};

export default function LocationSelect({ className }: LocationSelectProps) {
  const cities: Record<string, string[]> = {
    지역전체: [],
    서울시: ["강남구", "서초구", "송파구"],
    경기도: ["수원시", "용인시", "성남시"],
    부산광역시: ["해운대구", "남구", "동구"],
    대구광역시: ["중구", "달서구", "수성구"],
  };

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  return (
    <div className="flex gap-3">
      <Dropdown
        options={Object.keys(cities)}
        selected={selectedCity}
        onSelect={(city) => {
          setSelectedCity(city);
          setSelectedDistrict(""); // 시가 바뀌면 구 초기화
        }}
        placeholder="시/도 선택"
        className={className}
      />
      <Dropdown
        options={selectedCity ? cities[selectedCity] : []}
        selected={selectedDistrict}
        onSelect={setSelectedDistrict}
        placeholder="구/군 선택"
        disabled={!selectedCity}
        className={className}
      />
    </div>
  );
}
