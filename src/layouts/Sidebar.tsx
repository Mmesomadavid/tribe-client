// src/layouts/Sidebar.tsx
import { NavLink } from "react-router-dom"
import { cn } from "../lib/utils"
import type { NavItem } from "../config/navigation"

export default function Sidebar({ navItems }: { navItems: NavItem[] }) {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-16 items-center px-6 text-lg font-semibold">
        WorkTribe
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/talent" || item.href === "/hiring"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}