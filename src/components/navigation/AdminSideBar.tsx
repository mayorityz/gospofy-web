import { Users } from "lucide-react";
import { Navigation } from "./Navigation";

export const AdminSideBar = () => {
  return (
    <div className="w-[300px] h-screen bg-[#121212] fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gold-900">
        <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Admin Info */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gold-900/10 bg-gray-900/95">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold-900/20 to-gold-900/10 flex items-center justify-center">
            <Users size={16} className="text-gold-900" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gold-900">Admin User</p>
            <p className="text-xs text-gray-400">admin@gospofy.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
