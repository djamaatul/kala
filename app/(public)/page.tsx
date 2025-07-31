import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Button from "../components/Button";
import Link from "next/link";

export default async function Landing() {
  const session = await getServerSession();

  if (session) return redirect("/calendar/" + new Date().getFullYear());

  return (
    <div className="min-h-screen overflow-hidden flex flex-col justify-center items-center gap-4">
      <h1 className="text-7xl font-bold text-[var(--foreground)]">KALA</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
        <Link href="/calendar">
          <Button.ghost>Public Event</Button.ghost>
        </Link>
      </div>
    </div>
  );
}
