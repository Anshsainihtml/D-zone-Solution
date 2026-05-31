"use client";

import { useEffect, useState } from "react";
import AdminTopbar from "@/components/AdminTopbar";
import StatCard from "@/components/StatCard";

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalTests: number;
  activeStudents: number;
  pendingCertificates: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalTests: 0,
    activeStudents: 0,
    pendingCertificates: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminTopbar title="Dashboard" />

      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to Admin Panel</h2>
          <p className="text-gray-600 mt-2">
            Manage your courses, users, tests, and more from here
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon="📚"
            color="green"
          />
          <StatCard
            title="Total Enrollments"
            value={stats.totalEnrollments}
            icon="📋"
            color="purple"
          />
          <StatCard
            title="Practice Tests"
            value={stats.totalTests}
            icon="✅"
            color="orange"
          />
          <StatCard
            title="Active Students"
            value={stats.activeStudents}
            icon="🎓"
            color="blue"
          />
          <StatCard
            title="Pending Certificates"
            value={stats.pendingCertificates}
            icon="🏆"
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/users/create"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
            >
              <div className="text-2xl mb-2">➕</div>
              <div className="font-semibold text-gray-700">Add User</div>
            </a>
            <a
              href="/admin/courses/create"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-gray-700">Add Course</div>
            </a>
            <a
              href="/admin/tests/create"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold text-gray-700">Add Test</div>
            </a>
            <a
              href="/admin/analytics"
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-gray-700">Analytics</div>
            </a>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="text-gray-700">Database Connection</span>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="text-gray-700">API Status</span>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="text-gray-700">Server Response</span>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                Healthy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
