"use client";
import React, { InputHTMLAttributes, forwardRef } from "react";

interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextboxH = forwardRef<HTMLInputElement, TextboxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-4">
          <label className="block mb-2 font-medium text-slate-500">
            {label}
          </label>
        </div>
        <div className="col-span-8">
          <input
            ref={ref}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            {...rest}
          />
        </div>
      </div>
    );
  }
);

TextboxH.displayName = 'TextboxH';

export default TextboxH;
