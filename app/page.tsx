import { redirect } from "next/navigation";

export default function Landing() {
  return redirect("/calendar/" + new Date().getFullYear());
}
