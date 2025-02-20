"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";
import { useGetReviews } from "../_hooks/useGetReviews";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function Reviews({ gatheringId }: { gatheringId: string }) {
  const paramsObj = useQueryParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sortOrder") || "latest";

  const { data } = useGetReviews(gatheringId, paramsObj);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    const limit = 2;
    const offset = (page - 1) * limit;

    newSearchParams.set("offset", offset.toString());
    newSearchParams.set("limit", limit.toString()); // limit도 유지

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value === "latest") {
      params.delete("sortBy");
      params.delete("sortOrder");
    } else {
      params.set("sortBy", "score");
      params.set("sortOrder", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  if (data.reviews.length === 0) {
    return <div>리뷰가 존재하지 않습니다.</div>;
  }

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h1>

        <select value={sortOrder} onChange={handleChange}>
          <option value="latest">최신순</option>
          <option value="desc">리뷰 높은순</option>
          <option value="asc">리뷰 낮은순</option>
        </select>
      </div>

      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
