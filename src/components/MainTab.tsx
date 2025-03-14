"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type MainTabContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addTabRefs: (index: number, ref: HTMLLIElement | null) => void;
  sliderStyle: { width: number; translateX: number };
};

const MainTabContext = createContext<MainTabContextType | null>(null);

function useTabContext() {
  const context = useContext(MainTabContext);
  if (!context) {
    throw new Error("Tab compound components must be used within a Tab.Root");
  }
  return context;
}

// Tab의 props
type MainTabProps = {
  children: React.ReactNode;
  category?: React.ReactNode; // 카태고리 버튼
  targetIndex?: number; // 클릭 시 카테고리가 나와야 할 index
  gap?: string; // 탭과 카테고리의 간격
};
// Tab 루트 컴포넌트
export default function MainTab({ children, category, targetIndex, gap = "gap-4" }: MainTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 현재 활성화된 탭의 인덱스
  const [activeIndex, setActiveIndex] = useState(0);
  // 슬라이더의 길이 및 X축 이동거리
  const [sliderStyle, setSliderStyle] = useState({ width: 0, translateX: 0 });
  // 탭들의 ref
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  // URL에서 `type` 값을 읽어 `activeIndex` 업데이트 (뒤로 가기, 새로고침 대응)
  useEffect(() => {
    const currentType = searchParams.get("type") || "DALLAEMFIT";
    const selectedIndex = SERVICE_TABS.findIndex((t) => t.type === currentType);

    if (selectedIndex !== -1 && selectedIndex !== activeIndex) {
      setActiveIndex(selectedIndex);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!tabRefs.current.length) return; // 아직 ref 배열이 비어 있다면 패스
    // 현재 활성화 된 Tab
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      const width = activeTab.offsetWidth;
      // 활성 탭 이전 탭들의 누적 offsetWidth를 계산. gap인 12px을 더해준다.
      const offsetLeft = tabRefs.current
        .slice(0, activeIndex)
        .reduce((acc, el) => acc + (el?.offsetWidth || 0) + 12, 0);
      setSliderStyle({ width, translateX: offsetLeft });
    }
  }, [activeIndex]);

  // context에 전달할 값들
  const contextValue = {
    activeIndex,
    setActiveIndex: (index: number) => {
      setActiveIndex(index);

      // URL도 함께 업데이트
      const tabType = SERVICE_TABS[index].type;
      router.push(`${pathname}?type=${tabType}`);
    },
    addTabRefs: (index: number, ref: HTMLLIElement | null) => {
      tabRefs.current[index] = ref;
    },
    sliderStyle,
  };
  return (
    <MainTabContext.Provider value={contextValue}>
      <div className={`flex flex-col ${gap}`}>
        <div className="relative">
          {/* 탭 */}
          <ul className="flex gap-3 text-lg font-semibold text-gray-400">{children}</ul>
          {/* 슬라이더 */}
          <div
            style={{
              width: sliderStyle.width,
              transform: `translateX(${sliderStyle.translateX}px)`,
            }}
            className={`absolute bottom-0 h-[2px] bg-gray-900 transition-all duration-300`}
          />
        </div>
        {targetIndex === activeIndex && <div>{category}</div>}
      </div>
    </MainTabContext.Provider>
  );
}

// 탭 아이템
type ItemProps = {
  index: number;
  children: React.ReactNode;
};
MainTab.Item = function ({ index, children }: ItemProps) {
  const { activeIndex, setActiveIndex, addTabRefs } = useTabContext();

  return (
    <li
      onClick={() => setActiveIndex(index)}
      ref={(el) => {
        addTabRefs(index, el);
      }}
      // 활성화된 탭이면 text의 색을 변경
      className={`${activeIndex === index && "text-gray-900"} mb-1 flex cursor-pointer items-center gap-1 transition-colors duration-300`}
    >
      {children}
    </li>
  );
};

// 서비스 탭 리스트
const SERVICE_TABS = [
  { name: "달램핏", type: "DALLAEMFIT" },
  { name: "워케이션", type: "WORKATION" },
];
