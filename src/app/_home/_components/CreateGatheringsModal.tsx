"use client";

import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LocationSelect from "@/app/_home/_components/LocationSelect";
import { useForm } from "react-hook-form";

type CreateGatheringsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// 입력 필드 타입 정의
type FormValues = {
  name: string;
  location: string;
  image: string;
  service: string;
  date: string;
  capacity: string;
};

// 입력 필드 컴포넌트
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="my-3">
    <h2 className="mb-3 text-base font-semibold">{label}</h2>
    {children}
  </div>
);

export default function CreateGatheringsModal({ isOpen, onClose }: CreateGatheringsModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-screen w-full flex-col sm:fixed sm:overflow-auto md:h-[802px] md:max-w-[520px]"
    >
      <h2 className="mb-3 text-lg font-semibold">모임 만들기</h2>
      <FormField label="모임 이름">
        <Input placeholder="모임 이름을 작성해주세요." {...register("name", { required: true })} />
      </FormField>

      <FormField label="장소">
        <LocationSelect />
      </FormField>

      <FormField label="이미지">
        <div className="flex">
          <Input placeholder="이미지를 첨부해주세요." {...register("image", { required: true })} />
          <Button styleType="outline" size="sm" className="ml-3 w-[100px]">
            파일 첨부
          </Button>
        </div>
      </FormField>

      <FormField label="선택 서비스">
        <Input placeholder="서비스를 선택해주세요." {...register("service", { required: true })} />
      </FormField>

      <FormField label="모임 날짜">
        <Input placeholder="모임 날짜를 입력해주세요." {...register("date", { required: true })} />
      </FormField>

      <FormField label="모임 정원">
        <Input placeholder="최소 3인 이상 입력해주세요." {...register("capacity", { required: true })} />
      </FormField>

      <Button
        styleType="solid"
        size="sm"
        className="mt-7 h-[40px] w-[118px]"
        disabled={!isValid}
        onClick={handleSubmit(onClose)}
      >
        확인
      </Button>
    </Modal>
  );
}
