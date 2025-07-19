import Calendar from "@/app/components/Calendar";
import Image from "next/image";
import { getSession } from "@/app/utils/session";
import EventRepository from "@/app/repositories/events";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    year: number;
  }>;
}

export default async function Home({ params }: Props) {
  const session = await getSession();
  const year = (await params).year ?? new Date().getFullYear();

  const events = await (async () => {
    if (session) {
      return EventRepository.getUserCalenderEvents({
        user_id: session.id,
        year,
      });
    }
    return EventRepository.getPublicEvents(year);
  })();

  return (
    <div className="p-4 space-y-8">
      {session && (
        <div className="flex gap-4 items-end">
          {session.image && (
            <Image
              alt=""
              src={session.image}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}

          <h2 className="text-2xl font-bold">Hi, {session.name}!</h2>
        </div>
      )}
      <Suspense fallback={<></>}>
        <Calendar year={year} events={events} />
      </Suspense>
    </div>
  );
}
