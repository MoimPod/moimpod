"use client";

import ListItem from "@/components/ListItem";
import DashedLine from "@/components/DashedLine";
import Score from "@/components/Score";
import SortButton from "@/components/SortButton";
import LocationSelect from "@/components/Filtering/LocationSelect";
import DateSelect from "@/components/Filtering/DateSelect";
import { useAllReview } from "@/app/(common)/reviews/_hooks/useFetchData";
import { useEffect } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";
import ServiceTab from "@/app/(common)/_home/_components/ServiceTab";

const sortOptions = [
  { label: "최신순", value: "latest" }, // sortBy=createdAt&sortOrder=desc
  { label: "별점 높은순", value: "highScore" }, // sortBy=score&sortOrder=desc
  { label: "참여 인원순", value: "highParticipants" }, // sortBy=participantCount&sortOrder=desc
];

export const SORT_OPTIONS = ["최신순", "별점 높은순", "참여 인원순"];

export const SORT_VALUE = ["createdAt", "score", "participants"] as const;

export const LOCATION_OPTIONS = ["전체", "건대입구", "을지로3가", "신림", "홍대입구"];

export const SORT = SORT_OPTIONS.map((option, index) => ({
  value: SORT_VALUE[index],
  option,
}));

export default function AllReview({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const query = useQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllReview(query);

  const { observerRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handleTypeChange = (type: string | undefined) => {
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelect = (selected: string) => {
    const sort = selected;

    if (sort === "latest") {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
    } else if (sort === "highScore") {
      params.set("sortBy", "score");
      params.set("sortOrder", "desc");
    } else if (sort === "highParticipants") {
      params.set("sortBy", "participantCount");
      params.set("sortOrder", "desc");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDateSelect = (date: Date | null) => {
    // TODO: 날짜 선택 시 동작
  };

  const handleLocationSelect = (location: string | undefined) => {
    if (!location) {
      params.delete("location");
    } else {
      params.set("location", location);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const DEFAULT_PARAMS = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  useEffect(() => {
    Object.entries(DEFAULT_PARAMS).forEach(([key, value]) => {
      if (!params.has(key)) params.set(key, value);
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <div className="mt-9">
      <ServiceTab onCategoryChange={handleTypeChange} />
      <hr className="border-1 mb-6 mt-4" />
      {children}
      <div className="mt-6 border-t-2 border-black bg-white p-6">
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LocationSelect
                selectedLocation={searchParams.get("location") || ""}
                setSelectedLocation={handleLocationSelect}
                className="w-full"
              />
              <DateSelect onDateChange={handleDateSelect} />
            </div>
            <SortButton setSortType={handleSelect} sortOption={sortOptions} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            {data?.reviews.map((item, idx) => (
              <div key={item.id}>
                <ListItem
                  CardImage={
                    <Image
                      src={item.gathering.image}
                      alt="모임 이미지"
                      width={280}
                      height={156}
                      className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                    />
                  }
                >
                  <div className="mb-2 flex flex-col gap-3">
                    <Score score={item.score} />
                    <ListItem.Body>{item.comment}</ListItem.Body>
                    <ListItem.ServiceInfo>
                      {item.gathering.type} 이용 · {item.gathering.location}
                    </ListItem.ServiceInfo>
                  </div>

                  <ListItem.MetaInfo imageUrl={item.user.image} primary={item.user.name} secondary={item.createdAt} />
                </ListItem>
                <DashedLine className="mt-4" />
                {idx === data.reviews.length - 1 ? <div ref={observerRef} /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
