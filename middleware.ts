import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "./src/lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

<<<<<<< HEAD
  // Skip middleware for public routes
=======
>>>>>>> b437d6fc4c5616380a54da58daa0021ad563cc40
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

<<<<<<< HEAD
  // Protect admin routes with strict auth checks
=======
>>>>>>> b437d6fc4c5616380a54da58daa0021ad563cc40
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("auth-token")?.value;
    const loginUrl = new URL("/login", request.url);

    if (!token) {
<<<<<<< HEAD
      // No token found - redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const auth = await validateSession(token);

      if (!auth) {
        // Invalid or expired token
        const response = NextResponse.redirect(new URL("/login", request.url));
        // Clear the invalid cookie
        response.cookies.delete("auth-token");
        return response;
      }

      if (auth.role !== "admin") {
        // User exists but is not admin - unauthorized
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth-token");
        return response;
      }

      // Valid admin user - pass through with auth headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", auth.userId);
      requestHeaders.set("x-user-email", auth.email);
      requestHeaders.set("x-user-role", auth.role);
      requestHeaders.set("x-request-timestamp", new Date().toISOString());

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Auth validation error in middleware:", error);
      // If validation fails, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
=======
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
>>>>>>> b437d6fc4c5616380a54da58daa0021ad563cc40
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/images).*)",
  ],
};
