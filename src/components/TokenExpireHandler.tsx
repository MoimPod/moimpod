"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginPopup } from "./Popup";

export default function TokenExpireHandler() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/sign-in");
  };

  function deleteCookie(token: string) {
    if (typeof document !== "undefined") {
      const paths = ["/", "/gathering", "/mypage", "/favorites", "/reviews"];
      paths.forEach((path) => {
        document.cookie = `${token}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=${path}`;
      });
    }
  }

  function deleteLocalStorage() {
    if (typeof window !== "undefined" && window.localStorage) {
      queryClient.removeQueries({ queryKey: ["user"] });
    }
  }

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (typeof window !== "undefined" && error.response?.status === 401) {
          deleteCookie("token");
          deleteLocalStorage();
          setIsModalOpen(true);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [router]);

  return <LoginPopup isOpen={isModalOpen} onClose={closeModal} />;
}
