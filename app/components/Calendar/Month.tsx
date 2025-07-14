import moment from "moment";
import Link from "next/link";

import CalendarClass from "../../lib/calendar";
import Date from "./Date";
import { CalendarEvent } from "@/app/repositories/events";

interface MonthProps {
  year: number;
  month: number;
  classNameDay?: string;
  events?: CalendarEvent[];
}

export default async function Month(props: MonthProps) {
  const instance = moment().set("year", props.year).set("month", props.month);
  const days = CalendarClass.getDaysOfMonth(instance);

  return (
    <Link
      href={`/calendar/${instance.get("year")}/${instance.get("month")}`}
      className="flex flex-col gap-4 rounded-md p-4 bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20"
    >
      <div>
        <h2 className="text-lg">{instance.format("MMMM YYYY")}</h2>
      </div>
      <div className="grid grid-cols-7">
        {[...Array(7)].map((_, day) => {
          return (
            <div key={`day-${day}`} className="flex justify-center">
              <span>{moment().set("day", day).format("ddd")}</span>
            </div>
          );
        })}
        {days.map((day, index) => {
          const eventsOfDay = props.events?.filter((event) => {
            return moment(event.start_time, "YYYY-MM-DD HH:mm:ss").isSame(
              day.moment,
              "day",
            );
          });
          return (
            <Date
              key={`date-${index}`}
              date={day.moment.format("YYYY-MM-DD")}
              primary={day.primary}
              className={props.classNameDay}
              events={eventsOfDay}
            />
          );
        })}
      </div>
    </Link>
  );
}
