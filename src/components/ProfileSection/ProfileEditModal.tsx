"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Edit from "@/images/edit.svg";
import Profile from "@/images/profile.svg";

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// 프로필을 수정하는 폼
export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
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
          <Button onClick={onClose} styleType="outline">
            취소
          </Button>
          <Button type="submit" disabled onClick={onClose}>
            수정하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
