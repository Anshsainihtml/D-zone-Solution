"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  instructor: string;
  studentsCount: number;
  enrollments: any[];
  tests: any[];
  createdAt: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (course: Course) => {
    try {
      await fetch(`/api/admin/courses/${course.id}`, {
        method: "DELETE",
      });
      setCourses(courses.filter((c) => c.id !== course.id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Course Title",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "instructor",
      label: "Instructor",
    },
    {
      key: "enrollments",
      label: "Students",
      render: (value: any[]) => value.length,
    },
    {
      key: "tests",
      label: "Tests",
      render: (value: any[]) => value.length,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Courses Management" />

      <div className="p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Courses: {courses.length}
          </h2>
          <button
            onClick={() => router.push("/admin/courses/create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            ➕ Add New Course
          </button>
        </div>

        <AdminTable
          columns={columns}
          data={courses}
          onEdit={(course) => router.push(`/admin/courses/edit/${course.id}`)}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
