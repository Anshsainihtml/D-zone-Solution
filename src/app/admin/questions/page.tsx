"use client";

import { useEffect, useState } from "react";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface Question {
  id: string;
  questionText: string;
  order: number;
  test: { title: string; course: { title: string } };
  createdAt: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/admin/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (question: Question) => {
    try {
      await fetch(`/api/admin/questions/${question.id}`, {
        method: "DELETE",
      });
      setQuestions(questions.filter((q) => q.id !== question.id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const columns = [
    {
      key: "questionText",
      label: "Question",
      render: (value: string) => value.substring(0, 50) + "...",
    },
    {
      key: "test",
      label: "Test",
      render: (value: any) => value?.title || "N/A",
    },
    {
      key: "test",
      label: "Course",
      render: (value: any) => value?.course?.title || "N/A",
    },
    {
      key: "order",
      label: "Order",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Questions Management" />

      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Questions: {questions.length}
          </h2>
        </div>

        <AdminTable
          columns={columns}
          data={questions}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
