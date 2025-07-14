"use client";

import { revalidatePath } from "@/app/actions";
import { saveEventDto } from "@/app/api/event/event.dto";
import Button from "@/app/components/Button";
import Field from "@/app/components/Field";
import Input from "@/app/components/Input";
import { Event } from "@/app/repositories/events";
import moment from "moment";
import { FormProvider, useForm } from "react-hook-form";
import { v4 } from "uuid";
import z from "zod";

type Props = {
  defaultValues?: Event;
};

export default function FormEvent(props: Props) {
  const form = useForm({
    defaultValues: {
      ...props.defaultValues,
      visibility: props.defaultValues?.visibility ?? "private",
      start_time: moment(props.defaultValues?.start_time).format("YYYY-MM-DD"),
      end_time: moment(props.defaultValues?.end_time).format("YYYY-MM-DD"),
    },
  });

  const values = form.getValues();

  async function handleSave() {
    const payload: z.infer<typeof saveEventDto> = {
      ...values,
      visibility: values.visibility ?? "private",
      start_time: moment(values.start_time).format("YYYY-MM-DD HH:mm"),
      end_time: moment(values.end_time).format("YYYY-MM-DD HH:mm"),
      user_id: values.user_id ?? v4(),
    };
    await fetch("/api/event", {
      method: values.id ? "PATCH" : "POST",
      body: JSON.stringify(payload),
    });

    await revalidatePath("/event");
  }

  async function handleDelete() {
    await fetch("/api/event", {
      method: "DELETE",
      body: JSON.stringify({
        id: values.id,
      }),
    });
    await revalidatePath("/event");
  }

  return (
    <FormProvider {...form}>
      <form className="bg-[var(--foreground)]/10 p-4 border rounded-md flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Title">
            <Input placeholder="Title" name="title" />
          </Field>

          <Field label="Description">
            <Input placeholder="Description" name="description" />
          </Field>

          <Field label="Color">
            <Input placeholder="Color" name="color" type="color" />
          </Field>

          <Field label="Start Time">
            <Input placeholder="Start Time" name="start_time" type="date" />
          </Field>

          <Field label="End Time">
            <Input placeholder="End Time" name="end_time" type="date" />
          </Field>

          <Field label="Visibility">
            <select className="bg-[var(--foreground)]/20 p-2 rounded-sm">
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="share">Share</option>
            </select>
          </Field>
        </div>

        <div className="flex justify-between items-center">
          {values.id && <span>id: {values.id}</span>}
          <div className="flex gap-4 flex-1 justify-end">
            {values.id && (
              <Button
                type="button"
                className="bg-red-500 text-[var(--foreground)]"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}

            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
