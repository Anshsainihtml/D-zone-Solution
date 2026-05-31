"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  duration: string;
  instructor: string;
  image: string | null;
}

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      name: "title",
      label: "Course Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter course title",
      value: course?.title || "",
    },
    {
      name: "slug",
      label: "Slug (URL-friendly name)",
      type: "text" as const,
      required: true,
      placeholder: "course-slug",
      value: course?.slug || "",
    },
    {
      name: "category",
      label: "Category",
      type: "text" as const,
      required: true,
      placeholder: "e.g., Finance & Accounting",
      value: course?.category || "",
    },
    {
      name: "instructor",
      label: "Instructor",
      type: "text" as const,
      required: true,
      placeholder: "Enter instructor name",
      value: course?.instructor || "",
    },
    {
      name: "duration",
      label: "Duration",
      type: "text" as const,
      required: true,
      placeholder: "e.g., 3 months",
      value: course?.duration || "",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter course description",
      value: course?.description || "",
    },
    {
      name: "image",
      label: "Image URL",
      type: "text" as const,
      placeholder: "https://example.com/image.jpg",
      value: course?.image || "",
    },
  ];

  const handleSubmit = async (data: any) => {
    const response = await fetch(`/api/admin/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update course");
    }

    router.push("/admin/courses");
  };

  if (loading) {
    return (
      <div>
        <AdminTopbar title="Edit Course" />
        <div className="p-8 text-center">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <AdminTopbar title="Edit Course" />
        <div className="p-8 text-center text-red-600">Course not found</div>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar title="Edit Course" />

      <div className="p-8">
        <AdminForm
          title="Edit Course"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/courses")}
          submitText="Update Course"
        />
      </div>
    </div>
  );
}
