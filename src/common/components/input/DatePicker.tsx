import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { clsx } from "clsx";
import { format, parse } from "date-fns";

interface InputDateTimeProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>; // wajib untuk update manual
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  requiredMark?: boolean;
  error?: {
    isError: boolean;
    message?: string;
  };
  watch?: UseFormWatch<T>;
}

const InputDateTime = <T extends FieldValues>({
  register,
  setValue,
  name,
  label,
  placeholder,
  disabled = false,
  requiredMark = false,
  error,
  watch,
}: InputDateTimeProps<T>) => {
  const value = watch ? watch(name) : null;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <label
        htmlFor={name.toString()}
        className="text-sm leading-[120%] font-normal text-[#292929]"
      >
        {label}
        {requiredMark && <span className="ml-[5px] text-[#ff4c4c]">*</span>}
      </label>

      <DatePicker
        id={name.toString()}
        selected={
          value
            ? typeof value === "string"
              ? parse(value, "dd/MM/yyyy HH:mm", new Date())
              : value
            : null
        }
        onChange={(date) => {
          if (date) {
            const formatted = format(date, "dd/MM/yyyy HH:mm");
            setValue(name, formatted as any, { shouldValidate: true });
          } else {
            setValue(name, "" as any, { shouldValidate: true });
          }
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText={placeholder}
        className={clsx([
          "ring-0 outline-0",
          "h-[50px] w-full rounded-md border bg-[#ffffff] px-3 text-base leading-[120%] font-normal",
          error?.isError
            ? "border-[#ff4c4c] text-[#ff4c4c]"
            : "border-gray-300 text-[#292929]",
          disabled && "cursor-not-allowed opacity-50",
        ])}
        disabled={disabled}
      />

      {error?.isError && (
        <span className="text-sm leading-[120%] font-normal text-[#ff4c4c]">
          {error?.message ?? ""}
        </span>
      )}
    </div>
  );
};

export default InputDateTime;
