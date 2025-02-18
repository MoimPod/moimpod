"use client";

import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";

const TAB_ITEMS = ["나의 모임", "나의 리뷰", "내가 만든 모임"];
const CATEGORIES = ["작성 가능한 리뷰", "작성한 리뷰"];

export default function MypageContent() {
  return (
    <div className="flex flex-1 flex-col gap-6 border-t-2 border-gray-900 bg-white px-6 pt-6">
      <Tab
        category={
          <CategoryButton categories={CATEGORIES}>
            {CATEGORIES.map((category) => (
              <CategoryButton.Title key={category} category={category} />
            ))}
          </CategoryButton>
        }
        targetIndex={1}
      >
        {TAB_ITEMS.map((tabItem, idx) => (
          <Tab.Item key={tabItem} index={idx}>
            {tabItem}
          </Tab.Item>
        ))}
      </Tab>
      <div className="flex-1 border">리스트 컨테이너</div>
    </div>
  );
}
