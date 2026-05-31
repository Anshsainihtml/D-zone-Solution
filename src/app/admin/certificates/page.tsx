"use client";

import AdminTopbar from "@/components/AdminTopbar";

export default function CertificatesPage() {
  return (
    <div>
      <AdminTopbar title="Certificates Management" />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Certificates Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600">0</div>
              <p className="text-gray-600 mt-2">Issued Certificates</p>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg">
              <div className="text-4xl font-bold text-yellow-600">0</div>
              <p className="text-gray-600 mt-2">Pending Certificates</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600">0</div>
              <p className="text-gray-600 mt-2">Total Students</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-600 text-lg">
              Certificate management feature coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
