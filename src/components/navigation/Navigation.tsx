import { Link, useLocation } from "react-router";
import { Home, Users, Music2, Settings, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [isExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const adminRoutes = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/admin/songs",
      name: "Media",
      icon: <Music2 className="w-5 h-5" />,
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-1 p-4">
        {adminRoutes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive(route.path)
                  ? "bg-gold-900/10 text-gold-900"
                  : "text-gray-400 hover:bg-gold-900/5 hover:text-gold-900"
              }`}>
              <div className="flex items-center justify-center w-6 h-6">{route.icon}</div>
              {isExpanded && (
                <>
                  <span className="flex-1">{route.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
