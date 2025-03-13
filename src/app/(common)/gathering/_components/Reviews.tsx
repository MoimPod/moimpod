"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SortButton from "@/components/SortButton";
import { useQueryParams } from "@/hooks/useQueryParams";
import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";
import { useGetReviews } from "@/hooks/useGetReviews";
import { QUERY_PARAMS, SORT_VALUE, REVIEW_LIMIT, SORT_BY, SORT_ORDER, SORT_OPTIONS } from "../_utils/constants";
import { getInitialSort } from "../_utils/queryUtils";
import type { ReviewQuery } from "@/types";

export default function Reviews({ reviewQuery }: { reviewQuery: ReviewQuery }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObj = useQueryParams(searchParams);
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const query = Object.keys(paramsObj).length ? paramsObj : reviewQuery;
  console.log("reviewQuery", reviewQuery);
  console.log("paramsObj", paramsObj);

  const { data } = useGetReviews(reviewQuery);

  const handlePageChange = (page: number) => {
    const limit = REVIEW_LIMIT;
    const offset = (page - 1) * limit;

    params.set(QUERY_PARAMS.offset, offset.toString());
    params.set(QUERY_PARAMS.limit, limit.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (selected: string) => {
    const sort = selected;

    if (sort === SORT_VALUE.latest) {
      // 최신순
      params.set(QUERY_PARAMS.sortBy, SORT_BY.createdAt);
      params.set(QUERY_PARAMS.sortOrder, SORT_ORDER.desc);
    } else if (sort === SORT_VALUE.highScore) {
      // 별점 높은순
      params.set(QUERY_PARAMS.sortBy, SORT_BY.score);
      params.set(QUERY_PARAMS.sortOrder, SORT_ORDER.desc);
    } else if (sort === SORT_VALUE.lowScore) {
      // 별점 낮은순
      params.set(QUERY_PARAMS.sortBy, SORT_BY.score);
      params.set(QUERY_PARAMS.sortOrder, SORT_ORDER.asc);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

        <SortButton
          setSortType={handleSortChange}
          sortOption={SORT_OPTIONS}
          defaultSort={getInitialSort(searchParams)}
        />
      </div>

      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
