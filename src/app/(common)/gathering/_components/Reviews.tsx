"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";
import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";
import { useGetReviews } from "@/hooks/useGetReviews";
import {
  QUERY_PARAMS,
  SORT_OPTIONS,
  SORT_BY,
  SORT_ORDER,
  DEFAULT_QUERY_VALUES,
  REVIEW_LIMIT,
} from "../_utils/constants";
import { getInitialFilter } from "../_utils/queryUtils";
import type { ReviewQuery } from "../types";

export default function Reviews({ gatheringId, reviewQuery }: { gatheringId: string; reviewQuery: ReviewQuery }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObj = useQueryParams();
  const params = new URLSearchParams(searchParams.toString());
  const query = Object.keys(paramsObj).length ? paramsObj : reviewQuery;

  const { data } = useGetReviews(gatheringId, query);

  // 현재 URL의 정렬 기준을 기반으로 초기 필터 설정
  const [filter, setFilter] = useState(getInitialFilter(searchParams));

  const handlePageChange = (page: number) => {
    const limit = REVIEW_LIMIT;
    const offset = (page - 1) * limit;

    params.set(QUERY_PARAMS.OFFSET, offset.toString());
    params.set(QUERY_PARAMS.LIMIT, limit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === SORT_OPTIONS.LATEST) {
      params.set(QUERY_PARAMS.SORT_BY, SORT_BY.CREATED_AT);
      params.set(QUERY_PARAMS.SORT_ORDER, SORT_ORDER.DESC);
    } else if (value === SORT_OPTIONS.SCORE_ASC) {
      params.set(QUERY_PARAMS.SORT_BY, SORT_BY.SCORE);
      params.set(QUERY_PARAMS.SORT_ORDER, SORT_ORDER.ASC);
    } else {
      params.set(QUERY_PARAMS.SORT_BY, SORT_BY.SCORE);
      params.set(QUERY_PARAMS.SORT_ORDER, SORT_ORDER.DESC);
    }

    params.set(QUERY_PARAMS.OFFSET, "0"); // 첫페이지로

    setFilter(value);

    router.push(`${pathname}?${params.toString()}`);
  };

  // 기본 URL 쿼리 값을 설정하는 useEffect
  useEffect(() => {
    const defaultParams = new URLSearchParams(params.toString());

    if (!defaultParams.has(QUERY_PARAMS.GATHERING_ID)) {
      defaultParams.set(QUERY_PARAMS.GATHERING_ID, gatheringId);
    }

    Object.entries(DEFAULT_QUERY_VALUES).forEach(([key, value]) => {
      if (!defaultParams.has(key)) defaultParams.set(key, value);
    });

    router.replace(`${pathname}?${defaultParams.toString()}`);
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

        <select value={filter} onChange={handleChange}>
          <option value={SORT_OPTIONS.LATEST}>최신순</option>
          <option value={SORT_OPTIONS.SCORE_DESC}>리뷰 높은순</option>
          <option value={SORT_OPTIONS.SCORE_ASC}>리뷰 낮은순</option>
        </select>
      </div>

      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
