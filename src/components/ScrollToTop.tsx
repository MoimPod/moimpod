"use client";

import { useEffect, useState } from "react";
import ScrollArrow from "@/images/dropdown_down_arrow_white.svg";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`group fixed bottom-3 right-3 flex size-9 transform items-center justify-center rounded-full bg-blue-6 transition-all duration-300 ease-in-out md:size-12 ${
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ScrollArrow className="rotate-180 group-hover:animate-arrow-up" />
    </button>
  );
}
