// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  const buttonClasses = `px-4 py-2 rounded-md ${
    variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-500 text-black"
  } hover:bg-opacity-80`;

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
