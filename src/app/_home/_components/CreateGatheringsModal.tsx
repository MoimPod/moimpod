"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LocationSelect from "@/components/Filtering/LocationSelect";
import CategoryButton from "@/components/CategoryButton";
import MeetingForm from "@/app/_home/_components/MeetingForm";
import { useForm } from "react-hook-form";
import { isValid as isValidDate } from "date-fns";

type CreateGatheringsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  location: string;
  image: File | null;
  service: string;
  meetingDateTime: string;
  deadlineDateTime: string;
  capacity: string;
};

// 입력 필드 컴포넌트
export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-3">
      <label className="mb-3 text-base font-semibold">{label}</label>
      {children}
    </div>
  );
}

export default function CreateGatheringsModal({ isOpen, onClose }: CreateGatheringsModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const [formData, setFormData] = useState({
    selectedCity: "",
    selectedDistrict: "",
    image: null as File | null,
    meetingDateTime: null as Date | null,
    deadlineDateTime: null as Date | null,
  });

  // state 묶어서 관리
  const updateFormData = (key: string, value: string | File | Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "selectedCity" && { selectedDistrict: "" }),
    }));
  };

  // 날짜 선택 시 setValue로 react-hook-form에 반영
  useEffect(() => {
    if (formData.meetingDateTime && isValidDate(formData.meetingDateTime)) {
      setValue("meetingDateTime", formData.meetingDateTime.toISOString());
    }
  }, [formData.meetingDateTime, setValue]);

  useEffect(() => {
    if (formData.deadlineDateTime && isValidDate(formData.deadlineDateTime)) {
      setValue("deadlineDateTime", formData.deadlineDateTime.toISOString());
    }
  }, [formData.deadlineDateTime, setValue]);

  // 초기화 함수
  const resetFormData = () => {
    setFormData({
      selectedCity: "",
      selectedDistrict: "",
      image: null,
      meetingDateTime: null,
      deadlineDateTime: null,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      resetFormData();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: FormValues) => {
    console.log("폼 데이터:", data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-screen w-full flex-col sm:fixed sm:overflow-auto md:h-[802px] md:max-w-[520px]"
    >
      <label className="mb-3 text-lg font-semibold">모임 만들기</label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="모임 이름">
          <Input
            placeholder="모임 이름을 작성해주세요."
            register={register("name", { required: "모임 이름을 입력해주세요." })}
          />
        </FormField>

        <FormField label="장소">
          <div className="border-none">
            <LocationSelect
              selectedCity={formData.selectedCity}
              setSelectedCity={(city) => updateFormData("selectedCity", city)}
              selectedDistrict={formData.selectedDistrict}
              setSelectedDistrict={(district) => updateFormData("selectedDistrict", district)}
              className="border-none text-gray-400"
            />
          </div>
        </FormField>

        <FormField label="이미지">
          <div className="flex">
            <div
              className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm ${formData.image?.name ? "text-gray-900" : "text-gray-400"}`}
            >
              {formData.image?.name || "이미지를 첨부해주세요."}
            </div>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept=".jpg,.jpeg,.png"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateFormData("image", file);
                }
              }}
            />
            <Button
              styleType="outline"
              size="sm"
              className="ml-3 w-24"
              onClick={() => {
                document.getElementById("imageUpload")?.click();
              }}
            >
              파일 첨부
            </Button>
          </div>
        </FormField>

        <FormField label="선택 서비스">
          <CategoryButton categories={["달램핏", "워케이션"]} setValue={(value) => setValue("service", value)}>
            <CategoryButton.Checkbox category="달램핏" subText="오피스 스트레칭" />
            <CategoryButton.Checkbox category="워케이션" />
          </CategoryButton>
        </FormField>

        <div className="my-3">
          <MeetingForm
            meetingDateTime={formData.meetingDateTime}
            setMeetingDateTime={(date) => {
              if (formData.meetingDateTime && date && date > formData.meetingDateTime) {
              }
              updateFormData("meetingDateTime", date);
            }}
            deadlineDateTime={formData.deadlineDateTime}
            setDeadlineDateTime={(date) => updateFormData("deadlineDateTime", date)}
          />
        </div>

        <FormField label="모임 정원">
          <Input
            placeholder="최소 3인 이상 입력해주세요."
            register={register("capacity", { required: "정원을 입력해주세요." })}
          />
        </FormField>

        <Button styleType="solid" size="lg" className="mt-7 h-10 w-[118px]" disabled={!isValid} type="submit">
          확인
        </Button>
      </form>
    </Modal>
  );
}
