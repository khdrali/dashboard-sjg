import React, { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { clsx } from "clsx";
import Image from "next/image";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface InputPasswordProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;

  placeholder?: string;
  disabled?: boolean;
  requiredMark?: boolean;

  error?: {
    isError: boolean;
    message?: string;
  };
}

const InputPassword = <T extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  disabled = false,
  requiredMark = false,
  error,
}: InputPasswordProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleEye = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={name.toString()}
        className="text-[#292929] text-sm leading-[120%] font-normal"
      >
        {label}
        {requiredMark && <span className="text-[#ff4c4c] ml-[5px]">*</span>}
      </label>

      <div className="group">
        <div
          className={clsx([
            "ring-0 outline-0",
            "flex flex-row items-center justify-between gap-2.5",
            "bg-[#ffffff] border-[#989898] w-full rounded-md border px-3",
            "group-focus-within:border-transparent group-focus-within:outline-2",
            `${
              error?.isError
                ? "border-x-error group-focus-within:outline-[#ff4c4c]"
                : "group-focus-within:outline-[#292929]"
            }`,
          ])}
        >
          <input
            type={showPassword ? "text" : "password"}
            id={name.toString()}
            placeholder={placeholder}
            className={clsx([
              "h-[50px] w-full border-none ring-0 outline-0",
              "text-[#989898] text-base leading-[120%] font-normal",
              `${
                error?.isError
                  ? "group-focus-within:text-[#ff4c4c]"
                  : "group-focus-within:text-[#292929]"
              }`,
            ])}
            {...register(name, {
              disabled: disabled,
            })}
          />

          <button type="button" onClick={toggleEye}>
            {showPassword ? (
              <LuEye
                className={`h-[25px] w-[25px] ${
                  error?.isError ? "text-[#ff4c4c]" : ""
                }`}
              />
            ) : (
              <LuEyeClosed
                className={`h-[25px] w-[25px] ${
                  error?.isError ? "text-[#ff4c4c]" : ""
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {error?.isError && (
        <span className="text-[#ff4c4c] text-sm leading-[120%] font-normal">
          {error.message ?? ""}
        </span>
      )}
    </div>
  );
};

export default InputPassword;
