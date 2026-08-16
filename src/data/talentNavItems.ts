import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  MessageSquare,
  Settings,
  CircleHelp,
  PenLine,
} from "lucide-react";

const talentNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/talent",
    icon: LayoutDashboard,
  },
  {
    label: "Blog",
    href: "/dashboard/talent/blog",
    icon: PenLine,
  },
  {
    label: "My Applications",
    href: "/dashboard/talent/applications",
    icon: Briefcase,
  },
  {
    label: "Saved Jobs",
    href: "/dashboard/talent/saved-jobs",
    icon: Bookmark,
  },
  {
    label: "AI Resume",
    href: "/dashboard/talent/resume",
    icon: FileText,
  },
  {
    label: "Messages",
    href: "/dashboard/talent/messages",
    icon: MessageSquare,
  },
];

export const talentBottomNavItems = [
  {
    label: "Help & Support",
    href: "/dashboard/talent/help",
    icon: CircleHelp,
  },
  {
    label: "Settings",
    href: "/dashboard/talent/settings",
    icon: Settings,
  },
];

export default talentNavItems;