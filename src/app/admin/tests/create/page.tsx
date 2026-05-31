"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";

export default function CreateTestPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const formFields = [
    {
      name: "title",
      label: "Test Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter test title",
    },
    {
      name: "slug",
      label: "Slug (URL-friendly name)",
      type: "text" as const,
      required: true,
      placeholder: "test-slug",
    },
    {
      name: "courseId",
      label: "Course",
      type: "select" as const,
      required: true,
      options: courses.map((c) => ({ label: c.title, value: c.id })),
    },
    {
      name: "module",
      label: "Module",
      type: "text" as const,
      required: true,
      placeholder: "e.g., M1, M2",
    },
    {
      name: "totalQuestions",
      label: "Total Questions",
      type: "number" as const,
      required: true,
      placeholder: "10",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter test description",
    },
  ];

  const handleSubmit = async (data: any) => {
    const response = await fetch("/api/admin/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create test");
    }

    router.push("/admin/tests");
  };

  return (
    <div>
      <AdminTopbar title="Create New Test" />

      <div className="p-8">
        <AdminForm
          title="Create New Test"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/tests")}
          submitText="Create Test"
        />
      </div>
    </div>
  );
}
