"use client";

import ProfileEditModal from "@/components/ProfileSection/ProfileEditModal";
import ProfileHeader from "@/components/ProfileSection/ProfileHeader";
import ProfileInfo from "@/components/ProfileSection/ProfileInfo";
import { useState } from "react";

// 각 하위 컴포넌트를 배치하는 컴포넌트
// 모달의 열림, 닫힘 상태를 담당
export default function ProfileSection() {
  const [isModal, setIsModal] = useState(false);
  const handleOpen = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };
  return (
    <section className="relative w-full rounded-3xl border-2 border-gray-200 bg-white pb-5">
      <ProfileHeader onEditClick={handleOpen} />
      <ProfileEditModal isOpen={isModal} onClose={handleClose} />
      <ProfileInfo email={"0lYlF@example.com"} name={"이상민"} companyName={"이상민"} imageUrl={""} />
    </section>
  );
}
