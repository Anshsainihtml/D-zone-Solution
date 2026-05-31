"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";

export default function CreateCoursePage() {
  const router = useRouter();

  const formFields = [
    {
      name: "title",
      label: "Course Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter course title",
    },
    {
      name: "slug",
      label: "Slug (URL-friendly name)",
      type: "text" as const,
      required: true,
      placeholder: "course-slug",
    },
    {
      name: "category",
      label: "Category",
      type: "text" as const,
      required: true,
      placeholder: "e.g., Finance & Accounting",
    },
    {
      name: "instructor",
      label: "Instructor",
      type: "text" as const,
      required: true,
      placeholder: "Enter instructor name",
    },
    {
      name: "duration",
      label: "Duration",
      type: "text" as const,
      required: true,
      placeholder: "e.g., 3 months",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter course description",
    },
    {
      name: "image",
      label: "Image URL",
      type: "text" as const,
      placeholder: "https://example.com/image.jpg",
    },
  ];

  const handleSubmit = async (data: any) => {
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create course");
    }

    router.push("/admin/courses");
  };

  return (
    <div>
      <AdminTopbar title="Create New Course" />

      <div className="p-8">
        <AdminForm
          title="Create New Course"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/courses")}
          submitText="Create Course"
        />
      </div>
    </div>
  );
}
