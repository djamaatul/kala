"use client";

import { revalidatePath, saveEventAction } from "@/app/actions";
import Button from "@/app/components/Button";
import Field from "@/app/components/Field";
import Input from "@/app/components/Input";
import { Event } from "@/app/repositories/events";
import moment from "moment";
import { FormProvider, useForm } from "react-hook-form";

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
      <form
        className="bg-[var(--foreground)]/10 p-4 border rounded-md flex flex-col gap-4"
        action={saveEventAction}
      >
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
            <select
              className="bg-[var(--foreground)]/20 p-2 rounded-sm"
              defaultValue={props.defaultValues?.visibility ?? 'private'}
							name="visibility"
            >
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

            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
