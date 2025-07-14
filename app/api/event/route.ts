import {
  deleteEventDto,
  getEventDto,
  saveEventDto,
  updateEventDto,
} from "./event.dto";
import { Event } from "@/app/repositories/events";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

const events: Event[] = [];

export type ApiResponse<T> = {
  code: number;
  data?: T;
};

export async function GET(req: NextRequest) {
  const payload = Object.fromEntries(req.nextUrl.searchParams.entries());

  const parsed = getEventDto.safeParse(payload);

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  const { query, page, record, order } = parsed.data;

  const data = events
    .filter((x) => `${x.title}`.includes(query))
    .slice(+record * (+page - 1), +record * +page)
    .sort((a, b) => {
      if (order.toLowerCase() === "DESC")
        return `${b.title}`
          .toLowerCase()
          .localeCompare(`${a.title}`.toLowerCase());

      return `${a.title}`
        .toLowerCase()
        .localeCompare(`${b.title}`.toLowerCase());
    });
  return NextResponse.json(
    {
      code: 1,
      data,
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = saveEventDto.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  events.push({
    ...parsed.data,
    id: v4(),
    createdAt: moment().toISOString(),
  });

  return NextResponse.json(
    {
      code: 1,
    },
    { status: 201 }
  );
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const parsed = updateEventDto.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  const index = events.findIndex(({ id }) => id === parsed.data.id);

  if (!~index) return NextResponse.json({ code: 0 }, { status: 400 });

  events[index] = {
    ...events[index],
    ...body,
  };

  return NextResponse.json(
    {
      code: 1,
    },
    { status: 200 }
  );
}
export async function DELETE(req: Request) {
  const body = await req.json();

  const parsed = deleteEventDto.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  const index = events.findIndex(({ id }) => id === parsed.data.id);

  if (!~index) return NextResponse.json({ code: 0 }, { status: 400 });

  events.splice(index, 1);

  return NextResponse.json(
    {
      code: 1,
    },
    { status: 200 }
  );
}
