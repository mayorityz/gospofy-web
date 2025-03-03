import { Activity, Users, Music2, Podcast } from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 overflow-y-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-2">Welcome back, Admin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white mt-2">1,234</p>
                <p className="text-green-500 text-sm mt-2">
                  +12% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Total Songs Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Songs</p>
                <p className="text-2xl font-bold text-white mt-2">856</p>
                <p className="text-green-500 text-sm mt-2">
                  +5% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Music2 className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Total Podcasts Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Podcasts</p>
                <p className="text-2xl font-bold text-white mt-2">142</p>
                <p className="text-green-500 text-sm mt-2">
                  +8% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Podcast className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white mt-2">892</p>
                <p className="text-green-500 text-sm mt-2">
                  +15% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-[#1A1A1A] rounded-xl border border-gold-900/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Users
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gold-900/5 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gold-900/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gold-900" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      User Name {index + 1}
                    </p>
                    <p className="text-gray-400 text-sm">Joined 2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Media */}
          <div className="bg-[#1A1A1A] rounded-xl border border-gold-900/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Media
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gold-900/5 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gold-900/10 flex items-center justify-center">
                    <Music2 className="h-5 w-5 text-gold-900" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Media Title {index + 1}
                    </p>
                    <p className="text-gray-400 text-sm">Added 3 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
