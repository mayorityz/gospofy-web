import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface SubMenuItem {
  title: string;
  path: string;
  icon: ReactNode;
}

interface MenuItemProps {
  title: string;
  icon: ReactNode;
  path: string;
  subItems?: SubMenuItem[];
  isActive: boolean;
  isSubMenuActive?: boolean;
}

export const MenuItem = ({
  title,
  icon,
  path,
  subItems,
  isActive,
  isSubMenuActive,
}: MenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (subItems) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between py-2 rounded-md transition-colors outline outline-none ${
            isSubMenuActive
              ? "bg-gold-900/10 text-gold-900"
              : "hover:bg-gold-900/5 hover:text-gold-900"
          }`}
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-white">{title}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-white transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        {isExpanded && (
          <div className="ml-6 space-y-1">
            {subItems.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`flex font-Montserrat items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive && path === subItem.path
                    ? "bg-gold-900/10 text-gold-900"
                    : "text-gray-400 hover:bg-gold-900/5 hover:text-gold-900"
                }`}
              >
                {subItem.icon}
                <span>{subItem.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={path}
      className={`flex font-Montserrat items-center gap-3 text-white p-2 rounded-md transition-colors ${
        isActive
          ? "bg-gold-900/10 text-gold-900"
          : "hover:bg-gold-900/5 hover:text-gold-900"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};
