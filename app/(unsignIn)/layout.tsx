import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Divider from "../components/Divider";

export default async function HomepageLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (session) return redirect("/");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 bg-[var(--foreground)]/10 rounded-md p-4">
        {children}
        <Divider />
        <Link href="/" className="block">
          Back
        </Link>
      </div>
    </div>
  );
}
