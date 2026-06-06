import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "./src/lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/courses" ||
    pathname === "/certificate" ||
    pathname === "/contact" ||
    pathname.startsWith("/api/auth/") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("auth-token")?.value;
    const loginUrl = new URL("/login", request.url);

    if (!token) {
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      jwtVerify(token);
    } catch {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth-token");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/images).*)",
  ],
};
