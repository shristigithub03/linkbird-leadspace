import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Target,
  Mail,
  Menu,
  X
} from "lucide-react";
import { LinkBirdLogo } from "@/components/ui/linkbird-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    url: "/leads",
    icon: Users,
  },
  {
    title: "Campaigns",
    url: "/campaigns", 
    icon: Target,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  className?: string;
}

export const AppSidebar = ({ className }: AppSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={cn(
      "flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-foreground/10">
        {!isCollapsed && <LinkBirdLogo className="text-white" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-hover hover:text-white transition-smooth"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                "hover:bg-sidebar-hover hover:text-white",
                isActive && "bg-sidebar-hover text-white shadow-soft",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-foreground/10">
        <div className={cn(
          "flex items-center gap-3 rounded-lg p-3 bg-sidebar-foreground/5",
          isCollapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Mail className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground">John Smith</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};