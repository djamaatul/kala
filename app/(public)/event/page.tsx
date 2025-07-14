import { Event } from "@/app/repositories/events";
import FormEvent from "./components/FormEvent";
// import { getSession } from "@/app/utils/session";
// import { redirect } from "next/navigation";
import { ApiResponse } from "@/app/api/event/route";
import { v4 } from "uuid";

export default async function Page() {
  // const session = await getSession();
  // if (!session) return redirect("/404");

  // const events = await Events.getDetailUserEvents(session.id);
  const events = await fetch(process.env.BASE_URL + "/api/event");

  const data: ApiResponse<Event[]> = await events.json();

  return (
    <div className="flex flex-col gap-4">
      <FormEvent />
      {data.data?.map((event) => {
        return (
          <FormEvent
            key={event.id}
            defaultValues={{ ...event, user_id: v4() }}
          />
        );
      })}
    </div>
  );
}
