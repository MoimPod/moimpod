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
    "w-full py-[10px] inline-flex items-center justify-center rounded-[12px] disabled:cursor-not-allowed";

  const variantStyles = {
    solid: "bg-orange-600 text-white hover:bg-orange-700 disabled:bg-gray-400",
    outline:
      "border border-orange-600 text-orange-600 hover:text-orange-500 disabled:border-gray-400 disabled:text-gray-400",
  };

  const sizeStyles = {
    sm: "text-sm font-semibold",
    lg: "text-base font-semibold",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[styleType], sizeStyles[size], className)}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Spinner styleType={styleType} /> : <>{children}</>}
    </button>
  );
}
