"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "next-auth/react";

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
      <form
        className="flex flex-col gap-4"
        action={(formData) => {
          signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: true,
            callbackUrl: "/calendar/" + new Date().getFullYear(),
          });
        }}
      >
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
