import React, { useState, useEffect, useRef } from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { clsx } from "clsx";

interface InputTextProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  watch?: UseFormWatch<T>; // Add watch to monitor field value

  placeholder?: string;
  type?: string;
  disabled?: boolean;
  requiredMark?: boolean;

  error?: {
    isError: boolean;
    message?: string;
  };
}

const InputText = <T extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  type,
  disabled = false,
  requiredMark = false,
  error,
  watch,
}: InputTextProps<T>) => {
  // state menampilkan error & pada saat focus di input
  const [showError, setShowError] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [isCurrentlyFocused, setIsCurrentlyFocused] = useState(false);

  const fieldValue = watch ? watch(name) : undefined;
  const previousValueRef = useRef(fieldValue);

  useEffect(() => {
    const currentValue = fieldValue;
    const previousValue = previousValueRef.current;

    const isEmpty =
      !currentValue || String(currentValue).toString().trim() === "";
    const wasEmpty =
      !previousValue || String(previousValue).toString().trim() === "";

    if (error?.isError) {
      if (isCurrentlyFocused) {
        setShowError(false);
      } else if (isEmpty && hasBeenFocused) {
        setShowError(true);
      } else if (!isEmpty) {
        setShowError(false);
      } else if (!hasBeenFocused) {
        setShowError(true);
      }
    } else {
      setShowError(false);
    }

    previousValueRef.current = currentValue;
  }, [fieldValue, error?.isError, isCurrentlyFocused, hasBeenFocused]);

  const handleFocus = () => {
    setIsCurrentlyFocused(true);
    setHasBeenFocused(true);

    setShowError(false);
  };

  const handleBlur = () => {
    setIsCurrentlyFocused(false);

    const currentValue = fieldValue;
    const isEmpty =
      !currentValue || String(currentValue).toString().trim() === "";

    if (isEmpty && error?.isError) {
      setShowError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isCurrentlyFocused) {
      setShowError(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2.5">
      <label
        htmlFor={name.toString()}
        className="text-sm leading-[120%] font-normal text-[#292929]"
      >
        {label}
        {requiredMark && <span className="ml-[5px] text-[#ff4c4c]">*</span>}
      </label>

      <input
        type={type ? type : "text"}
        id={name.toString()}
        placeholder={placeholder}
        onWheel={(e) => e.currentTarget.blur()}
        className={clsx([
          "ring-0 outline-0",
          type === "number" && "no-spinner",
          "h-[50px] w-full rounded-md border bg-[#ffffff] px-3 text-base leading-[120%] font-normal",
          "focus:border-transparent focus:outline-2",
          // Dynamic styling berdasarkan state
          showError
            ? "focus:outline-x-error border-[#ff4c4c] text-[#ff4c4c] focus:text-[#ff4c4c]"
            : "border-gray-300 text-[#292929] focus:text-[#292929] focus:outline-[#292929]",
          // Styling saat disabled
          disabled && "cursor-not-allowed opacity-50",
        ])}
        {...register(name, {
          disabled: disabled,
          onChange: handleChange,
          onBlur: handleBlur,
        })}
        onFocus={handleFocus}
      />

      {showError && (
        <span className="text-sm leading-[120%] font-normal text-[#ff4c4c]">
          {error?.message ?? ""}
        </span>
      )}
    </div>
  );
};

export default InputText;
