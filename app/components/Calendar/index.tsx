import { CalendarEvent } from "@/app/repositories/events";
import CalendarClass from "../../lib/calendar";
import Month from "./Month";
import moment from "moment";
import { Suspense } from "react";

type Props = {
  year: number;
  events?: CalendarEvent[];
};
export default function Calendar(props: Props) {
  const months = CalendarClass.getMonthOfYear(props.year);

  const generateEventRange =
    props.events?.flatMap((item) => {
      const start_time = moment(item.start_time);
      const end_time = moment(item.end_time).endOf("day");
      const events = [];
      while (start_time.isSameOrBefore(end_time)) {
        events.push({
          ...item,
          start_time: start_time.format("YYYY-MM-DD HH:mm:ss"),
        });
        start_time.add(1, "day");
      }
      return events;
    }) ?? [];

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<></>}>
          {months.map((month, index) => {
            const eventOfMonth = generateEventRange?.filter((event) => {
              return moment(event.start_time, "YYYY-MM-DD HH:mm:ss").isSame(
                month.moment,
                "month"
              );
            });
            return (
              <Month
                key={`month-${index}`}
                year={props.year}
                month={month.moment.get("month")}
                events={eventOfMonth}
              />
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
