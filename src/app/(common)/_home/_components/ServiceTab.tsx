"use client";

import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";
import Dalaemfit from "@/images/dalaemfit.svg";
import Workation from "@/images/workation.svg";

const serviceTab = [
  { name: "달램핏", icon: Dalaemfit },
  { name: "워케이션", icon: Workation },
];

const CATEGORIES = ["전체", "오피스 스트레칭", "마인드풀니스"];

export default function ServiceTab() {
  return (
    <Tab
      category={
        <CategoryButton categories={CATEGORIES}>
          {CATEGORIES.map((category) => (
            <CategoryButton.Title key={category} category={category} />
          ))}
        </CategoryButton>
      }
      targetIndex={0}
    >
      {serviceTab.map((tabItem, idx) => (
        <Tab.Item key={tabItem.name} index={idx}>
          {tabItem.name}
          <tabItem.icon />
        </Tab.Item>
      ))}
    </Tab>
  );
}
