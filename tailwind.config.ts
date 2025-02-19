import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-color": "#62a3f9",
      },
      animation: {
        "heart-scale-up": "heart-scale-up 0.6s cubic-bezier(.77,1.74,.97,1.65)",
        "hand-wave": "hand-wave 1s ease-in-out",
        fadein: "fadein 0.5s ease-in",
        fadeout: "fadeout 0.5s ease-in-out",
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
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
