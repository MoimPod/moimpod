"use client";

import { useState, createContext, useContext } from "react";
import CheckedIcon from "@/images/checkbox_checked.svg";
import UncheckedIcon from "@/images/checkbox-unchecked.svg";
import { cn } from "@/utils/classnames";

const CategoryContext = createContext<{
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}>({ selectedCategory: "", setSelectedCategory: () => {} });

type CategoryButtonProps = {
  categories: string[];
  defaultCategory?: string;
  children: React.ReactNode;
  setValue?: (value: string) => void;
};

export default function CategoryButton({ categories, defaultCategory, children, setValue }: CategoryButtonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory ?? categories[0]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setValue?.(category);
  };

  return (

    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <div className={cn("flex gap-3", className)}>{children}</div>
    </CategoryContext.Provider>
  );
}

// CategoryButton.Title 텍스트만 표시
CategoryButton.Title = function Title({ category }: { category: string }) {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  return (
    <button
      onClick={() => {
        setSelectedCategory(category);
      }}
      className={`h-10 w-auto rounded-xl border p-2.5 px-4 text-sm font-medium ${selectedCategory === category ? "bg-gray-900 text-white" : "bg-gray-200"}`}
    >
      {category}
    </button>
  );
};

CategoryButton.Checkbox = function Checkbox({ category, subText }: { category: string; subText?: string }) {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const isSelected = selectedCategory === category;

  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`flex h-[70px] flex-col items-start justify-center rounded-lg border p-2.5 px-4 text-sm font-medium ${
        isSelected ? "bg-gray-900 text-white" : "bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        {isSelected ? <CheckedIcon /> : <UncheckedIcon />}
        <div className="flex flex-col p-1">
          <span className="justify-start font-bold">{category}</span>
          {subText && (
            <span className={`text-xs ${isSelected ? "bg-gray-900 text-white" : "bg-gray-200"}`}>{subText}</span>
          )}
        </div>
      </div>
    </button>
  );
};
