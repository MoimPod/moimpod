import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "heart-scale-up": "heart-scale-up 0.6s cubic-bezier(.77,1.74,.97,1.65)",
        "hand-wave": "hand-wave 1s ease-in-out",
      },
      keyframes: {
        "heart-scale-up": {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.3)" },
          "100%": {
            transform: "scale(1)",
          },
        },
        "hand-wave": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(20deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
          "75%": {
            transform: "rotate(20deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
