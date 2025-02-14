"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Edit from "@/images/edit.svg";
import Profile from "@/images/profile.svg";
import { useForm } from "react-hook-form";
import { useUpdateUserInfo } from "@/app/(common)/mypage/_hooks/useUpdateUserInfo";

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// 회원 정보 폼 타입
type FormValues = {
  // email: string; // 프로필 사진
  companyName: string;
};

// 프로필을 수정하는 폼
export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const mutation = useUpdateUserInfo();

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    mutation.mutate(formData);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
      <div className="text-lg font-semibold">프로필 수정하기</div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <label htmlFor="profile_img" className="relative w-fit hover:cursor-pointer">
          <Profile width="56" height="56" />
          <Edit width="18" height="18" className="absolute bottom-1 right-1 text-white" />
        </label>
        <input id="profile_img" type="file" hidden accept="image/*" />
        <div className="flex flex-col gap-3">
          <label htmlFor="company" className="font-semibold text-gray-800">
            회사
          </label>
          <Input
            placeholder="회사, 단체명"
            register={register("companyName", { required: "회사명을 입력해주세요." })}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={onClose} styleType="outline">
            취소
          </Button>
          <Button type="submit" disabled={!isValid}>
            수정하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
