"use client";

import { useState } from "react";

type CategoryButtonProps = {
  categories: string[];
  selectedCategory?: string;
  onChange?: (category: string) => void;
};

export default function CategoryButton({
  categories,
  selectedCategory: externalSelected,
  onChange,
}: CategoryButtonProps) {
  const [internalSelected, setInternalSelected] = useState<string>(categories[0]);
  const selectedCategory = externalSelected ?? internalSelected;

  // 카테고리 상태 업데이트
  const handlecategoriesChange = (category: string) => {
    if (!onChange) {
      setInternalSelected(category); // 외부에서 상태 관리 안 하면 내부 상태 변경
    } else {
      onChange(category); // 외부에서 상태 관리 시 onChange 호출
    }
  };

  return (
    <div className="mb-3 mt-2 flex gap-3">
      {categories.map((category, i) => {
        return (
          <button
            key={category}
            onClick={() => handlecategoriesChange(category)}
            className={`h-[40px] w-auto rounded-xl border p-2.5 px-4 text-sm font-medium ${selectedCategory === category ? "bg-gray-900 text-white" : "bg-gray-200"}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
