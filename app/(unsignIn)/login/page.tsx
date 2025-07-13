"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

export default function Login() {
  const methods = useForm({
    shouldFocusError: true,
    resolver: zodResolver(
      z.object({
        email: z.email(),
        password: z.string(),
      })
    ),
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4 ">
        <Input placeholder="Email" name="email" />
        <Input placeholder="Password" name="password" type="password" />
        <Button type="submit">Login</Button>

        <span>
          <span>{"don't have account ? register"}</span>
          <Button.link href="/register">here</Button.link>
        </span>
      </form>
    </FormProvider>
  );
}
