"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
