"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";

export default function CreateUserPage() {
  const router = useRouter();

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter full name",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "Enter email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password" as const,
      required: true,
      placeholder: "Enter password",
    },
    {
      name: "role",
      label: "Role",
      type: "select" as const,
      required: true,
      options: [
        { label: "Student", value: "student" },
        { label: "Instructor", value: "instructor" },
        { label: "Admin", value: "admin" },
      ],
    },
  ];

  const handleSubmit = async (data: any) => {
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create user");
    }

    router.push("/admin/users");
  };

  return (
    <div>
      <AdminTopbar title="Create New User" />

      <div className="p-8">
        <AdminForm
          title="Create New User"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/users")}
          submitText="Create User"
        />
      </div>
    </div>
  );
}
