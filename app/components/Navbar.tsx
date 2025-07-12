import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { cookies } from "next/headers";
import Button from "./Button";
import { getServerSession } from "next-auth";
import LogoutButton from "../(unsignIn)/login/components/LogoutButton";

export default async function NavBar() {
  const theme = (await cookies()).get("theme");
  const session = await getServerSession();

  return (
    <div className="bg-[var(--background)]/20 backdrop-blur-sm h-20 flex items-center justify-between sticky top-0 p-4">
      <Link href="/">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
          KALA
        </h1>
        <p className="text-sm">Atur waktumu, hargai setiap Kala.</p>
      </Link>
      <div className="flex gap-4 items-center">
        <ThemeSwitcher
          defaultTheme={theme?.value ?? "dark"}
          className="hidden md:block"
        />

        {session ? (
          <LogoutButton />
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
