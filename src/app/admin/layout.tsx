<<<<<<< HEAD
"use client";

import AdminSidebar from "@/components/AdminSidebar";
import AuthGuard from "@/components/AuthGuard";
=======
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";
>>>>>>> b437d6fc4c5616380a54da58daa0021ad563cc40

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
=======
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const auth = await validateSession(token);

  if (!auth || auth.role !== "admin") {
    redirect("/login");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
>>>>>>> b437d6fc4c5616380a54da58daa0021ad563cc40
}
