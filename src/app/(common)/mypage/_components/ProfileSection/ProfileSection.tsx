"use client";

import ProfileEditModal from "@/app/(common)/mypage/_components/ProfileSection/ProfileEditModal";
import ProfileHeader from "@/app/(common)/mypage/_components/ProfileSection/ProfileHeader";
import ProfileInfo from "@/app/(common)/mypage/_components/ProfileSection/ProfileInfo";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import { useState } from "react";

export default function ProfileSection() {
  // 유저 정보를 가져오기
  const { data } = useGetUserInfo();
  const [isModal, setIsModal] = useState(false);
  const handleOpen = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };
  if (!data) return <div>로딩 중...</div>;
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border-2 border-gray-200 bg-white pb-5">
      <ProfileHeader onEditClick={handleOpen} />
      <ProfileEditModal isOpen={isModal} onClose={handleClose} companyName={data?.companyName} imageUrl={data?.image} />
      <ProfileInfo email={data?.email} name={data?.name} companyName={data?.companyName} imageUrl={data?.image} />
    </section>
  );
}
