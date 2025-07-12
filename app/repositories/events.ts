import moment, { Moment } from "moment";
import { Query } from "../lib/db";
import { v4 } from "uuid";

export type Event = {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  start_time: Moment;
  end_time: Moment;
  visibility: "public" | "private" | "shared";
  public_slug?: string;
  shared_slug?: string;
  createdAt: Moment;
};

export default class Events {
  db: Query;
  constructor(db: Query) {
    this.db = db;
  }

  async getUserEvents(user_id: string, year: number) {
    const start = moment()
      .set("year", year)
      .startOf("day")
      .format("YYYY-MM-DD");
    const end = moment()
      .set("year", year)
      .endOf("day")
      .format("YYYY-MM-DD 00:00:00");

    return this.db<Pick<Event, "id" | "title" | "start_time" | "end_time">[]>`
      SELECT
        id,
        title,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
      from
        events
      where
      (visibility = 'public' or (visibility = 'shared' and user_id = ${user_id})
      and start_time between to_date(${start}, 'yyyy-mm-dd hh24:mi:ss') and to_date(${end}, 'yyyy-mm-dd hh24:mi:ss')
    `;
  }

  async getPublicEvents(year: number) {
    const start = moment()
      .set("year", year)
      .startOf("day")
      .format("YYYY-MM-DD");
    const end = moment()
      .set("year", year)
      .endOf("day")
      .format("YYYY-MM-DD 00:00:00");

    return this.db<Pick<Event, "id" | "title" | "start_time" | "end_time">[]>`
      SELECT
        id,
        title,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
      from
        events
      where visibility = 'public' and start_time between to_date(${start}, 'yyyy-mm-dd hh24:mi:ss') and to_date(${end}, 'yyyy-mm-dd hh24:mi:ss')
    `;
  }

  async getDetailEvent(id: string) {
    return this.db<Event[]>`
      SELECT
        id,
        user_id,
        title,
        description,
        to_char("start_time", 'YYYY-MM-DD HH:mi:ss') as "start_time",
        to_char("end_time", 'YYYY-MM-DD HH:mi:ss') as "end_time"
        visibility,
        shared_slug,
        to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at"
      from
        events
      where id = ${id}
    `;
  }

  async getDetailSharedEvent(user_id: string, shared_slug: string) {
    return this.db<Event[]>`
      with cte as (
      select
        id,
        user_id,
        title,
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

  async saveShareEvent(user_id: string, id: string) {
    return this.db<Event[]>`
      insert into events (
        id,
        user_id,
        title,
        description,
        start_time,
        end_time,
        visibility,
        shared_slug,
        created_at
      )
      SELECT
        ${v4()}
        ${user_id},
        title,
        description,
        start_time,
        end_time,
        'private',
        shared_slug,
     	  to_date(NOW(), 'YYYY-MM-DD HH:mi:ss')
      from
        events
      where id = ${id}
      returning *
    `;
  }

  async deleteEvent(id: string) {
    return this.db<Event[]>`delete events where id = ${id} returning *`;
  }
}
