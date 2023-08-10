"use client";
import React, { InputHTMLAttributes, forwardRef } from "react";

interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label className="block mb-2 font-medium text-slate-500">{label}</label>
        <input
          ref={ref}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
          {...rest}
        />
      </div>
    );
  }
);

Textbox.displayName = 'Textbox';

export default Textbox;
