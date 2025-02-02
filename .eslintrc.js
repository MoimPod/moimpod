module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    extends: [
      'next/core-web-vitals', // Next.js 기본 ESLint 설정
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended', // Prettier와 충돌 방지
      'plugin:tailwindcss/recommended' // TailwindCSS ESLint 플러그인
    ],
    plugins: ['@typescript-eslint', 'prettier', 'tailwindcss'],
    rules: {
      'prettier/prettier': ['error'], // Prettier 룰 위반 시 ESLint 오류 발생
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-console': 'warn',
      'tailwindcss/no-custom-classname': 'off', // Tailwind의 클래스 네이밍 검사 비활성화 (선택 사항)
      'tailwindcss/classnames-order': 'warn' // Tailwind 클래스 정렬 경고
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'clsx', 'classnames'] // tailwind 클래스 정렬을 적용할 함수 추가
      }
    }
  };