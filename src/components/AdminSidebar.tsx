"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/courses", label: "Courses", icon: "📚" },
    { href: "/admin/modules", label: "Modules", icon: "📖" },
    { href: "/admin/tests", label: "Tests", icon: "✅" },
    { href: "/admin/questions", label: "Questions", icon: "❓" },
    { href: "/admin/certificates", label: "Certificates", icon: "🏆" },
    { href: "/admin/notes", label: "Notes", icon: "📝" },
    { href: "/admin/enrollments", label: "Enrollments", icon: "📋" },
    { href: "/admin/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-40`}
    >
      {/* Header */}
      <div className="p-6 border-b border-blue-700 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-blue-700 rounded transition"
        >
          {isOpen ? "⬅️" : "➡️"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-blue-100 hover:bg-blue-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 transition"
        >
          <span>🏠</span>
          {isOpen && <span>Back to Site</span>}
        </Link>
      </div>
    </aside>
  );
}
