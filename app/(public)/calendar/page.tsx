import { redirect } from "next/navigation";

export default async function CalendarPage() {
  return redirect("/calendar/" + new Date().getFullYear());
}
