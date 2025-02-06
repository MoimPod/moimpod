import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "heart-scale-up": "heart-scale-up 0.5s cubic-bezier(.77,1.74,.97,1.65)",
      },
      keyframes: {
        "heart-scale-up": {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.3)", fill: "#dc2626" },
          "100%": {
            transform: "scale(1)",
            fill: "#dc2626",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
