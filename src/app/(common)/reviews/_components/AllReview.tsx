"use client";

import { useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import ListItem from "@/components/ListItem";
import DashedLine from "@/components/DashedLine";
import Score from "@/components/Score";
import SortButton from "@/components/SortButton";
import LocationSelect from "@/components/Filtering/LocationSelect";
import DateSelect from "@/components/Filtering/DateSelect";
import ServiceTab from "@/components/ServiceTab";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useAllReview } from "../_hooks/useAllReview";
import { GATHERING_TYPE } from "@/utils/constants";
import { SORT_OPTION, SORT_MAP } from "../_utils/constants";
import type { ReviewQuery } from "@/types";

type AllReviewProps = {
  children: React.ReactNode;
  reviewQuery: ReviewQuery;
};

export default function AllReview({ children, reviewQuery }: AllReviewProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllReview(reviewQuery);

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

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelect = (selected: string) => {
    const sortConfig = SORT_MAP[selected];

    if (sortConfig) {
      params.set("sortBy", sortConfig.sortBy);
      params.set("sortOrder", sortConfig.sortOrder);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const dateFormat = format(date, "yyyy-MM-dd");
      params.set("date", dateFormat);
    } else {
      params.delete("date");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleLocationSelect = (location: string | undefined) => {
    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    Object.entries(reviewQuery).forEach(([key, value]) => {
      if (!params.has(key)) params.set(key, value.toString());
    });
  }, []);

  return (
    <div className="mt-6">
      <ServiceTab onCategoryChange={handleTypeChange} searchParams={searchParams} />
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
            <SortButton setSortType={handleSelect} sortOption={SORT_OPTION} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            {data?.reviews?.length > 0 ? (
              data.reviews.map((item, idx) => (
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
                        {GATHERING_TYPE[item.gathering.type]} 이용 · {item.gathering.location}
                      </ListItem.ServiceInfo>
                    </div>

                    <ListItem.MetaInfo
                      imageUrl={item.user.image ?? "/images/default_image.png"}
                      primary={item.user.name}
                      secondary={item.gathering.dateTime}
                    />
                  </ListItem>
                  <DashedLine className="mt-4" />
                  {idx === data.reviews.length - 1 ? <div ref={observerRef} /> : null}
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
