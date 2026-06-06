import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";

/**
 * Admin API protection middleware
 * Validates that the request is from an authenticated admin user
 */
export async function protectAdminAPI(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    // Check token exists
    if (!token) {
      return {
        isValid: false,
        error: "No authentication token",
        statusCode: 401,
      };
    }

    // Validate token
    const auth = await validateSession(token);

    if (!auth) {
      return {
        isValid: false,
        error: "Invalid or expired token",
        statusCode: 401,
      };
    }

    // Check admin role
    if (auth.role !== "admin") {
      return {
        isValid: false,
        error: "Insufficient permissions",
        statusCode: 403,
      };
    }

    // Additional check: verify headers match token
    if (userId !== auth.userId || userRole !== "admin") {
      return {
        isValid: false,
        error: "Token mismatch",
        statusCode: 401,
      };
    }

    return {
      isValid: true,
      user: auth,
    };
  } catch (error) {
    console.error("Admin API protection error:", error);
    return {
      isValid: false,
      error: "Authentication check failed",
      statusCode: 500,
    };
  }
}

/**
 * Helper to return unauthorized response
 */
export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

/**
 * Helper to return forbidden response
 */
export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  );
}
