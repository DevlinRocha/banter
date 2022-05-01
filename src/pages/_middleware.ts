import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === "/") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (pathname === "/channels") {
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (pathname === "/app") {
    url.pathname = "/channels/@me";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
