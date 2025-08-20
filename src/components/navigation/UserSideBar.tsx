import { useState } from "react";
import { useLocation, Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Home,
  Music2,
  Radio,
  Church,
  Heart,
  History,
  PlayCircle,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    icon: <Home className="w-5 h-5" />,
    path: "/user",
  },
  {
    title: "Songs",
    icon: <Music2 className="w-5 h-5" />,
    path: "/user/songs",
  },
  {
    title: "Podcasts",
    icon: <Radio className="w-5 h-5" />,
    path: "/user/podcasts",
  },
  {
    title: "Sermons",
    icon: <Church className="w-5 h-5" />,
    path: "/user/sermons",
  },
];

const libraryItems: NavigationItem[] = [
  // {
  //   title: "Liked",
  //   icon: <Heart className="w-5 h-5" />,
  //   path: "/user/liked",
  // },
  // {
  //   title: "Recently Played",
  //   icon: <History className="w-5 h-5" />,
  //   path: "/user/history",
  // },
  // {
  //   title: "Playlists",
  //   icon: <PlayCircle className="w-5 h-5" />,
  //   path: "/user/playlists",
  // },
];

const UserSideBar = () => {
  const location = useLocation();
  const [isExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-black border-r border-gold-900/20 transition-all duration-300 ${
        isExpanded ? "w-[300px]" : "w-20"
      }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link to="/app" className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-900/10 flex items-center justify-center">
              <img src="/images/logo.png" alt="Gospofy" className="w-full h-full object-cover" />
            </div>
            {isExpanded && <span className="text-xl font-bold text-white">Gospofy</span>}
          </div>
        </Link>

        {/* Main Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.title} to={item.path} className="">
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 cursor-pointer ${
                      isActive(item.path)
                        ? "bg-gold-900/10 text-gold-900"
                        : "text-gray-400 hover:text-gold-900 hover:bg-gold-900/5"
                    }`}>
                    {item.icon}
                    {isExpanded && <span>{item.title}</span>}
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Library Section */}
          <div className="mt-8">
            <div className="px-3 mb-4 flex items-center justify-between">
              {isExpanded && (
                <span className="text-sm font-semibold text-gray-400">Your Library</span>
              )}
              {isExpanded && (
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gold-900">
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="space-y-1">
              {libraryItems.map((item) => (
                <Link key={item.title} to={item.path} className="cursor-pointer">
                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 ${
                        isActive(item.path)
                          ? "bg-gold-900/10 text-gold-900"
                          : "text-gray-400 hover:text-gold-900 hover:bg-gold-900/5"
                      }`}>
                      {item.icon}
                      {isExpanded && <span>{item.title}</span>}
                    </Button>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* User Actions */}
        <div className="p-3 mt-auto border-t border-gold-900/20">
          <Link to="/app/settings">
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-400 hover:text-gold-900">
                <Settings className="w-5 h-5" />
                {isExpanded && <span>Settings</span>}
              </Button>
            </motion.div>
          </Link>
          <Link to="/logout">
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-400 hover:text-gold-900">
                <LogOut className="w-5 h-5" />
                {isExpanded && <span>Sign Out</span>}
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default UserSideBar;
