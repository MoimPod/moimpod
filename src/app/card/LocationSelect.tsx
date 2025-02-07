"use client";

import { useState } from "react";
import Image from "next/image";

export default function LocationSelect() {
  const cities: Record<string, string[]> = {
    지역전체: [],
    서울시: ["강남구", "서초구", "송파구"],
    경기도: ["수원시", "용인시", "성남시"],
    부산광역시: ["해운대구", "남구", "동구"],
    대구광역시: ["중구", "달서구", "수성구"],
  };

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const [isCityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setDistrictDropdownOpen] = useState(false);

  // 시,도 상태 업데이트
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(""); // 시가 변경되면 구 선택 초기화
    setCityDropdownOpen(false);
  };

  // 구, 군 상태 업데이트
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setDistrictDropdownOpen(false);
  };

  return (
    <div className="my-3 flex gap-3">
      <div className="relative">
        <div
          className={`mb-2 flex w-[110px] cursor-pointer rounded-lg border p-2 text-sm font-medium ${!isCityDropdownOpen ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-white"} `}
          onClick={() => setCityDropdownOpen(!isCityDropdownOpen)}
        >
          {selectedCity || "시/도 선택"}
          {!isCityDropdownOpen ? (
            <Image
              src={"/images/dropdown_down_arrow_black.svg"}
              alt={"화살표  ic"}
              width={24}
              height={24}
              className="ml-auto"
            />
          ) : (
            <Image
              src={"/images/dropdown_down_arrow_white.svg"}
              alt={"화살표  ic"}
              width={24}
              height={24}
              className="ml-auto"
            />
          )}
        </div>
        {isCityDropdownOpen && (
          <div className="absolute z-10 w-[110px] rounded-lg border bg-white p-2 text-sm font-medium shadow-md">
            {Object.keys(cities).map((city) => (
              <div key={city} onClick={() => handleCitySelect(city)} className="rounded-lg p-2 hover:bg-orange-100">
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* District Dropdown */}
      <div className="relative">
        <div
          className={`mb-2 flex w-[110px] cursor-pointer rounded-lg border p-2 text-sm font-medium ${!isDistrictDropdownOpen ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-white"} `}
          onClick={() => selectedCity && setDistrictDropdownOpen(!isDistrictDropdownOpen)}
        >
          {selectedDistrict || "구/군 선택"}
          {!isDistrictDropdownOpen ? (
            <Image
              src={"/images/dropdown_down_arrow_black.svg"}
              alt={"화살표  ic"}
              width={24}
              height={24}
              className="ml-auto"
            />
          ) : (
            <Image
              src={"/images/dropdown_down_arrow_white.svg"}
              alt={"화살표  ic"}
              width={24}
              height={24}
              className="ml-auto"
            />
          )}
        </div>
        {isDistrictDropdownOpen && (
          <div className="absolute z-10 w-[110px] rounded-lg border bg-white p-2 text-sm font-medium shadow-md">
            {selectedCity &&
              cities[selectedCity]?.map((district) => (
                <div
                  key={district}
                  onClick={() => handleDistrictSelect(district)}
                  className="rounded-lg p-2 hover:bg-orange-100"
                >
                  {district}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
