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

  return (
    <div>
      <ReviewList reviewList={data.reviews} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onClick={handlePageChange} />
    </div>
  );
}
