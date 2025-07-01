import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
};

const ButtonForm = ({
  onClick,
  disabled,
  children,
  type,
  fullWidth,
  secondary,
  danger,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        "flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "text-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonForm;
