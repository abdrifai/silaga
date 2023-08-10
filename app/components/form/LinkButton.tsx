// components/Button.tsx
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  url: string;
}

const LinkButton: React.FC<ButtonProps> = ({
  variant = "primary",
  url,
  children,
  ...rest
}) => {
  const buttonClasses = `px-4 py-2 rounded-md ${
    variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-500 text-black"
  } hover:bg-opacity-80`;

  return (
    <Link href={url}>
      <button className={buttonClasses} {...rest}>
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
