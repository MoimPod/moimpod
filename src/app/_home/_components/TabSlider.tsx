"use client";

import React from "react";

type TabSliderProps = {
  activeTab: "달램핏" | "워케이션";
};

export default function TabSlider({ activeTab }: TabSliderProps) {
  return (
    <div
      className={`absolute bottom-0 h-0.5 w-1/2 bg-gray-900 transition-transform duration-300 ${
        activeTab === "달램핏" ? "translate-x-0" : "translate-x-full"
      }`}
    />
  );
}
