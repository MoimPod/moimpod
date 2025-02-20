"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useCheckAuth = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const [redirectPath, setRedirectPath] = useState<string | null>(null); // 리디렉트할 경로 저장

  // 로그인 상태 체크 함수
  const checkAuth = (redirectPath: string, callback?: () => void) => {
    if (user) {
      // 로그인 상태일 때 콜백 (모달 열기)
      if (callback) callback();
    } else {
      saveRedirectPath(redirectPath);
      saveAuthModalState(true);
      setAuthModalOpen(true);
    }
  };

  // 모달 확인 버튼 클릭 시 로그인 페이지로 이동
  const handleConfirm = () => {
    if (redirectPath) {
      saveRedirectPath(redirectPath); // 로그인 후 원래 가려던 페이지로 이동
    }
    setAuthModalOpen(false); // 모달 닫기
    router.push("/sign-in"); // 로그인 페이지로 이동
  };
  return {
    checkAuth,
    isLogin: !!user,
    isAuthModalOpen,
    setAuthModalOpen,
    handleConfirm,
  };
};

// 로그인 후 이동할 경로를 sessionStorage 저장
export const saveRedirectPath = (path: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("redirectAfterLogin", path);
  }
};

// 모달 상태 저장
export const saveAuthModalState = (isOpen: boolean) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("authModalOpen", JSON.stringify(isOpen));
  }
};

// 로그인 후 모달 상태 복원
export const restoreAuthModalState = (): boolean => {
  if (typeof window !== "undefined") {
    const storedValue = sessionStorage.getItem("authModalOpen");
    return storedValue ? JSON.parse(storedValue) : false;
  }
  return false;
};

// 모달 상태 초기화
export const clearAuthModalState = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("authModalOpen");
  }
};
