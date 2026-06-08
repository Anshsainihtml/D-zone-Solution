"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";
import CertificateUpload from "@/components/CertificateUpload";
import {
  certificateFormFields,
  toDateInputValue,
} from "../../certificateFields";

interface Certificate {
  id: string;
  serialNumber: string;
  rollNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  courseName: string;
  courseDuration: string;
  session: string;
  grade: string;
  completionDate: string;
  issueDate: string;
  verificationCode: string;
  isValid: boolean;
  certificateUrl?: string;
}

export default function EditCertificatePage() {
  const router = useRouter();
  const params = useParams();
  const certificateId = params.id as string;
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate();
  }, [certificateId]);

  const fetchCertificate = async () => {
    try {
      const response = await fetch(`/api/admin/certificates/${certificateId}`);
      const data = await response.json();
      setCertificate(data);
    } catch (error) {
      console.error("Error fetching certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const response = await fetch(`/api/admin/certificates/${certificateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update certificate");
    }

    router.push("/admin/certificates");
  };

  if (loading) {
    return (
      <div>
        <AdminTopbar title="Edit Certificate" />
        <div className="p-8 text-center">Loading...</div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div>
        <AdminTopbar title="Edit Certificate" />
        <div className="p-8 text-center text-red-600">Certificate not found</div>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar title="Edit Certificate" />

      <div className="p-8">
        <AdminForm
          title="Edit Certificate"
          fields={certificateFormFields({
            ...certificate,
            completionDate: toDateInputValue(certificate.completionDate),
            issueDate: toDateInputValue(certificate.issueDate),
          })}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/certificates")}
          submitText="Update Certificate"
        />

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Certificate File</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Upload PDF Certificate</h3>
            <CertificateUpload
              certificateId={certificateId}
              onUploadComplete={() => fetchCertificate()}
            />

            {certificate.certificateUrl && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold mb-2">
                  ✓ Certificate uploaded
                </p>
                <a
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Download Certificate
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
