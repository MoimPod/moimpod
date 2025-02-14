"use client";

import { useState } from "react";

import ReviewList from "../_components/ReviewList";
import Pagination from "../_components/Pagination";

export default function Reviews() {
  const [current, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ReviewList score={1} nickname={"닉네임"} content={""} createdAt="f" />
      <Pagination currentPage={current} totalPages={10} onClick={handlePageChange} />
    </div>
  );
}
