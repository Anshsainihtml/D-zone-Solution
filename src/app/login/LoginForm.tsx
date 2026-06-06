"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          credentials: "include",
        });

        if (response.ok && isMounted) {
          const data = await response.json();
          if (data.user?.role === "admin") {
            const destination = redirectTo.startsWith("/admin")
              ? redirectTo
              : "/admin";
            window.location.href = destination;
            return;
          }
        }
      } catch {
        // Not logged in — show login form
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const destination = redirectTo.startsWith("/admin") ? redirectTo : "/admin";
      window.location.href = destination;
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Email: admin@example.com
            </p>
            <p className="text-sm text-gray-600">
              Password: Admin@123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
