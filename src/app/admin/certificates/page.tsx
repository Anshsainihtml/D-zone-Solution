"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminTable from "@/components/AdminTable";

interface Certificate {
  id: string;
  serialNumber: string;
  rollNumber: string;
  studentName: string;
  fatherName: string;
  courseName: string;
  grade: string;
  session: string;
  isValid: boolean;
  issueDate: string;
  createdAt: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async (query = "") => {
    try {
      setLoading(true);
      const url = query
        ? `/api/admin/certificates?search=${encodeURIComponent(query)}`
        : "/api/admin/certificates";
      const response = await fetch(url);
      const data = await response.json();
      setCertificates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCertificates(search);
  };

  const handleDelete = async (certificate: Certificate) => {
    try {
      await fetch(`/api/admin/certificates/${certificate.id}`, {
        method: "DELETE",
      });
      setCertificates((prev) => prev.filter((c) => c.id !== certificate.id));
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleToggleStatus = async (certificate: Certificate) => {
    try {
      const response = await fetch(`/api/admin/certificates/${certificate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isValid: !certificate.isValid }),
      });

      if (response.ok) {
        const updated = await response.json();
        setCertificates((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      }
    } catch (error) {
      console.error("Error updating certificate status:", error);
    }
  };

  const issuedCount = certificates.filter((c) => c.isValid).length;
  const revokedCount = certificates.filter((c) => !c.isValid).length;

  const columns = [
    { key: "serialNumber", label: "Serial No." },
    { key: "rollNumber", label: "Roll No." },
    { key: "studentName", label: "Student Name" },
    { key: "fatherName", label: "Father Name" },
    { key: "courseName", label: "Course" },
    { key: "grade", label: "Grade" },
    {
      key: "issueDate",
      label: "Issue Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "isValid",
      label: "Status",
      render: (value: boolean, row: Certificate) => (
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {value ? "Valid" : "Revoked"}
          </span>
          <button
            onClick={() => handleToggleStatus(row)}
            className="text-xs text-blue-600 hover:underline"
          >
            {value ? "Revoke" : "Restore"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Certificates Management" />

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600">{issuedCount}</div>
            <p className="text-gray-600 mt-2">Issued Certificates</p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-lg">
            <div className="text-4xl font-bold text-yellow-600">{revokedCount}</div>
            <p className="text-gray-600 mt-2">Revoked Certificates</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg">
            <div className="text-4xl font-bold text-green-600">{certificates.length}</div>
            <p className="text-gray-600 mt-2">Total Certificates</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            All Certificates ({certificates.length})
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, serial, roll..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Search
              </button>
            </form>
            <button
              onClick={() => router.push("/admin/certificates/create")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              ➕ Issue Certificate
            </button>
          </div>
        </div>

        <AdminTable
          columns={columns}
          data={certificates}
          onEdit={(cert) => router.push(`/admin/certificates/edit/${cert.id}`)}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
