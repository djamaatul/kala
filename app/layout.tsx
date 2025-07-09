import "./globals.css";
import { Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";
import { cookies } from "next/headers";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export default async function RootLayout({ children }: PropsWithChildren) {
  const theme = (await cookies()).get("theme");

  return (
    <html lang="en">
      <body
        className={`${geistMono.className} ${
          theme?.value ?? "dark"
        } antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
