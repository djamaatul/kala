"use client";
import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInWithGoogle() {
  return (
    <Button
      className="bg-white text-black"
      leading={
        <Image alt="google icon" src="/google.svg" width={15} height={15} />
      }
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </Button>
  );
}
