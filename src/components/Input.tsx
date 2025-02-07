import Image from "next/image";
import { useState } from "react";

type InputProps = {
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
};

export default function Input({ type = "text", placeholder, value, onChange, helperText }: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      <input
        type={isPassword && !passwordVisible ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-orange-600`}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-4 top-[8.8px]"
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          <Image
            src={passwordVisible ? "/images/password_on.svg" : "/images/password_off.svg"}
            alt="비밀번호 보기 토글"
            width={24}
            height={24}
          />
        </button>
      )}
      {helperText && <p className="mt-1 text-sm font-semibold text-red-600">{helperText}</p>}
    </div>
  );
}
