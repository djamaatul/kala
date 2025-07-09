import moment, { Moment } from "moment";

export interface ICalendar {
  moment: Moment;
  primary: boolean;
}

export default class Calendar {
  static getMonthOfYear(year: number) {
    return [...Array(12)].map((_, i) => {
      return {
        moment: moment()
          .set("year", year)
          .set("month", i + 1)
          .startOf("month"),
      };
    });
  }
  static getDaysOfMonth(month: Moment) {
    const calendar: ICalendar[] = [];
    const startDay = month.clone().startOf("month").startOf("week");
    const endDay = month.clone().endOf("month").endOf("week");

    const current = startDay.clone().subtract(1, "day");

    while (current.isBefore(endDay, "day"))
      calendar.push(
        ...[...Array(7)].map(() => {
          const moment = current.add(1, "day").clone();
          return {
            moment,
            primary: moment.isSame(month, "month"),
          };
        })
      );
    return calendar;
  }

  static getDaysOfYear(year: number) {
    return [...Array(12)].map((_, i) => {
      return Calendar.getDaysOfMonth(
        moment()
          .set("year", year)
          .set("month", i + 1)
      );
    });
  }
}
