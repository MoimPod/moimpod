"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { format } from "date-fns";
import DateSelect from "@/components/Filtering/DateSelect";
import LocationSelect from "@/components/Filtering/LocationSelect";
import SortButton from "@/components/SortButton";

type GatheringFiltersProps = {
  onChange: (filters: Partial<{ location?: string; date?: string; sortBy?: string }>) => void;
};

const sortOption = [
  { label: "마감 임박", value: "registrationEnd" },
  { label: "참여 인원 순", value: "participantCount" },
] as const;

export default function GatheringFilters({ onChange }: GatheringFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [sortFilter, setSortFilter] = useState("registrationEnd");

  useEffect(() => {
    // URL 쿼리에서 location 값이 있으면 부모 상태를 업데이트
    const loc = params.get("location");
    if (loc) {
      onChange({ location: loc });
    }
    // 기본 정렬값도 전달
    onChange({ sortBy: sortFilter });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <LocationSelect
            selectedLocation={searchParams.get("location") || ""}
            setSelectedLocation={(location) => {
              params.set("location", location || "");
              router.push(`${pathname}?${params.toString()}`);
              onChange({ location: location || undefined });
            }}
            className="w-full"
          />
          <DateSelect
            onDateChange={(date) => {
              if (date) {
                const formattedDate = format(date, "yyyy-MM-dd");
                params.set("date", formattedDate);
                router.push(`${pathname}?${params.toString()}`);
                onChange({ date: formattedDate });
              } else {
                params.delete("date");
                router.push(`${pathname}`); // url 초기화
                onChange({ date: undefined });
              }
            }}
          />
        </div>
        <SortButton
          setSortType={(sort) => {
            setSortFilter(sort);
            onChange({ sortBy: sort || undefined });
            params.set("sortBy", sort);
            router.push(`${pathname}?${params.toString()}`);
          }}
          sortOption={sortOption}
        />
      </div>
    </div>
  );
}
