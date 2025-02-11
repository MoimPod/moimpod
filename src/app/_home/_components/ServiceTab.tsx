"use client";

import React, { useState } from "react";
import TabSlider from "./TabSlider";

export default function ServiceTab() {
  const [activeTab, setActiveTab] = useState<"달램핏" | "워케이션">("달램핏");

  return (
    <div className="relative flex items-end gap-4 pb-1">
      <div
        className={`flex-1 rounded-t-lg pl-0 text-lg font-medium transition-colors duration-300 ${activeTab === "달램핏" ? "px-2 text-gray-900" : "text-gray-400"}`}
        onClick={() => setActiveTab("달램핏")}
      >
        달램핏
      </div>
      <div
        className={`inline-block rounded-t-lg text-lg font-medium transition-colors duration-300 ${activeTab === "워케이션" ? "px-2 text-gray-900" : "text-gray-400"} `}
        onClick={() => setActiveTab("워케이션")}
      >
        위케이션
      </div>
      <TabSlider activeTab={activeTab} />
    </div>
  );
}
