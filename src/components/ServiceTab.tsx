"use client";

import { useState, useCallback, useEffect } from "react";
import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";
import Dalaemfit from "@/images/dalaemfit.svg";
import Workation from "@/images/workation.svg";

const SERVICE_TABS = [
  { name: "달램핏", icon: Dalaemfit },
  { name: "워케이션", icon: Workation },
];
const CATEGORIES = ["전체", "오피스 스트레칭", "마인드풀니스"];

type ServiceTabProps = {
  onCategoryChange?: (type: string | undefined) => void;
};

export default function ServiceTab({ onCategoryChange }: ServiceTabProps) {
  const [selectedTab, setSelectedTab] = useState<string>("달램핏");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // 선택한 탭과 카테고리를 조합하여 type 설정
  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      if (category === "전체") {
        onCategoryChange?.(undefined); // 모든 카드를 출력
      } else if (selectedTab === "달램핏") {
        onCategoryChange?.(category === "오피스 스트레칭" ? "OFFICE_STRETCHING" : "MINDFULNESS");
      }
    },
    [selectedTab, onCategoryChange],
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      if (tab === "워케이션") {
        onCategoryChange?.("WORKATION");
      } else {
        setSelectedCategory("전체");
        onCategoryChange?.(undefined);
      }
    },
    [onCategoryChange],
  );

  return (
    <>
      {/* 탭 UI (달램핏 / 워케이션) */}
      <Tab
        category={
          <CategoryButton categories={CATEGORIES} setValue={handleCategoryChange}>
            {CATEGORIES.map((category) => (
              <CategoryButton.Title key={category} category={category} />
            ))}
          </CategoryButton>
        }
        targetIndex={0}
      >
        {SERVICE_TABS.map((tabItem, idx) => (
          <Tab.Item key={tabItem.name} index={idx}>
            <button onClick={() => handleTabChange(tabItem.name)}>{tabItem.name}</button>
            <tabItem.icon />
          </Tab.Item>
        ))}
      </Tab>
    </>
  );
}
