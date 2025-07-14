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
              "day"
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
      <div className="flex flex-col gap-2 items-start">
        {props.events?.map((event) => {
          return (
            <div
              className="flex gap-2 text-[var(--foreground)] relative overflow-hidden rounded-md"
              key={event.id}
            >
              <div
                className="opacity-30 backdrop-blur-sm left-0 top-0 absolute h-full w-full"
                style={{
                  backgroundColor: event.color ?? "var(--color-red-500)",
                }}
              ></div>
              <span className="bg-[var(--background)] px-2">
                {moment(event.start_time).format("DD")}-
                {moment(event.end_time).format("DD")}
              </span>
              <p className="pr-2">{event.title}</p>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
