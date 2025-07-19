"use client";

import { CalendarEvent } from "@/app/repositories/events";
import cn from "@/app/utils/cn";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MouseEventHandler, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  date: string;
  primary: boolean;
  className?: string;
  events?: CalendarEvent[];
}>;

export default function Date(props: Props) {
  const router = useRouter();
  const date = moment(props.date, "YYYY-MM-DD");
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    router.push(
      `${date.get("years")}/${date.get("month")}/${date.get("date")}`
    );
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex flex-col justify-center gap-2 hover:bg-[var(--foreground)]/20 rounded-sm relative min-h-20",
        !props.primary && "text-[var(--foreground)]/30",
        date.get("day") === 0 && "text-red-500",
        props.className
      )}
    >
      {date.format("D")}
      <div className="flex flex-col gap-0.5">
        {props.events?.map((event) => {
          return (
            <div
              className="text-white w-full min-h-1 text-nowrap overflow-hidden text-ellipsis text-xs"
              key={event.id}
              style={{
                backgroundColor: event.color ?? "var(--color-red-500)",
              }}
            ></div>
          );
        })}
      </div>
    </button>
  );
}
