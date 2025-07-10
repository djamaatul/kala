"use client";

import cn from "@/app/utils/cn";
import moment from "moment";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  date: string;
  primary: boolean;
  className?: string;
}>;

export default function Date(props: Props) {
  const date = moment(props.date, "YYYY-MM-DD");
  function handleClick() {}

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex justify-center items-center hover:bg-foreground/20 rounded-sm aspect-square",
        !props.primary && "text-[var(--foreground)]/30",
        props.className
      )}
    >
      {date.format("D")}
    </button>
  );
}
