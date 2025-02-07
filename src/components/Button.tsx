"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/classnames";
import Spinner from "@/components/Spinner";

type ButtonProps = {
  styleType?: "solid" | "outline";
  size?: "sm" | "lg";
  loading?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  styleType = "solid",
  size = "sm",
  loading = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "w-full py-[10px] inline-flex items-center justify-center rounded-[12px] font-semibold disabled:cursor-not-allowed";

  const variantStyles = {
    solid: "bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 disabled:bg-gray-400",
    outline:
      "border border-orange-600 text-orange-600 hover:border-orange-500 hover:text-orange-500 active:text-orange-700 active:border-orange-700 disabled:border-gray-400 disabled:text-gray-400",
  };

  const sizeStyles = {
    sm: "text-sm",
    lg: "text-base",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[styleType], sizeStyles[size], className)}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Spinner color={styleType === "solid" ? "white" : "gray"} /> : <>{children}</>}
    </button>
  );
}
