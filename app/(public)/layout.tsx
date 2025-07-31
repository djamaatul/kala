import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import NavBar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SideBar from "@/app/components/SideBar";
import { getSession } from "../utils/session";

export const metadata: Metadata = {
  title: "KALA",
  description: "Atur waktumu, hargai setiap Kala.",
};

export default async function HomepageLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  return (
    <div className="flex min-h-screen">
      {session && <SideBar />}
      <div className="flex flex-col flex-1">
        <NavBar />
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
