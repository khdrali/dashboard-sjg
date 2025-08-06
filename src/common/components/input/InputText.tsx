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
  disabled = false,
  requiredMark = false,
  error,
  watch,
}: InputTextProps<T>) => {
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
        className="text-[#292929] text-sm leading-[120%] font-normal"
      >
        {label}
        {requiredMark && <span className="text-[#ff4c4c] ml-[5px]">*</span>}
      </label>

      <input
        type={"text"}
        id={name.toString()}
        placeholder={placeholder}
        className={clsx([
          "ring-0 outline-0",
          "bg-[#ffffff] h-[50px] w-full rounded-md border px-3 text-base leading-[120%] font-normal",
          "focus:border-transparent focus:outline-2",
          // Dynamic styling berdasarkan state
          showError
            ? "border-[#ff4c4c] focus:outline-x-error text-[#ff4c4c] focus:text-[#ff4c4c]"
            : "focus:outline-[#292929] text-[#292929] focus:text-[#292929] border-gray-300",
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
        <span className="text-[#ff4c4c] text-sm leading-[120%] font-normal">
          {error?.message ?? ""}
        </span>
      )}
    </div>
  );
};

export default InputText;
