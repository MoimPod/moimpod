"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  company: string;
  password: string;
  passwordCheck: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const handleSignUp = (data: FormValues) => {
    const { name, email, company, password, passwordCheck } = data;
    if (name !== "홍길동") {
      setError("name", { type: "manual", message: "이름을 입력해주세요" });
    } else {
      clearErrors("name");
    }
    if (email !== "rrrr@gmail.com") {
      setError("email", { type: "manual", message: "중복된 이메일입니다." });
    } else {
      clearErrors("email");
    }
    if (company !== "코드잇") {
      setError("company", { type: "manual", message: "회사명을 정확하게 입력해주세요" });
    } else {
      clearErrors("company");
    }
    if (password !== "0000") {
      setError("password", { type: "manual", message: "비밀번호를 입력해주세요." });
    } else {
      clearErrors("password");
    }
    if (passwordCheck !== "0000") {
      setError("passwordCheck", { type: "manual", message: "비밀번호가 일치하지 않습니다." });
    } else {
      clearErrors("passwordCheck");
    }
  };

  // 비밀번호 변경시 보이는 icon
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 px-4 pb-[72px] pt-8 xl:min-h-[calc(100vh-60px)] xl:flex-row xl:items-center xl:justify-center xl:gap-[100px]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xl font-semibold text-gray-800 md:text-2xl">Welcome to 같이 달램!</p>
          <p className="text-sm font-medium text-gray-800 md:text-base">
            바쁜 일상 속 잠깐의 휴식, <br />
            이제는 같이 달램과 함께 해보세요
          </p>
        </div>
        <div className="relative aspect-[290/250] w-full md:max-w-[410px] xl:w-[590px]">
          <Image src={"/images/auth_main_img.png"} alt={""} fill className="object-cover" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="m-auto flex w-full flex-col rounded-3xl bg-white px-4 py-8 md:max-w-[608px] xl:m-0 xl:max-w-[510px] xl:px-14"
      >
        <p className="text-center text-xl font-semibold text-gray-800">회원가입</p>
        <div className="m-auto w-full max-w-[500px]">
          <div className="flex flex-col gap-2 pt-8">
            <p className="text-sm font-semibold text-gray-800">이름</p>
            <Input
              type={"text"}
              placeholder="이름을 입력해주세요"
              register={register("name", { required: "이름을 입력해주세요" })}
              helperText={errors.name?.message}
            />
          </div>
          <div className="flex flex-col gap-2 pt-8">
            <p className="text-sm font-semibold text-gray-800">아이디</p>
            <Input
              type={"email"}
              placeholder="이메일을 입력해주세요."
              register={register("email", { required: "중복된 이메일입니다." })}
              helperText={errors.email?.message}
            />
          </div>
          <div className="flex flex-col gap-2 pt-8">
            <p className="text-sm font-semibold text-gray-800">회사명</p>
            <Input
              type={"text"}
              placeholder="회사명을 입력해주세요"
              register={register("company", { required: "회사명을 정확하게 입력해주세요" })}
              helperText={errors.company?.message}
            />
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <p className="text-sm font-semibold text-gray-800">비밀번호</p>
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
                register={register("password", { required: "비밀번호를 입력해주세요." })}
                helperText={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-4 top-[8.8px]"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                <img
                  src={passwordVisible ? "/images/password_on.svg" : "/images/password_off.svg"}
                  alt="비밀번호 보기 토글"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <p className="text-sm font-semibold text-gray-800">비밀번호</p>
            <div className="relative">
              <Input
                type={passwordCheckVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                register={register("passwordCheck", { required: "비밀번호가 일치하지 않습니다." })}
                helperText={errors.passwordCheck?.message}
              />
              <button
                type="button"
                className="absolute right-4 top-[8.8px]"
                onClick={() => setPasswordCheckVisible((prev) => !prev)}
              >
                <img
                  src={passwordCheckVisible ? "/images/password_on.svg" : "/images/password_off.svg"}
                  alt="비밀번호 보기 토글"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <Button children={"확인"} size="lg" disabled={!isValid} className="mt-10" />
          <div className="flex-ro mt-6 flex justify-center">
            <p className="text-[15px] font-medium text-gray-800">이미 회원이신가요?</p>
            <Link href={"/sign-in"} className="border-b border-orange-600 text-[15px] font-medium text-orange-600">
              로그인
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
