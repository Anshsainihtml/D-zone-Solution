"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter full name",
      value: user?.name || "",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "Enter email address",
      value: user?.email || "",
    },
    {
      name: "password",
      label: "Password (leave blank to keep current)",
      type: "password" as const,
      placeholder: "Enter new password (optional)",
    },
    {
      name: "role",
      label: "Role",
      type: "select" as const,
      required: true,
      value: user?.role || "student",
      options: [
        { label: "Student", value: "student" },
        { label: "Instructor", value: "instructor" },
        { label: "Admin", value: "admin" },
      ],
    },
  ];

  const handleSubmit = async (data: any) => {
    // Remove password if empty
    if (!data.password) {
      delete data.password;
    }

    const response = await fetch(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update user");
    }

    router.push("/admin/users");
  };

  if (loading) {
    return (
      <div>
        <AdminTopbar title="Edit User" />
        <div className="p-8 text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <AdminTopbar title="Edit User" />
        <div className="p-8 text-center text-red-600">User not found</div>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar title="Edit User" />

      <div className="p-8">
        <AdminForm
          title="Edit User"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/users")}
          submitText="Update User"
        />
      </div>
    </div>
  );
}
