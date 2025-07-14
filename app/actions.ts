"use server";
import next from "next/cache";
import { cookies } from "next/headers";

export async function setThemeCookie(themeValue: string) {
  (await cookies()).set("theme", themeValue, { httpOnly: true, secure: true });
}

export async function revalidatePath(path: string) {
  await next.revalidatePath(path);
}
