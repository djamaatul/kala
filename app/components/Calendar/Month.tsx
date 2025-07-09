import moment from "moment";
import Link from "next/link";

import CalendarClass from "../../lib/calendar";
import Date from "./Date";

interface MonthProps {
  year: number;
  month: number;
  classNameDay?: string;
}

export default function Month(props: MonthProps) {
  const instance = moment().set("year", props.year).set("month", props.month);
  const days = CalendarClass.getDaysOfMonth(instance);

  return (
    <Link
      href={`/${instance.get("year")}/${instance.get("month")}`}
      className="flex flex-col gap-4 rounded-md p-4 bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20"
    >
      <div className="">
        <h2>{instance.format("MMMM YYYY")}</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, day) => {
          return (
            <span
              className="flex justify-center items-center"
              key={`day-${day}`}
            >
              {moment().set("day", day).format("ddd")}
            </span>
          );
        })}
        {days.map((day, index) => {
          return (
            <Date
              key={`date-${index}`}
              date={day.moment.format("YYYY-MM-DD")}
              primary={day.primary}
              className={props.classNameDay}
            >
              {day.moment.format("D")}
            </Date>
          );
        })}
      </div>
    </Link>
  );
}
