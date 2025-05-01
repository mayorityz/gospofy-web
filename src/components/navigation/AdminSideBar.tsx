import { Users } from "lucide-react";
import { Navigation } from "./Navigation";
import { Link } from "react-router";
import { useState } from "react";

export const AdminSideBar = () => {
  // const location = useLocation();
  const [isExpanded] = useState(true);

  // const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-black border-r border-gold-900/20 transition-all duration-300 ${
        isExpanded ? "w-[300px]" : "w-20"
      }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link to="/admin" className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-900/10 flex items-center justify-center">
              <img src="/images/logo.png" alt="Gospofy" className="w-full h-full object-cover" />
            </div>
            {isExpanded && <span className="text-xl font-bold text-white">Gospofy Admin</span>}
          </div>
        </Link>

        {/* Main Navigation */}
        <Navigation />

        {/* Admin Info */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gold-900/20 bg-black/95">
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
    </aside>
  );
};
