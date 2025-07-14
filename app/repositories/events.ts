import moment from "moment";
import { v4 } from "uuid";
import { query } from "../lib/db";

export type Event = {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  color?: string;
  start_time: string;
  end_time: string;
  visibility: "public" | "private" | "shared";
  shared_slug?: string;
  createdAt: string;
};
export type CalendarEvent = Pick<
  Event,
  "id" | "title" | "start_time" | "end_time" | "color"
>;

export default class Events {
  static async getUserEvents(user_id: string, year: number) {
    const start = moment()
      .set("year", year)
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    const end = moment()
      .set("year", year)
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    const data = await query<CalendarEvent>`
      SELECT
        id,
        title,
        color,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
      from
        events
      where
      (visibility = 'public' or (visibility = 'shared' and user_id = ${user_id})
      and start_time between to_date(${start}, 'yyyy-mm-dd hh24:mi:ss') and to_date(${end}, 'yyyy-mm-dd hh24:mi:ss'))
    `;
    return data.rows;
  }

  static async getPublicEvents(year: number) {
    const start = moment()
      .set("year", year)
      .startOf("year")
      .format("YYYY-MM-DD HH:mm:ss");
    const end = moment()
      .set("year", year)
      .endOf("year")
      .format("YYYY-MM-DD HH:mm:ss");

    const data = await query<CalendarEvent>`
      SELECT
        id,
        title,
				color,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
      from
        events
      where visibility = 'public' and start_time between to_date(${start}, 'yyyy-mm-dd hh24:mi:ss') and to_date(${end}, 'yyyy-mm-dd hh24:mi:ss')
    `;
    return data.rows;
  }

  static async getDetailEvent(id: string) {
    const data = await query<Event>`
      SELECT
        id,
        user_id,
        title,
        description,
				color,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time",
        visibility,
        shared_slug,
        to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at"
      from
        events
      where id = ${id}
    `;
    return data.rows[0];
  }

  static async getDetailUserEvents(user_id: string) {
    const data = await query<Event>`
      SELECT
        id,
        user_id,
        title,
        description,
				color,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time",
        visibility,
        shared_slug,
        to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at"
      from
        events
			where user_id = ${user_id}`;
    return data.rows;
  }

  static async getDetailSharedEvent(user_id: string, shared_slug: string) {
    return query<Event>`
      with cte as (
      select
        id,
        user_id,
        title,
				color,
        description,
        start_time,
        end_time,
        visibility,
        shared_slug,
        to_char("created_at", 'yyyy-mm-dd hh:mi:ss') as "created_at"
      from
        events
      where visibility = 'shared' and shared_slug = ${shared_slug} and user_id = ${user_id}
    ),
    c as (
      SELECT shared_slug, count(1) "count" from events where shared_slug = ${shared_slug} group by shared_slug
    )
    select cte.*, c."count" from cte
    inner join c on cte.shared_slug = c.shared_slug
    `;
  }

  static async saveShareEvent(user_id: string, id: string) {
    return query<Event>`
      insert into events (
        id,
        user_id,
        title,
				color,
        description,
        start_time,
        end_time,
        visibility,
        shared_slug,
        created_at
      )
      SELECT
        ${v4()},
        ${user_id},
        title,
				color,
        description,
        start_time,
        end_time,
        'private',
        shared_slug,
     	  to_date(NOW(), 'YYYY-MM-DD HH:mi:ss')
      from
        events
      where id = ${id}
    `;
  }

  static async saveEvent(event: Event) {
    return query<Event>`
      insert into events (
        id,
        user_id,
        title,
				color,
        description,
        start_time,
        end_time,
        visibility,
        shared_slug,
        created_at
      )
      VALUES (
        ${v4()},
        ${event.user_id},
        ${event.title},
				${event.color},
        ${event.description},
        ${event.start_time},
        ${event.end_time},
        ${event.visibility},
        ${event.shared_slug},
     	  to_date(NOW(), 'YYYY-MM-DD HH:mi:ss')
    `;
  }

  static async deleteEvent(id: string) {
    return query<Event>`delete events where id = ${id} returning *`;
  }
}
