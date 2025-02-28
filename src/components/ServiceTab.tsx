"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
};

export default function ServiceTab({ searchParams, onCategoryChange }: ServiceTabProps) {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<"DALLAEMFIT" | "WORKATION">(
    () => (searchParams.get("type") || "DALLAEMFIT") as "DALLAEMFIT" | "DALLAEMFIT",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // searchParams 변경 감지해서 반영
  useEffect(() => {
    const currentType = searchParams.get("type");

    if (currentType !== selectedTab) {
      setSelectedTab(currentType as "DALLAEMFIT" | "WORKATION");

      // 탭이 변경될 때, 기존에 선택한 카테고리를 유지하도록 수정
      if (currentType === "WORKATION") {
        setSelectedCategory("전체");
      } else {
        const matchedCategory = CATEGORIES.find((c) => c.type === currentType)?.name || "전체";
        setSelectedCategory(matchedCategory);
      }
    }
  }, [searchParams]);

  // 탭 변경 핸들러
  const handleTabChange = (tabName: string) => {
    const tabType = SERVICE_TABS.find((t) => t.name === tabName)?.type;
    if (!tabType) return;

    setSelectedTab(tabType as "DALLAEMFIT" | "WORKATION");

    if (tabType === "WORKATION") {
      setSelectedCategory("전체"); // 워케이션 선택 시 카테고리 리셋
      onCategoryChange("WORKATION");
    } else {
      onCategoryChange("DALLAEMFIT");
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryName: string) => {
    const categoryType = CATEGORIES.find((c) => c.name === categoryName)?.type;
    if (!categoryType) return;

    setSelectedCategory(categoryName);
    onCategoryChange(categoryType);
  };

  return (
    <>
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
            <button onClick={() => handleTabChange(tabItem.name)}>{tabItem.name}</button>
            <tabItem.icon />
          </Tab.Item>
        ))}
      </Tab>
    </>
  );
}
