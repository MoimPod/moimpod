"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import CategoryButton from "@/components/CategoryButton";
import MainTab from "@/components/MainTab";
import Dalaemfit from "@/images/dalaemfit.svg";
import Workation from "@/images/workation.svg";

const SERVICE_TABS = [
  { name: "달램핏", type: "DALLAEMFIT", icon: Dalaemfit },
  { name: "워케이션", type: "WORKATION", icon: Workation },
];

const CATEGORIES = [
  { name: "전체", type: "DALLAEMFIT" },
  { name: "오피스 스트레칭", type: "OFFICE_STRETCHING" },
  { name: "마인드풀니스", type: "MINDFULNESS" },
];

type ServiceTabProps = {
  searchParams: URLSearchParams; // 부모에서 받은 searchParams
  onCategoryChange: (type: string | undefined) => void;
  isFilteringLoading?: boolean; // 필터링 중인지 판단하는 변수
};

export default function ServiceTab({ onCategoryChange, isFilteringLoading }: ServiceTabProps) {
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState<string>(
    () => SERVICE_TABS.find((t) => t.type === searchParams.get("type"))?.name || "DALLAEMFIT",
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => CATEGORIES.find((c) => c.type === searchParams.get("type"))?.name || "전체",
  );

  //searchParams 변경 감지해서 반영
  useEffect(() => {
    const currentType = searchParams.get("type") || "DALLAEMFIT";

    if (currentType) {
      const tabName = SERVICE_TABS.find((t) => t.type === currentType)?.name;

      if (tabName && tabName == selectedTab) {
        setSelectedTab(tabName);

        handleTabChange(tabName);
      }
    }
  }, [searchParams]);

  // 탭 변경 핸들러
  const handleTabChange = (tabName: string) => {
    if (isFilteringLoading) return; // 필터링 중이면 변경 X

    const tabType = SERVICE_TABS.find((t) => t.name === tabName)?.type;
    if (!tabType) return;

    // URL의 type 값을 가져와서 selectedTab 업데이트
    const currentType = searchParams.get("type") || tabType; // 없으면 클릭한 탭을 기본값으로
    setSelectedTab(currentType);

    setSelectedTab(tabType);
    onCategoryChange(tabType);
    handleCategoryReset();
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryName: string) => {
    if (isFilteringLoading) return;

    const categoryType = CATEGORIES.find((c) => c.name === categoryName)?.type;
    if (!categoryType) return;

    setSelectedCategory(categoryName);
    onCategoryChange(categoryType);
  };

  // "전체" 카테고리로 리셋하는 함수
  const handleCategoryReset = useCallback(() => {
    setSelectedCategory("전체");
  }, []);

  return (
    <>
      <MainTab
        category={
          <CategoryButton
            categories={CATEGORIES.map((c) => c.name)}
            selectedCategory={selectedCategory} // 외부에서 selectedCategory를 직접 전달
            setSelectedCategory={setSelectedCategory}
            setValue={handleCategoryChange}
          >
            {CATEGORIES.map((category) => (
              <CategoryButton.Title key={category.name} category={category.name} />
            ))}
          </CategoryButton>
        }
        targetIndex={0}
      >
        {SERVICE_TABS.map((tabItem, idx) => (
          <MainTab.Item key={tabItem.name} index={idx}>
            <button
              onClick={() => handleTabChange(tabItem.name)}
              className="flex items-center"
              disabled={isFilteringLoading}
            >
              {tabItem.name}
              <tabItem.icon className="items-center" />
            </button>
          </MainTab.Item>
        ))}
      </MainTab>
    </>
  );
}
