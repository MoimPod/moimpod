import { useUserStore } from "@/stores/useUserStore";
import { redirect, useRouter } from "next/navigation";

export const useCheckAuth = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  // 로그인 상태 체크 함수
  const checkAuth = (redirectPath: string, callback?: () => void) => {
    if (user) {
      // 로그인 상태일 때 콜백 (모달 열기)
      if (callback) callback();
    } else {
      saveRedirectPath(redirectPath);
      router.push("signin");
    }
  };
  return { checkAuth, isLogin: !!user };
};

// 사용자가 가려던 페이지 경로를 sessionStorage 저장
export const saveRedirectPath = (path: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("redirectAfterLogin", path);
  }
};
