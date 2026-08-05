// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom"
import { useAuth } from "../contexts/Authcontext"
import { talentNavItems, hiringNavItems } from "../config/navigation"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

export default function DashboardLayout() {
  const { user } = useAuth()
  const navItems = user?.role === "hiring" ? hiringNavItems : talentNavItems

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar navItems={navItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}