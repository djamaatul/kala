import EventRepository from "@/app/repositories/events";
import {
  deleteEventDto,
  queryDto,
  saveEventDto,
  updateEventDto,
} from "./event.dto";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/utils/session";

export type ApiResponse<T> = {
  code: number;
  data?: T;
};

export async function GET(req: NextRequest) {
  const session = await getSession();
  const payload = Object.fromEntries(req.nextUrl.searchParams.entries());

  const parsed = queryDto.safeParse(payload);

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  const data = await EventRepository.getUserEvents({
    user_id: session?.id,
    ...parsed.data,
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
  const session = await getSession();

  if (!session)
    return NextResponse.json(
      { code: 0, message: "Not authorized" },
      { status: 401 }
    );

  const parsed = saveEventDto.safeParse({
    ...body,
    user_id: session.id,
  });

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  await EventRepository.saveEvent(parsed.data);

  return NextResponse.json(
    {
      code: 1,
    },
    { status: 201 }
  );
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const session = await getSession();

  if (!session)
    return NextResponse.json(
      { code: 0, message: "Not authorized" },
      { status: 401 }
    );

  const parsed = updateEventDto.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { code: 0, message: parsed.error.issues },
      { status: 400 }
    );

  await EventRepository.updateEvent(parsed.data);

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

  await EventRepository.deleteEvent(parsed.data.id);

  return NextResponse.json(
    {
      code: 1,
    },
    { status: 200 }
  );
}
