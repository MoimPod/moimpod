import ReviewsAverage from "@/app/(common)/reviews/_components/ReviewsAverage";

import { Suspense } from "react";
import AllReview from "../reviews/_components/AllReview";
import GatheringLogo from "@/images/gathering_logo.svg";

export default function Page() {
  return (
    <div className="w-full">
      <div className="mb-5 flex gap-6 pt-8">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-2xl font-semibold text-gray-900">모든 리뷰</div>
          <div className="text-sm font-medium text-gray-700">같이달램을 이용한 분들은 이렇게 느꼈어요 🫶</div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AllReview>
          <ReviewsAverage />
        </AllReview>
      </Suspense>
    </div>
  );
}
