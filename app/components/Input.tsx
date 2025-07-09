import { InputHTMLAttributes } from "react";
import cn from "../utils/cn";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("bg-[var(--foreground)]/20 p-2 rounded-sm", className)}>
      <input className="outline-none" {...props} />
    </div>
  );
}
