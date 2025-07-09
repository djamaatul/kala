"use server";
import { cookies } from "next/headers";

export async function setThemeCookie(themeValue: string) {
  (await cookies()).set("theme", themeValue, { httpOnly: true, secure: true });
}
