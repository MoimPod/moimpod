"use client";

import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

export default function Header() {
  const user = useUserStore();
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [profileBtn, setProfileBtn] = useState(false);

  function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  }

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    setToken(tokenFromCookie);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("user-storage");
      localStorage.removeItem("favorites-storage");
    }
    router.push("/sign-in");
  };

  return (
    <header className="sticky top-0 z-50 h-[56px] border-b-2 border-black bg-primary-color px-4 md:h-[60px]">
      <div className="m-auto flex h-full max-w-[1200px] flex-row items-center justify-between">
        <nav className="flex h-full flex-row items-center gap-3 md:gap-6">
          {/* 768px 이하에서 보이는 로고 */}
          <Link href={"/"} className="block md:hidden">
            <Image src={"/images/mobile_logo.svg"} alt={"모바일 로고"} width={56} height={27} />
          </Link>
          {/* 768px 이상에서 보이는 로고 */}
          <Link href={"/"} className="hidden md:block">
            <Image src={"/images/desktop_logo.svg"} alt={"데스크탑 로고"} width={73} height={35} />
          </Link>
          <Link href={"/"} className="header-link">
            모임 찾기
          </Link>
          <Link href={"/favorites"} className="header-link">
            찜한 모임
          </Link>
          <Link href={"/reviews"} className="header-link">
            모든 리뷰
          </Link>
        </nav>
        {token ? (
          <div className="relative">
            <button
              onClick={() => {
                setProfileBtn((prev) => !prev);
              }}
              className="flex items-center justify-center"
            >
              <Avatar size={"md"} imageUrl={user.user?.image} />
            </button>
            {profileBtn ? (
              <div className="absolute right-0 top-[calc(100%+8px)] h-20 w-[110px] rounded-xl bg-white shadow-md xl:top-[calc(100%+10px)]">
                <Link
                  href={"/mypage"}
                  className="flex h-10 w-full items-center px-4 text-base font-medium text-gray-800"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="flex h-10 w-full items-center px-4 text-left text-base font-medium text-gray-800"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Link href={"/sign-in"} className="header-link flex items-center gap-2">
            <span>로그인</span>
          </Link>
        )}
      </div>
    </header>
  );
}
