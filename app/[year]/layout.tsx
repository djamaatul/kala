import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
// import SideBar from "../components/SideBar";

export const metadata: Metadata = {
  title: "KALA",
  description: "Atur waktumu, hargai setiap Kala.",
};

export default async function HomepageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      {/* <SideBar /> */}
      <div className="flex flex-col flex-1">
        <NavBar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
