"use client";

import AdminTopbar from "@/components/AdminTopbar";
import StatCard from "@/components/StatCard";

export default function AnalyticsPage() {
  return (
    <div>
      <AdminTopbar title="Analytics & Reports" />

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          System Analytics
        </h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Page Views"
            value={0}
            icon="👁️"
            color="blue"
          />
          <StatCard
            title="New Enrollments"
            value={0}
            icon="📝"
            color="green"
          />
          <StatCard
            title="Tests Completed"
            value={0}
            icon="✅"
            color="purple"
          />
          <StatCard
            title="Avg. Score"
            value={0}
            icon="📊"
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Enrollment Trends
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
              <p className="text-gray-600">Chart coming soon...</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Course Performance
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
              <p className="text-gray-600">Chart coming soon...</p>
            </div>
          </div>
        </div>

        {/* Additional Reports */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              User Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Last 7 Days</span>
                <span className="font-semibold text-gray-900">-</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Last 30 Days</span>
                <span className="font-semibold text-gray-900">-</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Last 90 Days</span>
                <span className="font-semibold text-gray-900">-</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Top Courses
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">No data</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">No data</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-700">No data</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
