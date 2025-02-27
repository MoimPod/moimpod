"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Edit from "@/images/edit.svg";
import { useForm } from "react-hook-form";
import { useUpdateUserInfo } from "@/app/(common)/mypage/_hooks/useUpdateUserInfo";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  companyName: string;
};

// 회원 정보 폼 타입
type FormValues = {
  companyName: string;
  profileImg: FileList;
};

// 프로필을 수정하는 폼
export default function ProfileEditModal({ isOpen, onClose, imageUrl, companyName }: ProfileEditModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValues>({ mode: "onChange", defaultValues: { companyName } });
  const mutation = useUpdateUserInfo();

  // 이미지 상태를 추적
  const watchedProfileImg = watch("profileImg");

  // 이미지 미리보기 설정
  useEffect(() => {
    if (watchedProfileImg && watchedProfileImg.length > 0) {
      const file = watchedProfileImg[0];
      // 이미지 파일를 URL로 변환
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // 파일이 변경되거나 컴포넌트가 unmount될 때 URL 해제
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // 파일 선택이 없으면 기존 imageUrl 사용
      setPreviewUrl(imageUrl);
    }
  }, [watchedProfileImg, imageUrl]);

  // 모달을 여닫을 때 상태를 초기화
  useEffect(() => {
    if (isOpen) {
      reset({ companyName, profileImg: undefined });
      setPreviewUrl(imageUrl);
    }
  }, [isOpen, companyName, imageUrl, reset]);

  // 폼 제출 로직
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("companyName", data.companyName);

    if (data.profileImg && data.profileImg.length > 0) {
      formData.append("image", data.profileImg[0]);
    }
    mutation.mutate(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
      <div className="text-lg font-semibold">프로필 수정하기</div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <label htmlFor="profile_img" className="relative w-fit hover:cursor-pointer">
          <Avatar size="lg" imageUrl={previewUrl} />
          <Edit width="18" height="18" className="absolute bottom-1 right-1 text-white" />
        </label>
        <input id="profile_img" type="file" hidden accept=".jpg,.jpeg,.png" {...register("profileImg")} />
        <div className="flex flex-col gap-3">
          <label htmlFor="company" className="font-semibold text-gray-800">
            회사
          </label>
          <Input
            placeholder="회사, 단체명"
            register={register("companyName", {
              required: "회사명을 입력해주세요.",
              maxLength: { value: 18, message: "회사명은 18자 이하로 입력해주세요." },
            })}
            helperText={errors.companyName?.message}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={onClose} styleType="outline" className="w-full">
            취소
          </Button>
          <Button type="submit" disabled={!isDirty || !isValid} className="w-full">
            수정하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
