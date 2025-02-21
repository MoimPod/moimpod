"use client";

import Dropdown from "@/components/Dropdown";

type LocationSelectProps = {
  className?: string;
  selectedLocation?: string;
  setSelectedLocation?: (location: string) => void;
};

export default function LocationSelect({ className, selectedLocation = "", setSelectedLocation }: LocationSelectProps) {
  const locations: string[] = ["건대입구", "을지로3가", "신림", "홍대입구"];

  return (
    <div className="flex gap-3">
      <Dropdown
        options={locations}
        selected={selectedLocation}
        onSelect={(location) => {
          if (setSelectedLocation) setSelectedLocation(location);
        }}
        placeholder="지역 선택"
        className={className}
      />
    </div>
  );
}
