import { useLocation } from "react-router";
import { MenuItem } from "./MenuItem";
import { LayoutDashboard, Users, Music2, Podcast, Church } from "lucide-react";
import { ReactNode } from "react";

interface NavigationItem {
  title: string;
  icon: ReactNode;
  path: string;
  subItems?: {
    title: string;
    path: string;
    icon: ReactNode;
  }[];
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} color="white" />,
    path: "/admin",
  },
  {
    title: "Users",
    icon: <Users size={20} color="white" />,
    path: "/admin/users",
  },
  {
    title: "Media",
    icon: <Music2 size={20} color="white" />,
    path: "/admin/",
    subItems: [
      {
        title: "Songs",
        path: "/admin/songs",
        icon: <Music2 size={18} color="white" />,
      },
      {
        title: "Podcasts",
        path: "/admin/podcasts",
        icon: <Podcast size={18} color="white" />,
      },
      {
        title: "Sermons",
        path: "/admin/sermons",
        icon: <Church size={18} color="white" />,
      },
    ],
  },
];

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isSubMenuActive = (item: NavigationItem) =>
    item.subItems?.some((subItem) => location.pathname === subItem.path);

  return (
    <nav className="p-4 space-y-2">
      {navigationItems.map((item) => (
        <MenuItem
          key={item.title}
          {...item}
          isActive={isActive(item.path)}
          isSubMenuActive={isSubMenuActive(item)}
        />
      ))}
    </nav>
  );
};
