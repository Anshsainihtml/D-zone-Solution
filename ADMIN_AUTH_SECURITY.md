# Admin Panel - Complete Authentication Security Implementation

## Security Layers Implemented

### 1. **Server-Side Middleware Protection** (middleware.ts)
- Intercepts all requests to `/admin` and `/api/admin` routes
- Validates `auth-token` cookie exists
- Verifies JWT token validity using `validateSession()`
- Checks user role is "admin"
- Clears invalid/expired tokens automatically
- Adds auth headers to requests for server components

### 2. **Client-Side Authentication Guard** (AuthGuard.tsx)
- Wraps entire admin layout
- Prevents access to admin pages until auth is verified
- Shows loading state during auth check
- Automatically redirects unauthenticated users to `/login`
- Clears invalid tokens from localStorage and cookies

### 3. **Auth Verification Hook** (useAuth.ts)
- `useAuth()` hook for client-side components
- Periodically validates token (every 5 minutes)
- Re-validates when tab regains focus
- Returns user info, auth status, and admin status
- Handles token expiration gracefully

### 4. **API-Level Protection** (api/auth/verify/route.ts)
- New `/api/auth/verify` endpoint for client-side validation
- Validates token server-side
- Checks admin role
- Returns user data or 401/403 errors
- Used by `useAuth()` hook

### 5. **Admin API Protection Utilities** (adminProtection.ts)
- Helper functions for API routes
- `protectAdminAPI()` - Validates admin requests
- Verifies token + headers match
- Returns appropriate error codes
- Easy integration in admin API routes

### 6. **Secure Cookie Configuration**
- `httpOnly: true` - Cookie not accessible via JavaScript
- `secure: true` (production) - Only sent over HTTPS
- `sameSite: 'lax'` - CSRF protection
- `maxAge: 24 * 60 * 60` - 24-hour expiration
- Auto-cleared on logout

## How It Works

### Login Flow
```
User → Login Page → /api/auth/login → JWT Token Generated
→ Set httpOnly Cookie → Redirect to /admin
```

### Admin Access Flow
```
User requests /admin
→ Middleware checks auth-token cookie
→ Validates JWT + user role
→ Admin Layout loads
→ AuthGuard client component runs
→ useAuth() hook verifies with /api/auth/verify
→ Displays admin dashboard
```

### Security Checks at Each Step
1. **Middleware** - Server-side token validation
2. **AuthGuard** - Client-side auth check before rendering
3. **useAuth Hook** - Continuous auth monitoring
4. **API Routes** - Protected with protectAdminAPI utility
5. **Cookies** - httpOnly + Secure flags

## Token Expiration & Refresh
- Tokens expire after 24 hours
- Middleware automatically removes expired tokens
- Client-side hook re-validates every 5 minutes
- Expired tokens trigger automatic logout

## Force Logout on Invalid Token
- Client detects 401 response from verify endpoint
- Clears auth token from cookies and storage
- Redirects to login page
- User must login again

## Usage in API Routes

### Protect an Admin API Route
```typescript
import { NextRequest, NextResponse } from "next/server";
import { protectAdminAPI } from "@/lib/adminProtection";

export async function POST(request: NextRequest) {
  // Validate admin access
  const protection = await protectAdminAPI(request);
  
  if (!protection.isValid) {
    return NextResponse.json(
      { error: protection.error },
      { status: protection.statusCode }
    );
  }

  // Safe to proceed - user is authenticated admin
  const { userId } = protection.user;
  // ... rest of API logic
}
```

## Testing Security

### Test 1: Access /admin without login
- Expected: Redirected to /login (middleware)

### Test 2: Access /admin with invalid token
- Expected: AuthGuard redirects to /login

### Test 3: Access /admin, logout, then refresh
- Expected: Redirected to /login (expired session)

### Test 4: Try to access /api/admin without token
- Expected: 401 Unauthorized

### Test 5: Access as non-admin user
- Expected: 403 Forbidden at middleware

## Files Modified/Created

### Created
- `src/components/AuthGuard.tsx` - Client-side auth protection
- `src/lib/useAuth.ts` - Auth state management hook
- `src/app/api/auth/verify/route.ts` - Token verification endpoint
- `src/lib/adminProtection.ts` - Admin API protection utilities

### Modified
- `middleware.ts` - Enhanced with stricter security checks
- `src/app/admin/layout.tsx` - Wrapped with AuthGuard

## Environment Variables Required

```env
# .env.local
AUTH_SECRET=your-secure-secret-key-here
```

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Best Practices Applied

✅ **Defense in Depth** - Multiple auth layers
✅ **httpOnly Cookies** - XSS protection
✅ **CSRF Protection** - sameSite cookie flag
✅ **HTTPS Only** (production) - Secure transmission
✅ **Token Expiration** - Session timeout
✅ **Role-Based Access** - Admin-only routes
✅ **Automatic Cleanup** - Expired sessions removed
✅ **User Verification** - Continuous monitoring
✅ **Error Handling** - Graceful fallbacks

## No more unauthorized access to /admin! 🔒
