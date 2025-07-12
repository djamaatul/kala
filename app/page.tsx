import { redirect } from "next/navigation";
import "@/app/lib/db";

export default function Landing() {
  return redirect("/calendar/" + new Date().getFullYear());
}
