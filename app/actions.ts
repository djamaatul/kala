"use server";
import next from "next/cache";
import { cookies } from "next/headers";
import EventRepository from "./repositories/events";
import { getSession } from "./utils/session";
import { saveEventDto, updateEventDto } from "./api/event/event.dto";
import { v4 } from "uuid";

export async function setThemeCookie(themeValue: string) {
  (await cookies()).set("theme", themeValue, { httpOnly: true, secure: true });
}

export async function revalidatePath(path: string) {
  next.revalidatePath(path);
}

export async function saveUpdateEventAction(
  _: Record<string, string>,
  formData: FormData
): Promise<Record<string, string>> {
  const session = await getSession();
  const body = Object.fromEntries(formData);

  if (body.id) {
    const event = await updateEventDto.safeParseAsync({
      ...body,
      shared_slug: body.visibility === "shared" ? v4() : null,
      user_id: session!.id,
    });

    if (event.error) {
      return {};
    }

    await EventRepository.updateEvent({
      ...event.data,
    });

    next.revalidatePath("/event");
    return {};
  }

  const event = await saveEventDto.safeParseAsync({
    ...body,
    shared_slug: body.visibility === "shared" ? v4() : "",
    user_id: session!.id,
  });

  if (event.error) {
    return {};
  }

  await EventRepository.saveEvent(event.data);

  next.revalidatePath("/event");
  return {};
}

export async function deleteEventAction(id: string) {
  const session = await getSession();
  const event = await EventRepository.getDetailEvent(id);

  if (event.user_id === session?.id) {
    await EventRepository.deleteEvent(id);
  }

  next.revalidatePath("/event");
}
