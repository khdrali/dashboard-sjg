import clsx from "clsx";
import React from "react";

interface SubmitButtonProps {
  label: string;
  type?: HTMLButtonElement["type"];
  onClick?: () => void;
  disabled: boolean;
}

const SubmitButton = ({
  label,
  type,
  onClick,
  disabled,
}: SubmitButtonProps) => {
  return (
    <button
      type={type ?? "submit"}
      disabled={disabled}
      className={clsx([
        "bg-blue-600 flex h-[50px] w-full items-center justify-center rounded-md px-[26px] transition-colors duration-300",
        "hover:bg-blue-500 hover:cursor-pointer",
      ])}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          e.stopPropagation();

          onClick();
        }
      }}
    >
      <span className="text-[#ffffff] text-lg leading-[120%] font-medium">
        {label}
      </span>
    </button>
  );
};

export default SubmitButton;
