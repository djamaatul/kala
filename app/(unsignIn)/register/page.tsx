"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

import Field from "@/app/components/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { register } from "../actions";
import z from "zod";

export default function Register() {
  const methods = useForm({
    shouldFocusError: true,
    resolver: zodResolver(
      z.object({
        name: z.string().optional(),
        email: z.email(),
        password: z.string(),
      }),
    ),
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(register)}
      >
        <Field label="Full Name">
          <Input placeholder="Full Name" name="name" />
        </Field>

        <Field label="Email">
          <Input placeholder="Email" name="email" />
        </Field>

        <Field label="Password">
          <Input placeholder="Password" name="password" type="password" />
        </Field>
        <Button type="submit">Register</Button>
      </form>
    </FormProvider>
  );
}
