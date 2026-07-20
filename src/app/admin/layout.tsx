"use client";

import AdminSidebar from "@/components/AdminSidebar";
import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
