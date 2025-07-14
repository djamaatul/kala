"use client";

import { InputHTMLAttributes } from "react";
import cn from "../utils/cn";
import { useFormContext } from "react-hook-form";

export default function Input({
  className,
  name,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div
        className={cn(
          "bg-[var(--foreground)]/20 p-2 rounded-sm",
          className,
          errors[name] && "border border-red-500"
        )}
      >
        <input
          className="outline-none w-full"
          {...props}
          {...register(name)}
          onBlur={() => trigger(name)}
        />
      </div>
      {errors[name]?.message && (
        <span className="text-red-500">{errors[name].message.toString()}</span>
      )}
    </>
  );
}
