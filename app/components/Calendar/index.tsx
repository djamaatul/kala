import { CalendarEvent } from "@/app/repositories/events";
import CalendarClass from "../../lib/calendar";
import Month from "./Month";
import { Suspense } from "react";
import MonthSkeleton from "@/app/(public)/calendar/components/MonthSkeleton";

type Props = {
  year: number;
  events: CalendarEvent[];
};
export default function Calendar(props: Props) {
  const months = CalendarClass.getMonthOfYear(props.year);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<MonthSkeleton />}>
          {months.map((month, index) => {
            return (
              <Month
                key={`month-${index}`}
                year={props.year}
                month={month.moment.get("month")}
                events={props.events}
              />
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
