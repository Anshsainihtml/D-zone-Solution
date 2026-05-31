"use client";

import { useEffect, useState } from "react";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface Module {
  id: string;
  title: string;
  description: string | null;
  order: number;
  course: { title: string };
  createdAt: string;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch("/api/admin/modules");
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (module: Module) => {
    try {
      await fetch(`/api/admin/modules/${module.id}`, {
        method: "DELETE",
      });
      setModules(modules.filter((m) => m.id !== module.id));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Module Title",
    },
    {
      key: "course",
      label: "Course",
      render: (value: any) => value?.title || "N/A",
    },
    {
      key: "order",
      label: "Order",
    },
    {
      key: "description",
      label: "Description",
      render: (value: string | null) =>
        value ? value.substring(0, 50) + "..." : "N/A",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Modules Management" />

      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Modules: {modules.length}
          </h2>
        </div>

        <AdminTable
          columns={columns}
          data={modules}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
