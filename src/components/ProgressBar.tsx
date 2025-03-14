"use client";

import { useEffect, useState } from "react";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0); // 초기값 0

  useEffect(() => {
    window.setTimeout(() => {
      setAnimatedProgress(progress); // progress 변경 시 애니메이션 적용
    }, 10); // 짧은 딜레이 추가
  }, [progress]);

  return (
    <div className="h-1.5 w-full rounded-full bg-sky-100">
      <div
        className="h-1.5 rounded-full bg-primary-color transition-all duration-1000 ease-in-out"
        style={{ width: `${animatedProgress}%` }}
      ></div>
    </div>
  );
}
