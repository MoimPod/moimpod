"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";
import Dalaemfit from "@/images/dalaemfit.svg";
import Workation from "@/images/workation.svg";

const SERVICE_TABS = [
  { name: "달램핏", type: "DALLAEMFIT", icon: Dalaemfit },
  { name: "워케이션", type: "WORKATION", icon: Workation },
];

const CATEGORIES = [
  { name: "전체", type: "DALLAEMFIT" }, // 오피스 스트레칭 + 마인드풀니스 포함
  { name: "오피스 스트레칭", type: "OFFICE_STRETCHING" },
  { name: "마인드풀니스", type: "MINDFULNESS" },
];

type ServiceTabProps = {
  onCategoryChange: (type: string | undefined) => void;
};

export default function ServiceTab({ onCategoryChange }: ServiceTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // type이 없는 경우 기본값 설정
    if (!params.get("type")) {
      params.set("type", "DALLAEMFIT");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  // 탭 변경 핸들러
  const handleTabChange = (tabName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const tabType = SERVICE_TABS.find((t) => t.name === tabName)?.type;

    if (!tabType) return;

    if (tabType === "WORKATION") {
      params.set("type", "WORKATION");
      onCategoryChange("WORKATION");
    } else {
      params.set("type", "DALLAEMFIT");
      onCategoryChange("DALLAEMFIT");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryType = CATEGORIES.find((c) => c.name === categoryName)?.type;

    if (!categoryType) return;

    params.set("type", categoryType);
    onCategoryChange(categoryType);

    router.replace(`?${params.toString()}`, { scroll: false });
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
