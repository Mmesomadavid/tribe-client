import {
  BriefcaseBusiness,
  Bookmark,
  FileText,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";


const RecentActivityCard = () => {

  const activities = [
    {
      id: 1,
      type: "application",
      title: "Application submitted",
      description: "Backend Engineer",
      time: "2h ago",
      icon: BriefcaseBusiness,
    },
    {
      id: 2,
      type: "saved",
      title: "Job saved",
      description: "Senior Go Developer",
      time: "5h ago",
      icon: Bookmark,
    },
    {
      id: 3,
      type: "resume",
      title: "Resume updated",
      description: "AI Resume",
      time: "Yesterday",
      icon: FileText,
    },
    {
      id: 4,
      type: "message",
      title: "New message",
      description: "Hiring team",
      time: "Yesterday",
      icon: MessageSquare,
    },
  ];

  return (
    <Card className="rounded-2xl border-0 bg-gray-100/50 shadow-none">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-tight text-gray-900">
            Recent activity
          </h3>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            View all
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Activity list */}
        <div className="mt-5 space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>

                    <span className="shrink-0 text-[11px] text-gray-400">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;