"use client";

import ProfileEditModal from "@/components/ProfileSection/ProfileEditModal";
import ProfileHeader from "@/components/ProfileSection/ProfileHeader";
import ProfileInfo from "@/components/ProfileSection/ProfileInfo";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";

type User = {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProfileSection() {
  // 유저 정보를 가져오기
  const user = useUserStore((state) => state.user) as User;
  const { data } = useGetUserInfo(user);
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
      <ProfileEditModal isOpen={isModal} onClose={handleClose} companyName={data?.companyName} imageUrl={data?.image} />
      <ProfileInfo email={data?.email} name={data?.name} companyName={data?.companyName} imageUrl={data?.image} />
    </section>
  );
}
