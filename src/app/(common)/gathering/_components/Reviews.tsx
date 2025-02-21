"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";
import { useGetReviews } from "../_hooks/useGetReviews";
import { useQueryParams } from "@/hooks/useQueryParams";

const SORT = {
  latest: "latest",
  scoreDesc: "score-desc",
  scoreAsc: "score-asc",
};

export default function Reviews({ gatheringId }: { gatheringId: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObj = useQueryParams();
  const params = new URLSearchParams(searchParams.toString());
  const { data } = useGetReviews(gatheringId, paramsObj);

  const [filter, setFilter] = useState(SORT.latest);

  const handlePageChange = (page: number) => {
    const limit = 4;
    const offset = (page - 1) * limit;

    params.set("offset", offset.toString());
    params.set("limit", limit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === SORT.latest) {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
    } else if (value === SORT.scoreAsc) {
      params.set("sortBy", "score");
      params.set("sortOrder", "asc");
    } else {
      params.set("sortBy", "score");
      params.set("sortOrder", "desc");
    }

    setFilter(value);

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // sortBy, sortOrder가 없으면 기본값을 추가
    if (!params.has("sortBy") || !params.has("sortOrder")) {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
    }

    // 현재 URL을 기본 정렬값이 적용된 URL로 변경
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  if (data.reviews.length === 0) {
    return <div>리뷰가 존재하지 않습니다.</div>;
  }

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h1>

        <select value={filter} onChange={handleChange}>
          <option value="latest">최신순</option>
          <option value="score-desc">리뷰 높은순</option>
          <option value="score-asc">리뷰 낮은순</option>
        </select>
      </div>

      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
