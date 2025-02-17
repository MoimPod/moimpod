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
import { useCreateGathering } from "../_hooks/useCreateGathering";

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

// 공통 입력 필드 컴포넌트
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
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  // 모임 관련 데이터
  const [formData, setFormData] = useState({
    selectedCity: "",
    selectedDistrict: "",
    image: null as File | null,
    meetingDateTime: null as Date | null,
    deadlineDateTime: null as Date | null,
  });

  // 마감 날짜 오류 메시지
  const [errorMessage, setErrorMessage] = useState("");

  // formData 업데이트 함수
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

  const { mutate: createGathering, isPending } = useCreateGathering();

  // 제출 확인용
  const onSubmit = (data: FormValues) => {
    console.log("폼 데이터:", data);
    createGathering(data, {
      onSuccess: () => {
        onClose();
      },
      onError: (err) => {
        console.error("API 요청 실패:", err);
        setError("root", {
          type: "server",
          message: "서버에서 오류가 발생했습니다. 다시 시도해주세요.",
        });
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-screen w-full flex-col sm:fixed sm:overflow-auto md:h-[802px] md:max-w-[520px]"
    >
      <label className="mb-3 text-lg font-semibold">모임 만들기</label>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 모임 이름 */}
        <FormField label="모임 이름">
          <Input
            placeholder="모임 이름을 작성해주세요."
            register={register("name", {
              required: "모임 이름을 입력해주세요.",
              maxLength: { value: 20, message: "모임 이름은 최대 20자까지 입력 가능합니다." },
            })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </FormField>

        {/* 장소 선택 */}
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

        {/* 이미지 업로드 */}
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

        {/* 서비스 선택 */}
        <FormField label="선택 서비스">
          <CategoryButton categories={["달램핏", "워케이션"]} setValue={(value) => setValue("service", value)}>
            <CategoryButton.Checkbox category="달램핏" subText="오피스 스트레칭" />
            <CategoryButton.Checkbox category="워케이션" />
          </CategoryButton>
        </FormField>

        {/* 모임 날짜 & 마감 날짜 */}
        <div className="my-3">
          <MeetingForm
            meetingDateTime={formData.meetingDateTime}
            setMeetingDateTime={(date) => updateFormData("meetingDateTime", date)}
            deadlineDateTime={formData.deadlineDateTime}
            setDeadlineDateTime={(date) => {
              if (formData.meetingDateTime && date && date > formData.meetingDateTime) {
                setErrorMessage("모임 마감 날짜는 모임 날짜보다 늦을 수 없습니다.");
                return;
              }
              setErrorMessage("");
              updateFormData("deadlineDateTime", date);
            }}
          />
          {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
        </div>

        {/* 모임 정원 */}
        <FormField label="모임 정원">
          <Input
            placeholder="최소 3인 이상 입력해주세요."
            register={register("capacity", {
              required: "정원을 입력해주세요.",
              min: { value: 3, message: "모임 정원은 최소 3명 이상이어야 합니다." },
              max: { value: 20, message: "모임 정원은 최대 20명까지만 가능합니다." },
              pattern: { value: /^[0-9]+$/, message: "숫자만 입력해주세요." },
            })}
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity.message}</p>}
        </FormField>

        {errors.root && <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>}

        {/* 제출 버튼 */}
        <Button
          styleType="solid"
          size="lg"
          className="mt-7 h-10 w-[118px]"
          disabled={!isValid || isPending}
          type="submit"
        >
          {isPending ? "저장 중..." : "확인"}
        </Button>
      </form>
    </Modal>
  );
}
