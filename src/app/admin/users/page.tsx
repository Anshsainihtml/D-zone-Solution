"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  enrollments: any[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user: User) => {
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          value === "admin"
            ? "bg-red-100 text-red-800"
            : value === "instructor"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: "enrollments",
      label: "Enrollments",
      render: (value: any[]) => value.length,
    },
    {
      key: "createdAt",
      label: "Joined Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Users Management" />

      <div className="p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Users: {users.length}
          </h2>
          <button
            onClick={() => router.push("/admin/users/create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            ➕ Add New User
          </button>
        </div>

        <AdminTable
          columns={columns}
          data={users}
          onEdit={(user) => router.push(`/admin/users/edit/${user.id}`)}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
