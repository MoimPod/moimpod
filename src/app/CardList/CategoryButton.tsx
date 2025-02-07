"use client";

import { useState } from "react";

export default function CategoryButton() {
  const categories = ["전체", "오피스 스트레칭", "마인드풀니스"];

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // 카테고리 상태 업데이트
  const handlecategoriesChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex gap-3">
      {categories.map((category, i) => {
        return (
          <div
            key={i}
            onClick={() => handlecategoriesChange(category)}
            className={`h-[40px] w-auto rounded-lg border p-2 ${selectedCategory === category ? "bg-gray-900 text-white" : "bg-gray-200"}`}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
}
