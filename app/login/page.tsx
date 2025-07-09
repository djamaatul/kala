import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Divider from "../components/Divider";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 bg-[var(--foreground)]/10 rounded-md p-4">
        <form className="flex flex-col gap-4 ">
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button type="submit">Login</Button>
        </form>
        <Divider />
        <Button
          className="bg-white text-black hover:bg-black/10"
          leading={
            <Image alt="google icon" src="/google.svg" width={15} height={15} />
          }
        >
          Sign in with Google
        </Button>
        <Link href="/" className="block">
          Back
        </Link>
      </div>
    </div>
  );
}
