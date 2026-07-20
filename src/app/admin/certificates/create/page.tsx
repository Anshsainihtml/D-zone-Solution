"use client";

import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import AdminForm from "@/components/AdminForm";
import { certificateFormFields } from "../certificateFields";

export default function CreateCertificatePage() {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      serialNumber: data.serialNumber || undefined,
      rollNumber: data.rollNumber || undefined,
      verificationCode: data.verificationCode || undefined,
    };

    const response = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create certificate");
    }

    router.push("/admin/certificates");
  };

  return (
    <div>
      <AdminTopbar title="Issue New Certificate" />

      <div className="p-8">
        <AdminForm
          title="Issue New Certificate"
          fields={certificateFormFields({
            courseDuration: "6 Months",
            isValid: true,
            completionDate: new Date().toISOString().split("T")[0],
            issueDate: new Date().toISOString().split("T")[0],
          })}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/certificates")}
          submitText="Issue Certificate"
        />
      </div>
    </div>
  );
}
