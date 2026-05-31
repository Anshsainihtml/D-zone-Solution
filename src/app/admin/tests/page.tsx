"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface Test {
  id: string;
  title: string;
  slug: string;
  module: string;
  course: { title: string };
  totalQuestions: number;
  questions: any[];
  results: any[];
  createdAt: string;
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch("/api/admin/tests");
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (test: Test) => {
    try {
      await fetch(`/api/admin/tests/${test.id}`, {
        method: "DELETE",
      });
      setTests(tests.filter((t) => t.id !== test.id));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Test Title",
    },
    {
      key: "course",
      label: "Course",
      render: (value: any) => value?.title || "N/A",
    },
    {
      key: "module",
      label: "Module",
    },
    {
      key: "questions",
      label: "Questions",
      render: (value: any[]) => value.length,
    },
    {
      key: "results",
      label: "Attempts",
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
      <AdminTopbar title="Tests Management" />

      <div className="p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Tests: {tests.length}
          </h2>
          <button
            onClick={() => router.push("/admin/tests/create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            ➕ Add New Test
          </button>
        </div>

        <AdminTable
          columns={columns}
          data={tests}
          onEdit={(test) => router.push(`/admin/tests/edit/${test.id}`)}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
