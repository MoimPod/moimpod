"use client";

import MyCreatedGatherings from "@/app/(common)/mypage/_components/MyCreatedGatherings";
import MyGatherings from "@/app/(common)/mypage/_components/MyGatherings";
import MyReviews from "@/app/(common)/mypage/_components/MyReviews";
import ReviewableGatherings from "@/app/(common)/mypage/_components/ReviewableGatherings";
import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";
import { useState } from "react";

const TAB_ITEMS = ["나의 모임", "나의 리뷰", "내가 만든 모임"];
const CATEGORIES = ["작성 가능한 리뷰", "작성한 리뷰"];

// 나의 모임 -> 로그인된 사용자가 참석한 모임 목록 조회
// 나의 리뷰 - 작성 가능한 리뷰 -> 로그인된 사용자가 참석한 모임 목록 조회 (리뷰 작성 여부 false 필터링)
// 나의 리뷰 - 작성한 리뷰 -> 리뷰 목록 조회 (사용자 id로 필터링)
// 내가 만든 모임 -> 모임 목록 조회 (모임 생성자(id) 로 필터링)

export default function MypageContent() {
  const [selectedTab, setSelectedTab] = useState(TAB_ITEMS[0]);
  // '나의 리뷰' 탭일 때만 카테고리를 보여줌
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  return (
    <div className="flex flex-1 flex-col gap-6 border-t-2 border-gray-900 bg-white px-6 pt-6">
      <Tab
        category={
          <CategoryButton categories={CATEGORIES} setValue={setSelectedCategory}>
            {CATEGORIES.map((category) => (
              <CategoryButton.Title key={category} category={category} />
            ))}
          </CategoryButton>
        }
        targetIndex={1}
      >
        {TAB_ITEMS.map((tabItem, idx) => (
          <Tab.Item key={tabItem} index={idx}>
            <button onClick={() => setSelectedTab(tabItem)}>{tabItem}</button>
          </Tab.Item>
        ))}
      </Tab>
      <div className={`flex flex-1 flex-col ${selectedCategory !== "작성한 리뷰" && "divide-y-2 divide-dashed"}`}>
        {selectedTab === "나의 모임" && <MyGatherings />}
        {selectedTab === "나의 리뷰" && selectedCategory === "작성 가능한 리뷰" && <ReviewableGatherings />}
        {selectedTab === "나의 리뷰" && selectedCategory === "작성한 리뷰" && <MyReviews />}
        {selectedTab === "내가 만든 모임" && <MyCreatedGatherings />}
      </div>
    </div>
  );
}
