"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LocationSelect from "@/components/Filtering/LocationSelect";
import CategoryButton from "@/components/CategoryButton";
import { useForm } from "react-hook-form";

type CreateGatheringsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  location: string;
  image: File | null;
  service: string;
  date: string;
  capacity: string;
};

// 입력 필드 컴포넌트
export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-3">
      <h2 className="mb-3 text-base font-semibold">{label}</h2>
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
    setError,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const [imageName, setImageName] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      reset();
      setImageName("");
      setSelectedCity("");
      setSelectedDistrict("");
    }
  }, [isOpen, reset]);

  // Location 값 저장
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(""); // 시가 변경되면 구 초기화
    setValue("location", `${city} ${selectedDistrict}`);
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setValue("location", `${selectedCity} ${district}`);
  };

  // image 파일 저장
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtensions = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtensions || !allowedExtensions.includes(fileExtensions)) {
        setError("image", { type: "manual", message: "지원하는 파일 형식은 JPG, JPEG, PNG만 가능합니다." });
        return;
      }
      setImageName(file.name);
      setValue("image", file);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-screen w-full flex-col sm:fixed sm:overflow-auto md:h-[802px] md:max-w-[520px]"
    >
      <h2 className="mb-3 text-lg font-semibold">모임 만들기</h2>
      <form onSubmit={handleSubmit(onClose)}>
        <FormField label="모임 이름">
          <Input
            placeholder="모임 이름을 작성해주세요."
            register={register("name", { required: "모임 이름을 입력해주세요." })}
          />
        </FormField>

        <FormField label="장소">
          <div className="border-none">
            <LocationSelect
              selectedCity={selectedCity}
              setSelectedCity={handleCityChange}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={handleDistrictChange}
              className="border-none text-gray-400"
            />
          </div>
        </FormField>

        <FormField label="이미지">
          <div className="flex">
            <div
              className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm ${imageName ? "text-gray-900" : "text-gray-400"}`}
            >
              {imageName || "이미지를 첨부해주세요."}
            </div>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
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

        <FormField label="모임 날짜">
          <Input
            placeholder="모임 날짜를 입력해주세요."
            register={register("date", { required: "모임 날짜를 입력해주세요." })}
          />
        </FormField>

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
