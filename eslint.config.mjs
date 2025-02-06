// ESM 기반 ESLint 설정 파일
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import next from "eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import tailwind from "eslint-plugin-tailwindcss";
import build from "next/dist/build";

export default [
  js.configs.recommended, // JavaScript 기본 권장 설정
  ts.configs.recommended, // TypeScript 권장 설정
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["node_modules", ".next", "public/", "dist/", "build/", ".husky/", "**/*.config.js"],
    languageOptions: {
      parser: tsParser, // TypeScript 파서 적용
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": ts,
      prettier,
      tailwind,
      next,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": "warn",
      "no-unused-vars": "warn", // 사용하지 않는 변수 경고
      "no-var": "error", // var 사용 금지 (let, const 사용)
      "prefer-const": "error", // 가능하면 const 사용
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "warn",
    },
  },
];
