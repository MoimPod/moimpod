"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { restoreAuthModalState, clearAuthModalState } from "@/app/(common)/_home/_hooks/useCheckAuth";

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (data: FormValues) => {
    const { email, password } = data;
    let LoginError = false;
    if (email === "") {
      setError("email", { type: "manual", message: "아이디를 입력해주세요." });
      LoginError = true;
    } else {
      clearErrors("email");
    }
    if (password.length < 8) {
      setError("password", { type: "manual", message: "비밀번호는 최소 8자 이상입니다." });
      LoginError = true;
    } else {
      clearErrors("password");
    }
    if (LoginError) return;
    const result = await postSignIn({ email, password });
    if (result.token) {
      // 토큰이 들어왔을때 cookies로 저장하기
      document.cookie = `token=${result.token};`;
      const userInfo = await getUser(result.token);

      const shouldOpenModal = restoreAuthModalState();
      clearAuthModalState();

      // user 정보 저장하기
      setUser(userInfo); // setUser 호출
      // 로그인 성공 이후 main으로 이동
      router.push("/");

      if (shouldOpenModal) {
        useUserStore.getState().setShouldOpenCreateModal(true);
      }
    } else {
      if (result.status === 401) {
        setError("password", { type: "manual", message: "비밀번호가 아이디와 일치하지 않습니다." });
      }
      if (result.status === 404) {
        setError("email", { type: "manual", message: "존재하지 않는 아이디입니다." });
      }
    }
  };

  const postSignIn = async (data: FormValues) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auths/signin`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const getUser = async (token: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}auths/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="flex w-full flex-col lg:max-w-[608px] xl:max-w-[510px]">
        <form onSubmit={handleSubmit(handleLogin)} className="flex w-full flex-col rounded-3xl bg-white p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={"/images/auth_icon.svg"} alt={""} width={50} height={50} />
            <p className="text-center text-xl font-semibold text-gray-800">로그인</p>
          </div>
          <div className="m-auto w-full max-w-[500px]">
            <div className="flex flex-col gap-2 pt-8">
              <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                아이디
              </label>
              <Input
                id={"email"}
                type={"email"}
                placeholder="이메일을 입력해주세요."
                register={register("email", { required: "아이디를 입력해주세요." })}
                helperText={errors.email?.message}
              />
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                비밀번호
              </label>
              <div className="relative">
                <Input
                  id={"password"}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  register={register("password", { required: "비밀번호는 최소 8자 이상입니다." })}
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
            <Button size="lg" disabled={!isValid} className="mt-10" type="submit">
              로그인
            </Button>
            <div className="flex-ro mt-6 flex justify-center">
              <p className="text-[15px] font-medium text-gray-800">모임팟이 처음이신가요?</p>
              <Link
                href={"/sign-up"}
                className="border-b border-primary-color text-[15px] font-medium text-primary-color"
              >
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
