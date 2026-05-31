import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "./src/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for auth routes
  if (pathname.startsWith("/api/auth/") || pathname === "/login") {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const auth = await validateSession(token);

    if (!auth || auth.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Add auth info to request headers for use in server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", auth.userId);
    requestHeaders.set("x-user-email", auth.email);
    requestHeaders.set("x-user-role", auth.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/login"],
};
