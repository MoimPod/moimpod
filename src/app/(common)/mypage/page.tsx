"use client";

import ProfileSection from "@/components/ProfileSection/ProfileSection";
import Tab from "@/components/Tab";
import CategoryButton from "@/components/CategoryButton";

const tabItems1 = ["나의 모임", "나의 리뷰", "내가 만든 모임"];
const categories = ["작성 가능한 리뷰", "작성한 리뷰"];

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-[30px] pt-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">마이 페이지</h2>
        <ProfileSection />
      </div>
      {/* 마이페이지의 콘텐츠 */}
      <div className="flex flex-1 flex-col gap-6 border-t-2 border-gray-900 bg-white px-6 pt-6">
        <Tab
          category={
            <CategoryButton categories={categories}>
              {categories.map((category) => (
                <CategoryButton.Title key={category} category={category} />
              ))}
            </CategoryButton>
          }
          targetIndex={1}
        >
          {tabItems1.map((tabItem, idx) => (
            <Tab.Item key={tabItem} index={idx}>
              {tabItem}
            </Tab.Item>
          ))}
        </Tab>
        <div className="border">리스트 컨테이너</div>
      </div>
    </div>
  );
}
