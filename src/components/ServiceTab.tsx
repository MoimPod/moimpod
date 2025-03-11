"use client";

import { useState, useEffect } from "react";
import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";
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

export default function ServiceTab({ searchParams, onCategoryChange, isFilteringLoading }: ServiceTabProps) {
  const [selectedTab, setSelectedTab] = useState<"DALLAEMFIT" | "WORKATION">(
    () => (searchParams.get("type") || "DALLAEMFIT") as "DALLAEMFIT" | "WORKATION",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // URL이 변경되었을 때 필터링 로딩 상태 해제
  useEffect(() => {
    if (!isFilteringLoading) return;

    const currentType = searchParams.get("type") || "DALLAEMFIT";
    setSelectedTab(currentType as "DALLAEMFIT" | "WORKATION");
  }, [searchParams, isFilteringLoading]);

  // searchParams 변경 감지해서 반영
  useEffect(() => {
    const currentType = searchParams.get("type") || "DALLAEMFIT";

    if (currentType !== selectedTab) {
      setSelectedTab(currentType as "DALLAEMFIT" | "WORKATION");

      // 탭이 변경될 때, 기존에 선택한 카테고리를 유지하도록 수정
      if (currentType === "WORKATION" || currentType === "DALLAEMFIT") {
        setSelectedCategory("전체");
      } else {
        const matchedCategory = CATEGORIES.find((c) => c.type === currentType)?.name || "전체";
        setSelectedCategory(matchedCategory);
      }
    }
  }, [searchParams]);

  // 탭 변경 핸들러
  const handleTabChange = (tabName: string) => {
    if (isFilteringLoading) return; // 필터링 중이면 변경 X

    const tabType = SERVICE_TABS.find((t) => t.name === tabName)?.type;
    if (!tabType) return;

    setSelectedTab(tabType as "DALLAEMFIT" | "WORKATION");

    if (tabType === "WORKATION") {
      setSelectedCategory("전체"); // 워케이션 선택 시 카테고리 리셋
      onCategoryChange("WORKATION");
    } else {
      setSelectedCategory("전체");
      onCategoryChange("DALLAEMFIT");
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryName: string) => {
    if (isFilteringLoading) return;

    const categoryType = CATEGORIES.find((c) => c.name === categoryName)?.type;
    if (!categoryType) return;

    setSelectedCategory(categoryName);
    onCategoryChange(categoryType);
  };

  return (
    <>
      <Tab
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
          <Tab.Item key={tabItem.name} index={idx}>
            <button
              onClick={() => handleTabChange(tabItem.name)}
              className="flex items-center"
              disabled={isFilteringLoading}
            >
              {tabItem.name}
              <tabItem.icon className="items-center" />
            </button>
          </Tab.Item>
        ))}
      </Tab>
    </>
  );
}
