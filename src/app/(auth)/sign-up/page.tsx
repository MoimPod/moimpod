"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  companyName: string;
  password: string;
  passwordCheck?: string;
};

export default function SignUp() {
  // 회원가입 성공시 modal
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const handleSignUp = async (data: FormValues) => {
    const { name, email, companyName, password, passwordCheck } = data;
    if (name !== "") {
      setError("name", { type: "manual", message: "이름을 입력해주세요" });
    } else {
      clearErrors("name");
    }
    if (email !== "") {
      setError("email", { type: "manual", message: "중복된 이메일입니다." });
    } else {
      clearErrors("email");
    }
    if (companyName !== "") {
      setError("companyName", { type: "manual", message: "회사명을 정확하게 입력해주세요" });
    } else {
      clearErrors("companyName");
    }
    if (password.length < 8) {
      setError("password", { type: "manual", message: "비밀번호를 입력해주세요." });
    } else {
      clearErrors("password");
    }
    if (passwordCheck !== password) {
      setError("passwordCheck", { type: "manual", message: "비밀번호가 일치하지 않습니다." });
    } else {
      clearErrors("passwordCheck");
    }
    const result = await postSignUp({ name, email, companyName, password });
    if (result.message === "사용자 생성 성공") {
      setIsModal(true);
    } else {
      setError(result.parameter, { type: "manual", message: result.message });
    }
  };

  const postSignUp = async (data: FormValues) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signup`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("회원가입에 실패 하였습니다.", error);
    }
  };

  // 비밀번호 변경시 보이는 icon
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="flex w-full flex-col lg:max-w-[608px] xl:max-w-[510px]">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="m-auto flex w-full flex-col rounded-3xl bg-white px-4 py-8 md:max-w-[608px] xl:m-0 xl:max-w-[510px] xl:px-14"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={"/images/auth_icon.svg"} alt={""} width={50} height={50} />
            <p className="text-center text-xl font-semibold text-gray-800">회원가입</p>
          </div>
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
                register={register("companyName", { required: "회사명을 정확하게 입력해주세요" })}
                helperText={errors.companyName?.message}
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
            <Button size="lg" disabled={!isValid} className="mt-10">
              확인
            </Button>
            <div className="flex-ro mt-6 flex justify-center">
              <p className="text-[15px] font-medium text-gray-800">이미 회원이신가요?</p>
              <Link
                href={"/sign-in"}
                className="border-b border-primary-color text-[15px] font-medium text-primary-color"
              >
                로그인
              </Link>
            </div>
          </div>
        </form>
        {isModal ? (
          <>
            <Modal
              isOpen={isModal}
              onClose={() => {
                setIsModal(false);
                router.push("/sign-in");
              }}
            >
              <div className="w-full min-w-[252px]">
                <p className="py-12 text-center text-base font-medium text-gray-900">가입이 완료 되었습니다.</p>
                <div className="m-auto flex w-[120px]">
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsModal(false);
                      router.push("/sign-in");
                    }}
                  >
                    확인
                  </Button>
                </div>
              </div>
            </Modal>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
