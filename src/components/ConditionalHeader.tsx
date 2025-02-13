"use client";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function ConditionalHeader() {
  const pathname = usePathname();

  //회원가입과 로그인엔 header가 필요하지 않아서  /sign-in, /sign-up에서 Header를 숨기는 컴포넌트를 만들었습니다.
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) return null;

  return <Header />;
}
