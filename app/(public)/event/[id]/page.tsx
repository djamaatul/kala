import Events from "@/app/repositories/events";
import FormEvent from "../components/FormEvent";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await Events.getDetailEvent(id);
	
  return (
    <div>
      <FormEvent defaultValues={event} />
    </div>
  );
}
