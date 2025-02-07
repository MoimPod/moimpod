"use client";

import { useState } from "react";

export default function LocationSelect() {
  const cities: Record<string, string[]> = {
    서울시: ["강남구", "서초구", "송파구"],
    경기도: ["수원시", "용인시", "성남시"],
    부산광역시: ["해운대구", "남구", "동구"],
    대구광역시: ["중구", "달서구", "수성구"],
  };

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // 시,도 상태 업데이트
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict(""); // 시가 변경되면 구 선택 초기화
  };

  // 구, 군 상태 업데이트
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="my-3 flex gap-3">
      <select
        id="cities"
        className="block w-[110px] rounded-lg border border-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        onChange={handleCityChange}
      >
        <option selected>시/도 선택</option>
        {Object.keys(cities).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        id="districts"
        className="block w-[110px] rounded-lg border border-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        onChange={handleDistrictChange}
      >
        <option selected>구/군 선택</option>
        {selectedCity &&
          cities[selectedCity]?.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
      </select>
    </div>
  );
}
