import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Divider from "@/app/components/Divider";
import Link from "next/link";
import SignInWithGoogle from "./components/SigninWithGoogle";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();

  if (session) return redirect("/");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 bg-[var(--foreground)]/10 rounded-md p-4">
        <form className="flex flex-col gap-4 ">
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button type="submit">Login</Button>
        </form>
        <Divider />
        <SignInWithGoogle />
        <Link href="/" className="block">
          Back
        </Link>
      </div>
    </div>
  );
}
