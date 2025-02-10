import { HTMLInputTypeAttribute } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  helperText?: string;
  register?: ReturnType<UseFormRegister<T>>;
};

export default function Input<T extends FieldValues>({
  type = "text",
  placeholder,
  helperText,
  register,
}: InputProps<T>) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-orange-600`}
      />
      {helperText && <p className="mt-1 text-sm font-semibold text-red-600">{helperText}</p>}
    </div>
  );
}
