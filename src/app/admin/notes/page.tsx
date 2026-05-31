"use client";

import AdminTopbar from "@/components/AdminTopbar";

export default function NotesPage() {
  return (
    <div>
      <AdminTopbar title="Notes Management" />

      <div className="p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Notes Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl font-bold text-purple-600">0</div>
              <p className="text-gray-600 mt-2">Total Notes</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="text-4xl font-bold text-indigo-600">0</div>
              <p className="text-gray-600 mt-2">Published Notes</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-lg">
              <div className="text-4xl font-bold text-pink-600">0</div>
              <p className="text-gray-600 mt-2">Draft Notes</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-600 text-lg">
              Notes management feature coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
