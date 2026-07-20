import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No authentication token found" },
        { status: 401 }
      );
    }

    const auth = await validateSession(token);

    if (!auth) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Return user data regardless of role, let client decide what to do
    return NextResponse.json({
      success: true,
      user: {
        userId: auth.userId,
        email: auth.email,
        role: auth.role,
      },
      isAdmin: auth.role === "admin",
    });
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json(
      { error: "Authentication verification failed" },
      { status: 500 }
    );
  }
}
