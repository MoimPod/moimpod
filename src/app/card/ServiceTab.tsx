"use client";

import React, { useState } from "react";

export default function ServiceTab() {
  const [activeTab, setActiveTab] = useState<"달램핏" | "위케이션">("달램핏");

  return (
    <div className="flex items-end gap-4 pb-1">
      <div
        className={`rounded-t-lg border-b-2 text-lg font-medium ${activeTab === "달램핏" ? "border-gray-900 px-4 text-gray-900" : "border-transparent text-gray-400"}`}
        onClick={() => setActiveTab("달램핏")}
      >
        달램핏
      </div>
      <div
        className={`inline-block rounded-t-lg border-b-2 text-lg font-medium ${activeTab === "위케이션" ? "border-gray-900 px-4 text-gray-900" : "border-transparent text-gray-400"} `}
        onClick={() => setActiveTab("위케이션")}
      >
        위케이션
      </div>
    </div>
  );
}
