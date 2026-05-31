"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";

interface Test {
  id: string;
  title: string;
  slug: string;
  courseId: string;
  module: string;
  totalQuestions: number;
  description: string | null;
}

export default function EditTestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.id as string;
  const [test, setTest] = useState<Test | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTest(), fetchCourses()]);
  }, [testId]);

  const fetchTest = async () => {
    try {
      const response = await fetch(`/api/admin/tests/${testId}`);
      const data = await response.json();
      setTest(data);
    } catch (error) {
      console.error("Error fetching test:", error);
    } finally {
      setLoading(false);
    }
  };

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
      value: test?.title || "",
    },
    {
      name: "slug",
      label: "Slug (URL-friendly name)",
      type: "text" as const,
      required: true,
      placeholder: "test-slug",
      value: test?.slug || "",
    },
    {
      name: "courseId",
      label: "Course",
      type: "select" as const,
      required: true,
      value: test?.courseId || "",
      options: courses.map((c) => ({ label: c.title, value: c.id })),
    },
    {
      name: "module",
      label: "Module",
      type: "text" as const,
      required: true,
      placeholder: "e.g., M1, M2",
      value: test?.module || "",
    },
    {
      name: "totalQuestions",
      label: "Total Questions",
      type: "number" as const,
      required: true,
      placeholder: "10",
      value: test?.totalQuestions || "",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter test description",
      value: test?.description || "",
    },
  ];

  const handleSubmit = async (data: any) => {
    const response = await fetch(`/api/admin/tests/${testId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update test");
    }

    router.push("/admin/tests");
  };

  if (loading) {
    return (
      <div>
        <AdminTopbar title="Edit Test" />
        <div className="p-8 text-center">Loading...</div>
      </div>
    );
  }

  if (!test) {
    return (
      <div>
        <AdminTopbar title="Edit Test" />
        <div className="p-8 text-center text-red-600">Test not found</div>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar title="Edit Test" />

      <div className="p-8">
        <AdminForm
          title="Edit Test"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/tests")}
          submitText="Update Test"
        />
      </div>
    </div>
  );
}
