"use client";

import { signOut } from "next-auth/react";
import Button from "@/app/components/Button";

export default function LogoutButton() {
  return <Button onClick={() => signOut()}>Log out</Button>;
}
