import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect("/login");
  }

  if (pathname === "/app") {
    return NextResponse.redirect("/channels/@me");
  }

  if (pathname === "/register-complete") {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}
