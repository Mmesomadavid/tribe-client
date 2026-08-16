import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Building2,
  BarChart3,
  Settings,
  Pen,
} from "lucide-react";

const hiringNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/hiring",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/dashboard/hiring/jobs",
    icon: Briefcase,
  },
  {
    label: "Candidates",
    href: "/dashboard/hiring/candidates",
    icon: Users,
  },
  {
    label: "Applications",
    href: "/dashboard/hiring/applications",
    icon: FileText,
  },
  {
    label: "Messages",
    href: "/dashboard/hiring/messages",
    icon: MessageSquare,
  },
  {
    label: "Company",
    href: "/dashboard/hiring/company",
    icon: Building2,
  },
  {
    label: "Analytics",
    href: "/dashboard/hiring/analytics",
    icon: BarChart3,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: Pen,
  },
  {
    label: "Settings",
    href: "/dashboard/hiring/settings",
    icon: Settings,
  },
];

export default hiringNavItems;