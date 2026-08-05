// src/config/navigation.ts
import {
  LayoutDashboard, Search, FileText, User, MessageSquare,
  Sparkles, Briefcase, Settings, Users, BarChart3, Building2,
} from "lucide-react"
import type { ComponentType } from "react"

export interface NavItem {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export const talentNavItems: NavItem[] = [
  { label: "Dashboard", href: "/talent", icon: LayoutDashboard },
  { label: "Discover", href: "/talent/discover", icon: Search },
  { label: "Applications", href: "/talent/applications", icon: FileText },
  { label: "Profile", href: "/talent/profile", icon: User },
  { label: "Messages", href: "/talent/messages", icon: MessageSquare },
  { label: "AI Assistant", href: "/talent/ai-assistant", icon: Sparkles },
  { label: "Workspace", href: "/talent/workspace", icon: Briefcase },
  { label: "Settings", href: "/talent/settings", icon: Settings },
]

export const hiringNavItems: NavItem[] = [
  { label: "Dashboard", href: "/hiring", icon: LayoutDashboard },
  { label: "Jobs", href: "/hiring/jobs", icon: Briefcase },
  { label: "Candidates", href: "/hiring/candidates", icon: Users },
  { label: "Applications", href: "/hiring/applications", icon: FileText },
  { label: "Messages", href: "/hiring/messages", icon: MessageSquare },
  { label: "Company", href: "/hiring/company", icon: Building2 },
  { label: "Analytics", href: "/hiring/analytics", icon: BarChart3 },
  { label: "Settings", href: "/hiring/settings", icon: Settings },
]