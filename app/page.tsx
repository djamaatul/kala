import { redirect } from "next/navigation";

export default function Landing() {
  return redirect("/" + new Date().getFullYear());
}
