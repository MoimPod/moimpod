"use client";

import { useState } from "react";
import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";
import { useGetReviews } from "@/app/(common)/gathering/_hooks/useGetReviews";

export default function Reviews({ gatheringId }: { gatheringId: string }) {
  const [current, setCurrentPage] = useState(1);

  const { data } = useGetReviews(gatheringId);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (data.reviews.length === 0) {
    return <div>리뷰가 존재하지 않습니다.</div>;
  }

  return (
    <div className="bg-white p-6">
      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
