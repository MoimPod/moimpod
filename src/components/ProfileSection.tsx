"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Edit from "@/images/edit.svg";
import Profile from "@/images/profile.svg";
import { useState } from "react";

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
      <div className="flex h-[64px] w-full items-start justify-between rounded-t-3xl bg-[url('/images/profile_background.svg')] bg-cover bg-right bg-no-repeat px-6 pt-4">
        <span className="text-lg font-semibold">내 프로필</span>
        <button onClick={handleOpen}>
          <Edit width="32" height="32" className="text-gray-200" />
        </button>
        <Modal isOpen={isModal} onClose={handleClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
          <div className="text-lg font-semibold">프로필 수정하기</div>
          <form className="flex flex-col gap-6">
            <label htmlFor="profile_img" className="relative w-fit hover:cursor-pointer">
              <Profile width="56" height="56" />
              <Edit width="18" height="18" className="absolute bottom-1 right-1 text-white" />
            </label>
            <input id="profile_img" type="file" hidden accept="image/*" />
            <div className="flex flex-col gap-3">
              <label htmlFor="company" className="font-semibold text-gray-800">
                회사
              </label>
              <Input placeholder="회사, 단체명" />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleClose} styleType="outline">
                취소
              </Button>
              <Button type="submit" disabled onClick={handleClose}>
                수정하기
              </Button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="flex w-full flex-col gap-2 pl-24 pt-3">
        <Profile width="56" height="56" className="absolute left-6 top-[54px]" />
        <span>럽윈즈올</span>
        <div className="flex flex-col gap-1">
          <div className="text-sm">
            <span className="font-medium text-gray-800">company. </span>
            <span className="text-gray-700">코드잇</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-800">E-mail. </span>
            <span className="text-gray-700">codeit@codeit.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
