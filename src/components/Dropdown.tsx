"use client";

import { useState, useRef, useEffect } from "react";
import ArrowDownBlackIcon from "@/images/dropdown_down_arrow_black.svg";
import ArrowDownWhiteIcon from "@/images/dropdown_down_arrow_white.svg";
import { cn } from "@/utils/classnames";

type DropdownProps = {
  options?: string[];
  selected: string;
  onSelect: (option: string) => void;
  onToggle?: (open: boolean) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function Dropdown({
  options,
  selected,
  onSelect,
  onToggle,
  placeholder,
  disabled = false,
  className,
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={cn(
          "mb-2 flex w-full cursor-pointer items-center justify-between rounded-xl border p-2 text-sm font-medium",
          className,
          isOpen ? "bg-gray-900 text-white" : "bg-gray-50",
          selected ? "text-gray-800" : "",
          disabled && "cursor-not-allowed bg-gray-200",
        )}
        onClick={() => {
          if (!disabled) {
            const newState = !isOpen;
            setIsOpen(newState);
            onToggle?.(newState); // 부모 상태 업데이트
          }
        }}
      >
        <span>{selected || placeholder}</span>
        {isOpen ? <ArrowDownWhiteIcon /> : <ArrowDownBlackIcon />}
      </div>
      {isOpen &&
        (children ??
          (options?.length ? (
            <div className="absolute z-10 w-full rounded-xl border bg-white p-2 text-sm font-medium shadow-md">
              {options.map((option) => (
                <div key={option} onClick={() => handleSelect(option)} className="rounded-xl p-2 hover:bg-sky-100">
                  {option}
                </div>
              ))}
            </div>
          ) : null))}
    </div>
  );
}
