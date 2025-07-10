import { getServerSession } from "next-auth";
import Calendar from "@/app/components/Calendar";
import Image from "next/image";

interface Props {
  params: Promise<{
    year: number;
  }>;
}

export default async function Home({ params }: Props) {
  const session = await getServerSession();
  const year = (await params).year ?? new Date().getFullYear();
  return (
    <div className="p-4 space-y-8">
      {session?.user && (
        <div className="flex gap-4 items-end">
          {session.user?.image && (
            <Image
              alt=""
              src={session.user?.image}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}

          <h2 className="text-2xl font-bold">Hi, {session.user?.name}!</h2>
        </div>
      )}
      <Calendar year={year} />
    </div>
  );
}
