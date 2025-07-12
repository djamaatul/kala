import { PropsWithChildren } from "react";
import cn from "../utils/cn";

export default function Field({
  children,
  className,
  label,
}: PropsWithChildren<{
  className?: string;
  label: string;
}>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label>{label}</label>
      {children}
    </div>
  );
}
