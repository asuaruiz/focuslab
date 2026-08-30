import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const headers = new Headers(request.headers);
  headers.set("x-focuslab-locale", isEnglish ? "en" : "es");

  if (!isEnglish) {
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image).*)"],
};
