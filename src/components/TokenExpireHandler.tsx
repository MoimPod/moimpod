"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginPopup } from "./Popup";

function deleteCookie(name: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  }
}

function deleteLocalStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("user-storage");
  }
}

export default function TokenExpireHandler() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/sign-in");
  };

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
