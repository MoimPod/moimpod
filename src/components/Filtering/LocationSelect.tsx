"use client";

import Dropdown from "@/components/Dropdown";

type LocationSelectProps = {
  className?: string;
  selectedLocation?: string;
  setSelectedLocation?: (location: string | null) => void;
};

export default function LocationSelect({ className, selectedLocation = "", setSelectedLocation }: LocationSelectProps) {
  const locations: string[] = ["지역 전체", "건대입구", "을지로3가", "신림", "홍대입구"];

  return (
    <div className="flex w-full">
      <Dropdown
        options={locations}
        selected={selectedLocation}
        onSelect={(location) => {
          if (setSelectedLocation) {
            setSelectedLocation(location === "지역 전체" ? null : location);
          }
        }}
        placeholder="지역 선택"
        className={className}
      />
    </div>
  );
}
