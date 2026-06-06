"use client";

import { useEffect, useState, useCallback } from "react";

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      // auth-token is httpOnly — verify via API (browser sends cookie automatically)
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      setIsAdmin(data.user.role === "admin");
      setIsLoading(false);
    } catch (error) {
      console.error("Auth validation error:", error);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    validateAuth();
    // Only re-validate when tab becomes focused, not on interval
    
    const handleFocus = () => {
      validateAuth();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [validateAuth]);

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    revalidate: validateAuth,
  };
}
