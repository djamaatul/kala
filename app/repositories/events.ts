import moment from "moment";
import { v4 } from "uuid";
import { query, db } from "../lib/db";
import z from "zod";
import { queryDto } from "../api/event/event.dto";

export type Event = {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  color?: string;
  start_time: string;
  end_time: string;
  visibility: "public" | "private" | "shared";
  shared_slug?: string | null;
  created_at: string;
};
export type CalendarEvent = Pick<
  Event,
  "id" | "title" | "start_time" | "end_time" | "color"
>;

type Keys<T = string | number> = T | T[];
class Binding<T> {
  bind: T[] = [];
  query: string = "";
  push(value: T, cb: (valuekey: Keys<string>) => void) {
    if (Array.isArray(value)) {
      const keys = value.flatMap((v) => {
        if (!v) return [];
        this.bind.push(v);
        return `$${this.bind.length}`;
      });
      this.query += cb(keys);
      return;
    } else {
      if (!value) return;
      const key = this.bind.length + 1;
      this.bind.push(value);
      this.query += cb(`$${key}`);
    }
  }
}

type GetUserCalenderEvents = {
  user_id?: string;
  year?: number;
};

type GetUserEvents = { user_id?: string } & Partial<z.Infer<typeof queryDto>>;
export default class EventRepository {
  static async getUserCalenderEvents({
    user_id = "",
    year,
  }: GetUserCalenderEvents) {
    const bind = new Binding();

    bind.push(["public", "shared", "private", user_id], (keys) => {
      return ` AND (visibility = ${keys[0]} or (visibility IN (${keys[1]},${keys[2]}) and user_id = ${keys[3]}))`;
    });

    if (year) {
      const start = moment()
        .set("year", year)
        .startOf("year")
        .format("YYYY-MM-DD HH:mm:ss");
      const end = moment()
        .set("year", year)
        .endOf("year")
        .format("YYYY-MM-DD HH:mm:ss");

      bind.push(
        start,
        (key) =>
          ` and start_time between to_date(${key}, 'yyyy-mm-dd hh24:mi:ss')`
      );
      bind.push(end, (key) => ` and to_date(${key}, 'yyyy-mm-dd hh24:mi:ss')`);
    }

    const data = await db.query<CalendarEvent>(
      `SELECT
        id,
        title,
        color,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
      from
        events
      where 1=1 ${bind.query}
    `,
      bind.bind
    );

    return data.rows;
  }

  static async getUserEvents({ user_id }: GetUserEvents) {
    const bind = new Binding();

    bind.push(user_id, (keys) => ` AND user_id = ${keys}`);

    const data = await db.query<Event>(
      `SELECT
        id,
        user_id,
        title,
        description,
				color,
        visibility,
        shared_slug,
        to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at",
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
      from
        events
      where 1=1 ${bind.query}
    `,
      bind.bind
    );

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

  static async saveEvent(event: Omit<Event, "created_at" | "id">) {
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
     	  NOW()
			)
    `;
  }

  static async updateEvent(event: Omit<Event, "created_at">) {
    const bind = new Binding();

    bind.push(event.title, (key) => ` title = ${key},`);
    bind.push(event.description, (key) => ` description = ${key},`);
    bind.push(event.color, (key) => ` color = ${key},`);
    bind.push(
      event.start_time,
      (key) => ` start_time = TO_DATE(${key}, 'YYYY-MM-DD'),`
    );
    bind.push(
      event.end_time,
      (key) => ` end_time = TO_DATE(${key}, 'YYYY-MM-DD'),`
    );
    bind.push(event.visibility, (key) => ` visibility = ${key},`);
    bind.push(event.shared_slug, (key) => ` shared_slug = ${key},`);

    return db.query(
      `
			update events
			set
				${bind.query}
				updated_at = NOW()
			WHERE
				id = $${bind.bind.length + 1}
		`,
      [...bind.bind, event.id]
    );
  }

  static async deleteEvent(id: string) {
		console.log(id)
    return query<Event>`delete from events where id = ${id}`;
  }
}
