"use client";

import AdminTopbar from "@/components/AdminTopbar";

export default function AdminProfilePage() {
  return (
    <div>
      <AdminTopbar title="Admin Profile" />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👤
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Admin User</h2>
              <p className="text-gray-600 mt-2">Administrator</p>
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="text-left">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">admin@dzone.com</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-semibold text-gray-800">Super Admin</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-800">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Total Logins</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">-</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Last Login</p>
                  <p className="text-lg font-bold text-green-600 mt-2">Today</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Changes Made</p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">-</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Admin Since</p>
                  <p className="text-lg font-bold text-orange-600 mt-2">-</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">System initialized</span>
                  <span className="text-sm text-gray-600">Just now</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Admin panel accessed</span>
                  <span className="text-sm text-gray-600">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
