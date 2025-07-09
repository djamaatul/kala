import CalendarClass from "../../lib/calendar";
import Month from "./Month";

type Props = {
  year: number;
};
export default function Calendar({ year }: Props) {
  const months = CalendarClass.getMonthOfYear(year);
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((instance, index) => {
          return (
            <Month
              key={`month-${index}`}
              year={year}
              month={instance.moment.get("month")}
            />
          );
        })}
      </div>
    </div>
  );
}
