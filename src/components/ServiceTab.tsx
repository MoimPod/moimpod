"use client";

import { useState, useCallback } from "react";
import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";
import Dalaemfit from "@/images/dalaemfit.svg";
import Workation from "@/images/workation.svg";

const SERVICE_TABS = [
  { name: "달램핏", icon: Dalaemfit },
  { name: "워케이션", icon: Workation },
];

const CATEGORIES = [
  { name: "전체", type: "DALLAEMFIT" }, // 오피스 스트레칭 + 마인드풀니스 포함
  { name: "오피스 스트레칭", type: "OFFICE_STRETCHING" },
  { name: "마인드풀니스", type: "MINDFULNESS" },
];

type ServiceTabProps = {
  onCategoryChange?: (type: string | undefined) => void;
};

export default function ServiceTab({ onCategoryChange }: ServiceTabProps) {
  const [selectedTab, setSelectedTab] = useState<"달램핏" | "워케이션">("달램핏");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // 카테고리 선택 시 필터 적용
  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);

      if (selectedTab === "달램핏") {
        // "전체" 선택 시 달램핏(오피스 스트레칭 + 마인드풀니스)로 설정
        const selectedType = category === "전체" ? "DALLAEMFIT" : CATEGORIES.find((c) => c.name === category)?.type;
        onCategoryChange?.(selectedType);
      }
    },
    [selectedTab, onCategoryChange],
  );

  // 탭 선택 시 필터 적용
  const handleTabChange = useCallback(
    (tab: "달램핏" | "워케이션") => {
      setSelectedTab(tab);
      if (tab === "워케이션") {
        onCategoryChange?.("WORKATION");
      } else {
        const selectedType =
          selectedCategory === "전체" ? "DALLAEMFIT" : CATEGORIES.find((c) => c.name === selectedCategory)?.type;
        onCategoryChange?.(selectedType);
      }
    },
    [selectedCategory, onCategoryChange],
  );

  return (
    <>
      {/* 탭 UI (달램핏 / 워케이션) */}
      <Tab
        category={
          <CategoryButton categories={CATEGORIES.map((c) => c.name)} setValue={handleCategoryChange}>
            {CATEGORIES.map((category) => (
              <CategoryButton.Title key={category.name} category={category.name} />
            ))}
          </CategoryButton>
        }
        targetIndex={0}
      >
        {SERVICE_TABS.map((tabItem, idx) => (
          <Tab.Item key={tabItem.name} index={idx}>
            <button onClick={() => handleTabChange(tabItem.name as "달램핏" | "워케이션")}>{tabItem.name}</button>
            <tabItem.icon />
          </Tab.Item>
        ))}
      </Tab>
    </>
  );
}
