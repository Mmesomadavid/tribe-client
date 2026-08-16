import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import talentNavItems, {
  talentBottomNavItems,
} from "../../data/talentNavItems";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import { useAuth } from "../../contexts/Authcontext";

export default function Sidebar() {
  const { user } = useAuth();

  const renderNavItem = (
    item: (typeof talentNavItems)[number]
  ) => {
    const Icon = item.icon;

    return (
      <SidebarMenuItem key={item.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={item.href}
              end={item.href === "/dashboard/talent"}
              className={({ isActive }) =>
                cn(
                  "group flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                  "outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive
                    ? "bg-gray-100 text-gray-950"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                )
              }
            >
              <Icon
                className={cn(
                  "h-[19px] w-[19px] shrink-0 transition-transform duration-200",
                  "text-current",
                  "group-hover:scale-105"
                )}
              />

              <span className="sr-only">{item.label}</span>
            </NavLink>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            sideOffset={10}
            className="rounded-lg px-3 py-1.5 text-xs font-medium"
          >
            {item.label}
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ShadcnSidebar
        collapsible="icon"
        variant="sidebar"
        className="border-r border-gray-100 bg-white"
      >
        <SidebarContent className="flex h-full bg-white">
          {/* =========================
              MAIN NAVIGATION
          ========================== */}
          <SidebarGroup className="px-2 py-4">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {talentNavItems.map(renderNavItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* =========================
              BOTTOM NAVIGATION
          ========================== */}
          <div className="mt-auto px-2 pb-3">
            <SidebarMenu className="gap-1.5">
              {talentBottomNavItems.map(renderNavItem)}

              {/* =========================
                  USER AVATAR
              ========================== */}
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to="/dashboard/talent/profile"
                      className="group flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-gray-100"
                    >
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-white">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name || "Profile"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>

                      <span className="sr-only">
                        Profile
                      </span>
                    </NavLink>
                  </TooltipTrigger>

                  <TooltipContent
                    side="right"
                    sideOffset={10}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium"
                  >
                    Profile
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      </ShadcnSidebar>
    </TooltipProvider>
  );
}