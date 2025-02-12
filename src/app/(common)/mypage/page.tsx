"use client";

import ProfileSection from "@/components/ProfileSection/ProfileSection";
import { useEffect, useRef, useState } from "react";
const tabItems = ["나의 모임", "나의 리뷰", "내가 만든 모임"];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, translateX: 0 });
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!tabRefs.current.length) return; // 아직 ref 배열이 비어 있다면 패스

    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      const width = activeTab.offsetWidth;
      // 활성 탭 이전 탭들의 누적 offsetWidth를 계산
      const offsetLeft = tabRefs.current
        .slice(0, activeIndex)
        .reduce((acc, el) => acc + (el?.offsetWidth || 0) + 12, 0);
      setSliderStyle({ width, translateX: offsetLeft });
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-[30px] pt-8">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">마이 페이지</h2>
        <ProfileSection />
      </div>
      {/* 마이페이지의 콘텐츠 */}
      <div className="border-t-2 border-gray-900 bg-white px-6 pt-6">
        {/* 탭 */}
        <div className="relative">
          <ul className="flex gap-3 text-lg font-semibold text-gray-400">
            {tabItems.map((tabItem, idx) => (
              <li
                onClick={() => setActiveIndex(idx)}
                key={tabItem}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                className={`${activeIndex === idx && "text-gray-900"} mb-1 cursor-pointer transition-colors duration-300`}
              >
                {tabItem}
              </li>
            ))}
          </ul>
          <div
            style={{
              width: sliderStyle.width,
              transform: `translateX(${sliderStyle.translateX}px)`,
            }}
            className={`absolute bottom-0 h-[2px] bg-gray-900 transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
}
