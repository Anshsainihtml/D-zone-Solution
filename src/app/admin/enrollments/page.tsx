"use client";

import { useEffect, useState } from "react";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface Enrollment {
  id: string;
  user: { name: string | null; email: string };
  course: { title: string };
  enrolledAt: string;
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("/api/admin/enrollments");
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "user",
      label: "Student",
      render: (value: any) => value?.name || value?.email || "Unknown",
    },
    {
      key: "user",
      label: "Email",
      render: (value: any) => value?.email || "N/A",
    },
    {
      key: "course",
      label: "Course",
      render: (value: any) => value?.title || "N/A",
    },
    {
      key: "enrolledAt",
      label: "Enrolled On",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Enrollments Management" />

      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Enrollments: {enrollments.length}
          </h2>
        </div>

        <AdminTable
          columns={columns}
          data={enrollments}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
