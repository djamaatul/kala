import EventRepository from "@/app/repositories/events";
import FormEvent from "./components/FormEvent";
import { getSession } from "@/app/utils/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session) return redirect("/404");

  const events = await EventRepository.getUserEvents({
    user_id: session.id,
  });

  return (
    <div className="flex flex-col gap-8">
      <FormEvent />
      <h4 className="text-lg font-semibold">My Event</h4>
      <div className="flex flex-col gap-4">
        {events?.map((event) => {
          return <FormEvent key={event.id} defaultValues={event} />;
        })}
      </div>
    </div>
  );
}
