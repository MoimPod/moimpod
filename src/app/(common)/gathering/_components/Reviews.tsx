"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SortButton from "@/components/SortButton";
import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";
import { useGetReviews } from "@/hooks/useGetReviews";
import { QUERY_PARAMS, SORT_VALUE, REVIEW_LIMIT, SORT_BY, SORT_ORDER, SORT_OPTIONS } from "../_utils/constants";
import { getSortValue } from "../_utils/queryUtils";
import type { ReviewQuery } from "@/types";

export default function Reviews({ reviewQuery }: { reviewQuery: ReviewQuery }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const { data } = useGetReviews(reviewQuery);

  const handlePageChange = (page: number) => {
    const limit = REVIEW_LIMIT;
    const offset = (page - 1) * limit;

    params.set(QUERY_PARAMS.offset, offset.toString());
    params.set(QUERY_PARAMS.limit, limit.toString());

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (selected: string) => {
    const sortBy = selected === SORT_VALUE.latest ? SORT_BY.createdAt : SORT_BY.score;
    const sortOrder = selected === SORT_VALUE.lowScore ? SORT_ORDER.asc : SORT_ORDER.desc;

    params.set(QUERY_PARAMS.sortBy, sortBy);
    params.set(QUERY_PARAMS.sortOrder, sortOrder);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    Object.entries(reviewQuery).forEach(([key, value]) => {
      if (!params.has(key)) params.set(key, value.toString());
    });
  }, []);

  if (data.reviews.length === 0) {
    return (
      <div className="h-full bg-white p-6">
        <h1 className="text-lg font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h1>
        <div className="flex h-full flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
          아직 리뷰가 없어요
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h1>
        <SortButton setSortType={handleSortChange} sortOption={SORT_OPTIONS} defaultSort={getSortValue(searchParams)} />
      </div>

      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
