import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const auth = await getSession({
    req: {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
    },
  });

  if (!auth) return NextResponse.redirect(req.nextUrl.origin + "/login");

  return NextResponse.next();
}

export const config = {
  matcher: ["/event"],
};
