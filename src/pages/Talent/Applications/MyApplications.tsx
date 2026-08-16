import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  DollarSign,
  ExternalLink,
  FileText,
  Filter,
  Inbox,
  MapPin,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  X,
  XCircle,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

/* ============================================================
   TYPES
============================================================ */

type ApplicationStatus =
  | "Applied"
  | "In Review"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

type ApplicationFilter =
  | "All"
  | "Active"
  | "Interview"
  | "Offers"
  | "Rejected"
  | "Withdrawn";

type SortOption = "Newest" | "Oldest" | "Recently updated";

type ActivityType =
  | "submitted"
  | "viewed"
  | "resume"
  | "review"
  | "interview"
  | "offer"
  | "rejected";

interface ApplicationActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  date: number;
  completed?: boolean;
}

interface Application {
  id: string;

  jobTitle: string;
  company: string;
  companyInitial: string;
  companyLogo?: string;

  location: string;
  workplace: "Remote" | "Hybrid" | "On-site";

  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship";

  salary: string;

  appliedDate: string;
  appliedAt: number;

  status: ApplicationStatus;

  lastUpdated: string;
  updatedAt: number;

  nextStep?: string;
  nextStepDate?: string;

  /* AI intelligence */

  matchScore: number;
  hiringPotential: number;

  probabilityLabel:
    | "Excellent"
    | "Strong"
    | "Good"
    | "Moderate"
    | "Low";

  probabilityReason: string;

  skillsMatched: string[];
  skillsMissing: string[];

  employerActivity: {
    applicationViewed: boolean;
    resumeViewed: boolean;
    hiringManagerViewed: boolean;
    lastActivity: string;
  };

  recommendedAction: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  };

  activity: ApplicationActivity[];
}

/* ============================================================
   DEMO DATA
============================================================ */

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-001",
    jobTitle: "Senior Backend Engineer",
    company: "Flutterwave",
    companyInitial: "F",

    location: "Lagos, Nigeria",
    workplace: "Hybrid",
    employmentType: "Full-time",
    salary: "$45k – $65k",

    appliedDate: "Aug 8, 2026",
    appliedAt: new Date("2026-08-08").getTime(),

    status: "In Review",

    lastUpdated: "18 hours ago",
    updatedAt: new Date("2026-08-12T18:00:00").getTime(),

    nextStep: "Application under review",

    matchScore: 91,
    hiringPotential: 78,

    probabilityLabel: "Strong",

    probabilityReason:
      "Your backend experience and technical stack strongly match the requirements. Kubernetes production experience is the main gap.",

    skillsMatched: [
      "Go",
      "PostgreSQL",
      "Docker",
      "Node.js",
      "REST APIs",
      "Microservices",
    ],

    skillsMissing: ["Kubernetes", "AWS"],

    employerActivity: {
      applicationViewed: true,
      resumeViewed: true,
      hiringManagerViewed: true,
      lastActivity: "18 hours ago",
    },

    recommendedAction: {
      title: "Wait before following up",
      description:
        "The hiring team recently reviewed your application. Give them another 2–3 business days before following up.",
      priority: "low",
    },

    activity: [
      {
        id: "1",
        type: "submitted",
        title: "Application submitted",
        description:
          "Your application was successfully submitted.",
        timestamp: "Aug 8 · 9:31 AM",
        date: new Date("2026-08-08T09:31:00").getTime(),
        completed: true,
      },
      {
        id: "2",
        type: "viewed",
        title: "Application viewed",
        description:
          "Someone from the recruiting team opened your application.",
        timestamp: "Aug 10 · 2:14 PM",
        date: new Date("2026-08-10T14:14:00").getTime(),
        completed: true,
      },
      {
        id: "3",
        type: "resume",
        title: "Resume viewed",
        description:
          "Your submitted resume was opened by the employer.",
        timestamp: "Aug 11 · 11:18 AM",
        date: new Date("2026-08-11T11:18:00").getTime(),
        completed: true,
      },
      {
        id: "4",
        type: "review",
        title: "Application under review",
        description:
          "The hiring team is currently evaluating your application.",
        timestamp: "Aug 12 · 6:02 PM",
        date: new Date("2026-08-12T18:02:00").getTime(),
        completed: true,
      },
    ],
  },

  {
    id: "app-002",
    jobTitle: "DevOps Engineer",
    company: "Andela",
    companyInitial: "A",

    location: "Remote · Worldwide",
    workplace: "Remote",
    employmentType: "Full-time",
    salary: "$50k – $75k",

    appliedDate: "Aug 5, 2026",
    appliedAt: new Date("2026-08-05").getTime(),

    status: "Interview",

    lastUpdated: "1 day ago",
    updatedAt: new Date("2026-08-12").getTime(),

    nextStep: "Technical interview",
    nextStepDate: "Aug 14, 2026",

    matchScore: 95,
    hiringPotential: 88,

    probabilityLabel: "Excellent",

    probabilityReason:
      "Your infrastructure experience closely matches the role. You have strong alignment across Docker, Kubernetes, Terraform and CI/CD.",

    skillsMatched: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "GitHub Actions",
      "Linux",
    ],

    skillsMissing: ["Azure"],

    employerActivity: {
      applicationViewed: true,
      resumeViewed: true,
      hiringManagerViewed: true,
      lastActivity: "1 day ago",
    },

    recommendedAction: {
      title: "Prepare for your technical interview",
      description:
        "Review Kubernetes troubleshooting, Terraform architecture and CI/CD system design before your interview.",
      priority: "high",
    },

    activity: [
      {
        id: "1",
        type: "submitted",
        title: "Application submitted",
        description:
          "Your application was successfully submitted.",
        timestamp: "Aug 5 · 10:21 AM",
        date: new Date("2026-08-05T10:21:00").getTime(),
        completed: true,
      },
      {
        id: "2",
        type: "viewed",
        title: "Recruiter viewed application",
        description:
          "Your application was opened by the recruiting team.",
        timestamp: "Aug 6 · 3:45 PM",
        date: new Date("2026-08-06T15:45:00").getTime(),
        completed: true,
      },
      {
        id: "3",
        type: "review",
        title: "Application shortlisted",
        description:
          "Your application progressed to the interview stage.",
        timestamp: "Aug 9 · 9:10 AM",
        date: new Date("2026-08-09T09:10:00").getTime(),
        completed: true,
      },
      {
        id: "4",
        type: "interview",
        title: "Technical interview scheduled",
        description:
          "Your technical interview is scheduled for Aug 14.",
        timestamp: "Aug 12 · 1:30 PM",
        date: new Date("2026-08-12T13:30:00").getTime(),
        completed: true,
      },
    ],
  },

  {
    id: "app-003",
    jobTitle: "Platform Engineer",
    company: "Moniepoint",
    companyInitial: "M",

    location: "Lagos, Nigeria",
    workplace: "Hybrid",
    employmentType: "Full-time",
    salary: "₦8m – ₦12m",

    appliedDate: "Jul 30, 2026",
    appliedAt: new Date("2026-07-30").getTime(),

    status: "Applied",

    lastUpdated: "6 days ago",
    updatedAt: new Date("2026-08-07").getTime(),

    nextStep: "Waiting for employer response",

    matchScore: 84,
    hiringPotential: 61,

    probabilityLabel: "Good",

    probabilityReason:
      "Your infrastructure background aligns well with the role, but the posting strongly prefers candidates with extensive cloud platform experience.",

    skillsMatched: [
      "Docker",
      "Terraform",
      "Linux",
      "Prometheus",
      "Grafana",
    ],

    skillsMissing: ["AWS", "GCP", "ArgoCD"],

    employerActivity: {
      applicationViewed: false,
      resumeViewed: false,
      hiringManagerViewed: false,
      lastActivity: "6 days ago",
    },

    recommendedAction: {
      title: "Consider a follow-up",
      description:
        "Your application has not been viewed in six days. A short, professional follow-up could increase visibility.",
      priority: "medium",
    },

    activity: [
      {
        id: "1",
        type: "submitted",
        title: "Application submitted",
        description:
          "Your application was successfully submitted.",
        timestamp: "Jul 30 · 4:42 PM",
        date: new Date("2026-07-30T16:42:00").getTime(),
        completed: true,
      },
    ],
  },

  {
    id: "app-004",
    jobTitle: "Cloud Infrastructure Engineer",
    company: "Microsoft",
    companyInitial: "M",

    location: "Remote · EMEA",
    workplace: "Remote",
    employmentType: "Full-time",
    salary: "$70k – $95k",

    appliedDate: "Jul 24, 2026",
    appliedAt: new Date("2026-07-24").getTime(),

    status: "Offer",

    lastUpdated: "3 hours ago",
    updatedAt: new Date("2026-08-13T08:00:00").getTime(),

    nextStep: "Offer received",
    nextStepDate: "Aug 18, 2026",

    matchScore: 97,
    hiringPotential: 99,

    probabilityLabel: "Excellent",

    probabilityReason:
      "You have progressed to an offer. Your profile demonstrated exceptional alignment with the role requirements.",

    skillsMatched: [
      "Azure",
      "Terraform",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Linux",
    ],

    skillsMissing: [],

    employerActivity: {
      applicationViewed: true,
      resumeViewed: true,
      hiringManagerViewed: true,
      lastActivity: "3 hours ago",
    },

    recommendedAction: {
      title: "Review your offer",
      description:
        "You have received an offer. Review compensation, benefits, start date and any conditions before accepting.",
      priority: "high",
    },

    activity: [
      {
        id: "1",
        type: "submitted",
        title: "Application submitted",
        description:
          "Your application was successfully submitted.",
        timestamp: "Jul 24 · 8:12 AM",
        date: new Date("2026-07-24T08:12:00").getTime(),
        completed: true,
      },
      {
        id: "2",
        type: "viewed",
        title: "Recruiter viewed application",
        description:
          "The recruiting team opened your application.",
        timestamp: "Jul 25 · 12:44 PM",
        date: new Date("2026-07-25T12:44:00").getTime(),
        completed: true,
      },
      {
        id: "3",
        type: "interview",
        title: "Interview completed",
        description:
          "You completed the final interview stage.",
        timestamp: "Aug 7 · 3:00 PM",
        date: new Date("2026-08-07T15:00:00").getTime(),
        completed: true,
      },
      {
        id: "4",
        type: "offer",
        title: "Offer received",
        description:
          "The employer has extended an offer for this position.",
        timestamp: "Aug 13 · 8:00 AM",
        date: new Date("2026-08-13T08:00:00").getTime(),
        completed: true,
      },
    ],
  },

  {
    id: "app-005",
    jobTitle: "Software Engineer",
    company: "Paystack",
    companyInitial: "P",

    location: "Lagos, Nigeria",
    workplace: "Hybrid",
    employmentType: "Full-time",
    salary: "$40k – $60k",

    appliedDate: "Jul 18, 2026",
    appliedAt: new Date("2026-07-18").getTime(),

    status: "Rejected",

    lastUpdated: "Jul 28, 2026",
    updatedAt: new Date("2026-07-28").getTime(),

    matchScore: 67,
    hiringPotential: 24,

    probabilityLabel: "Low",

    probabilityReason:
      "The role required more direct experience with the company's preferred stack and seniority level.",

    skillsMatched: ["Node.js", "TypeScript", "REST APIs"],

    skillsMissing: ["Java", "Spring Boot", "Kafka"],

    employerActivity: {
      applicationViewed: true,
      resumeViewed: true,
      hiringManagerViewed: false,
      lastActivity: "Jul 28",
    },

    recommendedAction: {
      title: "Strengthen your backend profile",
      description:
        "Consider adding experience with event-driven architecture and Java/Spring Boot to improve your fit for similar roles.",
      priority: "medium",
    },

    activity: [
      {
        id: "1",
        type: "submitted",
        title: "Application submitted",
        description:
          "Your application was successfully submitted.",
        timestamp: "Jul 18",
        date: new Date("2026-07-18").getTime(),
        completed: true,
      },
      {
        id: "2",
        type: "viewed",
        title: "Application viewed",
        description:
          "Your application was opened by the recruiting team.",
        timestamp: "Jul 21",
        date: new Date("2026-07-21").getTime(),
        completed: true,
      },
      {
        id: "3",
        type: "rejected",
        title: "Application closed",
        description:
          "The employer decided not to move forward with your application.",
        timestamp: "Jul 28",
        date: new Date("2026-07-28").getTime(),
        completed: true,
      },
    ],
  },
];

/* ============================================================
   STATUS CONFIG
============================================================ */

const STATUS_CONFIG: Record<
  ApplicationStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
    pulse?: boolean;
  }
> = {
  Applied: {
    label: "Applied",
    className: "bg-gray-100 text-gray-600",
    icon: Send,
  },

  "In Review": {
    label: "In Review",
    className: "border border-gray-300 bg-white text-gray-700",
    icon: Clock3,
  },

  Interview: {
    label: "Interview",
    className: "border border-gray-900 bg-white text-gray-900",
    icon: Video,
    pulse: true,
  },

  Offer: {
    label: "Offer",
    className: "bg-gray-950 text-white",
    icon: CheckCircle2,
  },

  Rejected: {
    label: "Rejected",
    className: "border border-gray-100 bg-gray-50 text-gray-400",
    icon: XCircle,
  },

  Withdrawn: {
    label: "Withdrawn",
    className: "border border-dashed border-gray-200 bg-white text-gray-400",
    icon: XCircle,
  },
};

/* ============================================================
   STATUS BADGE
============================================================ */

const StatusBadge = ({
  status,
}: {
  status: ApplicationStatus;
}) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.className}`}
    >
      {config.pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-900 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gray-900" />
        </span>
      )}
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};

/* ============================================================
   PROBABILITY
============================================================ */

const Probability = ({
  score,
  label,
  compact = false,
}: {
  score: number;
  label: string;
  compact?: boolean;
}) => {
  return (
    <div className={compact ? "w-[76px]" : "w-full"}>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p
            className={`font-bold tracking-tight text-gray-950 ${
              compact ? "text-lg" : "text-3xl"
            }`}
          >
            {score}%
          </p>

          {!compact && (
            <p className="mt-0.5 text-[11px] font-medium text-gray-500">
              {label} hiring potential
            </p>
          )}
        </div>

        {!compact && (
          <Target className="mb-1 h-4 w-4 text-gray-400" />
        )}
      </div>

      <div
        className={`overflow-hidden rounded-full bg-gray-100 ${
          compact ? "mt-1.5 h-1.5" : "mt-3 h-2"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gray-950"
        />
      </div>
    </div>
  );
};

/* ============================================================
   ACTIVITY ICON
============================================================ */

const ActivityIcon = ({
  type,
}: {
  type: ActivityType;
}) => {
  const icons: Record<ActivityType, typeof Send> = {
    submitted: Send,
    viewed: EyeIcon,
    resume: FileText,
    review: UserCheck,
    interview: Video,
    offer: CheckCircle2,
    rejected: XCircle,
  };

  const Icon = icons[type];

  return <Icon className="h-3.5 w-3.5" />;
};

const EyeIcon = ({
  className,
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

/* ============================================================
   STATS CARD
============================================================ */

const StatCard = ({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: typeof Activity;
}) => {
  return (
    <Card className="group rounded-2xl border-gray-200 bg-white shadow-none transition-colors hover:border-gray-900">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">
              {label}
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
              {value}
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              {detail}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 transition-colors group-hover:bg-gray-950 group-hover:text-white">
            <Icon className="h-4 w-4 text-gray-500 group-hover:text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ============================================================
   APPLICATION CARD
============================================================ */

interface ApplicationCardProps {
  application: Application;
  onOpen: (application: Application) => void;
  onWithdraw: (id: string) => void;
}

const ApplicationCard = ({
  application,
  onOpen,
  onWithdraw,
}: ApplicationCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive =
    application.status !== "Rejected" &&
    application.status !== "Withdrawn";

  const isClosed = !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`group border-b border-gray-100 last:border-b-0 ${
        isClosed ? "opacity-70" : ""
      }`}
    >
      <div className="p-5 transition-colors hover:bg-gray-50/50 sm:p-6">
        <div className="flex gap-4">
          {/* LOGO */}

          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-900 text-sm font-bold text-white">
            {application.companyLogo ? (
              <img
                src={application.companyLogo}
                alt={application.company}
                className="h-full w-full object-cover"
              />
            ) : (
              application.companyInitial
            )}
          </div>

          {/* CONTENT */}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-5">
              <button
                type="button"
                onClick={() => onOpen(application)}
                className="min-w-0 text-left"
              >
                <h3 className="truncate text-[15px] font-semibold tracking-tight text-gray-950 hover:underline">
                  {application.jobTitle}
                </h3>

                <p className="mt-0.5 text-sm text-gray-600">
                  {application.company}
                </p>
              </button>

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-9 z-30 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpen(application);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <Inbox className="h-3.5 w-3.5" />
                      View application
                    </button>

                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View job
                    </button>

                    {isActive && (
                      <>
                        <div className="my-1 border-t border-gray-100" />

                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            onWithdraw(application.id);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Withdraw application
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* METADATA */}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                {application.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-gray-400" />
                {application.workplace}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                {application.salary}
              </span>
            </div>

            {/* STATUS + SCORE */}

            <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <StatusBadge status={application.status} />

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Applied {application.appliedDate}
                  </span>

                  <span>•</span>

                  <span>
                    Updated {application.lastUpdated}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Match
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {application.matchScore}%
                  </p>
                </div>

                <div className="h-8 w-px bg-gray-200" />

                <Probability
                  score={application.hiringPotential}
                  label={application.probabilityLabel}
                  compact
                />
              </div>
            </div>

            {/* EMPLOYER ACTIVITY */}

            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                  Employer activity
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] ${
                    application.employerActivity.applicationViewed
                      ? "text-gray-700"
                      : "text-gray-300"
                  }`}
                >
                  {application.employerActivity.applicationViewed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Clock3 className="h-3 w-3" />
                  )}
                  Application viewed
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] ${
                    application.employerActivity.resumeViewed
                      ? "text-gray-700"
                      : "text-gray-300"
                  }`}
                >
                  {application.employerActivity.resumeViewed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Clock3 className="h-3 w-3" />
                  )}
                  Resume viewed
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] ${
                    application.employerActivity.hiringManagerViewed
                      ? "text-gray-700"
                      : "text-gray-300"
                  }`}
                >
                  {application.employerActivity.hiringManagerViewed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Clock3 className="h-3 w-3" />
                  )}
                  Hiring team
                </span>
              </div>
            </div>

            {/* NEXT ACTION */}

            {application.recommendedAction && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-950">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-gray-900">
                    {application.recommendedAction.title}
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-gray-500">
                    {application.recommendedAction.description}
                  </p>
                </div>
              </div>
            )}

            {/* FOOTER */}

            <div className="mt-4 flex items-center justify-between gap-3">
              {application.nextStep ? (
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />

                  <span className="text-[11px] font-medium text-gray-500">
                    Next:
                  </span>

                  <span className="truncate text-[11px] text-gray-600">
                    {application.nextStep}
                  </span>

                  {application.nextStepDate && (
                    <span className="shrink-0 text-[11px] font-medium text-gray-500">
                      · {application.nextStepDate}
                    </span>
                  )}
                </div>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={() => onOpen(application)}
                className="group/view inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-950"
              >
                View details

                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/view:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   APPLICATION DETAIL DRAWER
============================================================ */

const ApplicationDrawer = ({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}

        <motion.button
          type="button"
          aria-label="Close application details"
          onClick={onClose}
          className="absolute inset-0 h-full w-full cursor-default bg-black/20 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* DRAWER */}

        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 38,
          }}
          className="absolute right-0 top-0 h-full w-full max-w-[620px] overflow-y-auto border-l border-gray-200 bg-white shadow-2xl"
        >
          {/* HEADER */}

          <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 font-bold text-white">
                  {application.companyInitial}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-950">
                    {application.jobTitle}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {application.company}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6 p-6">
            {/* STATUS */}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusBadge status={application.status} />

              <span className="text-[11px] text-gray-400">
                Applied {application.appliedDate}
              </span>
            </div>

            {/* AI SCORE */}

            <Card className="overflow-hidden rounded-2xl border-gray-200 bg-gray-950 text-white shadow-none">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />

                      <p className="text-xs font-semibold">
                        WorkTribe Intelligence
                      </p>
                    </div>

                    <p className="mt-3 text-3xl font-bold tracking-tight">
                      {application.hiringPotential}%
                    </p>

                    <p className="mt-1 text-xs text-gray-300">
                      {application.probabilityLabel} hiring potential
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Job match
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {application.matchScore}%
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${application.hiringPotential}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-white"
                  />
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-300">
                  {application.probabilityReason}
                </p>

                <p className="mt-3 text-[10px] text-gray-500">
                  AI estimate based on profile fit, job requirements,
                  application stage and available employer signals.
                </p>
              </CardContent>
            </Card>

            {/* JOB DETAILS */}

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-950">
                  Job details
                </h2>

                <button
                  type="button"
                  className="text-[11px] font-semibold text-gray-500 hover:text-gray-950"
                >
                  View job
                  <ArrowUpRight className="ml-1 inline h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-gray-100 p-3">
                  <MapPin className="h-4 w-4 text-gray-400" />

                  <p className="mt-2 text-[10px] text-gray-400">
                    Location
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-gray-800">
                    {application.location}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-3">
                  <BriefcaseBusiness className="h-4 w-4 text-gray-400" />

                  <p className="mt-2 text-[10px] text-gray-400">
                    Work style
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-gray-800">
                    {application.workplace}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-3">
                  <DollarSign className="h-4 w-4 text-gray-400" />

                  <p className="mt-2 text-[10px] text-gray-400">
                    Compensation
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-gray-800">
                    {application.salary}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-3">
                  <Users className="h-4 w-4 text-gray-400" />

                  <p className="mt-2 text-[10px] text-gray-400">
                    Employment
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-gray-800">
                    {application.employmentType}
                  </p>
                </div>
              </div>
            </section>

            {/* EMPLOYER ACTIVITY */}

            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-950">
                Employer activity
              </h2>

              <div className="rounded-2xl border border-gray-200">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  <ActivityStat
                    label="Application"
                    active={
                      application.employerActivity.applicationViewed
                    }
                  />

                  <ActivityStat
                    label="Resume"
                    active={
                      application.employerActivity.resumeViewed
                    }
                  />

                  <ActivityStat
                    label="Hiring team"
                    active={
                      application.employerActivity
                        .hiringManagerViewed
                    }
                  />
                </div>

                <div className="border-t border-gray-100 px-4 py-3">
                  <p className="text-[11px] text-gray-500">
                    Last employer activity{" "}
                    <span className="font-semibold text-gray-800">
                      {application.employerActivity.lastActivity}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* SKILL MATCH */}

            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-950">
                Skills match
              </h2>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-800">
                      Matched skills
                    </p>

                    <span className="text-[11px] font-semibold text-gray-500">
                      {application.skillsMatched.length} matched
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {application.skillsMatched.map((skill) => (
                      <Badge
                        key={skill}
                        className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Check className="mr-1 h-3 w-3" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {application.skillsMissing.length > 0 && (
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-800">
                      Potential gaps
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {application.skillsMissing.map((skill) => (
                        <Badge
                          key={skill}
                          className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-gray-500 hover:bg-white"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* RECOMMENDED ACTION */}

            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-950">
                Recommended action
              </h2>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-950">
                    <Zap className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-950">
                      {application.recommendedAction.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {application.recommendedAction.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TIMELINE */}

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-950">
                  Application timeline
                </h2>

                <span className="text-[10px] text-gray-400">
                  {application.activity.length} events
                </span>
              </div>

              <div className="relative">
                <div className="absolute bottom-4 left-[15px] top-4 w-px bg-gray-200" />

                <div className="space-y-6">
                  {application.activity.map((event) => (
                    <div
                      key={event.id}
                      className="relative flex gap-3"
                    >
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                          event.type === "offer"
                            ? "border-gray-900 bg-gray-950 text-white"
                            : event.type === "rejected"
                              ? "border-gray-200 bg-gray-50 text-gray-400"
                              : "border-gray-200 bg-white text-gray-500"
                        }`}
                      >
                        <ActivityIcon type={event.type} />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className="text-xs font-semibold text-gray-900">
                            {event.title}
                          </p>

                          <span className="text-[10px] text-gray-400">
                            {event.timestamp}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-gray-500">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SUBMITTED MATERIALS */}

            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-950">
                Submitted with application
              </h2>

              <div className="space-y-2">
                <Material
                  icon={FileText}
                  title="Resume"
                  description="Software Engineer Resume · v4"
                />

                <Material
                  icon={FileText}
                  title="Cover letter"
                  description="Tailored application cover letter"
                />
              </div>
            </section>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
};

/* ============================================================
   ACTIVITY STAT
============================================================ */

const ActivityStat = ({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) => {
  return (
    <div className="p-4 text-center">
      <div
        className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
          active
            ? "bg-gray-950 text-white"
            : "bg-gray-50 text-gray-300"
        }`}
      >
        {active ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Clock3 className="h-3.5 w-3.5" />
        )}
      </div>

      <p
        className={`mt-2 text-[10px] font-medium ${
          active ? "text-gray-700" : "text-gray-300"
        }`}
      >
        {label}
      </p>

      <p className="mt-0.5 text-[9px] text-gray-400">
        {active ? "Viewed" : "Not yet"}
      </p>
    </div>
  );
};

/* ============================================================
   MATERIAL
============================================================ */

const Material = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
        <Icon className="h-3.5 w-3.5 text-gray-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-800">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-gray-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        className="ml-auto text-gray-400 hover:text-gray-900"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

/* ============================================================
   EMPTY STATE
============================================================ */

const EmptyState = ({
  search,
}: {
  search: string;
}) => {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
        <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        No applications found
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
        {search
          ? "Try searching for another job or company."
          : "Applications matching this filter will appear here."}
      </p>
    </div>
  );
};

/* ============================================================
   MAIN PAGE
============================================================ */

const MyApplications = () => {
  const [applications, setApplications] = useState<
    Application[]
  >(INITIAL_APPLICATIONS);

  const [activeFilter, setActiveFilter] =
    useState<ApplicationFilter>("All");

  const [search, setSearch] = useState("");

  const [sort, setSort] =
    useState<SortOption>("Newest");

  const [sortOpen, setSortOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  /* ==========================================================
     STATS
  ========================================================== */

  const stats = useMemo(() => {
    const active = applications.filter(
      (application) =>
        application.status !== "Rejected" &&
        application.status !== "Withdrawn"
    );

    const interviews = applications.filter(
      (application) => application.status === "Interview"
    );

    const offers = applications.filter(
      (application) => application.status === "Offer"
    );

    const responded = applications.filter(
      (application) =>
        application.status !== "Applied" &&
        application.status !== "Withdrawn"
    );

    const averageMatch =
      applications.length > 0
        ? Math.round(
            applications.reduce(
              (sum, application) =>
                sum + application.matchScore,
              0
            ) / applications.length
          )
        : 0;

    const interviewRate =
      applications.length > 0
        ? Math.round(
            (interviews.length / applications.length) * 100
          )
        : 0;

    const responseRate =
      applications.length > 0
        ? Math.round(
            (responded.length / applications.length) * 100
          )
        : 0;

    const averagePotential =
      applications.length > 0
        ? Math.round(
            applications.reduce(
              (sum, application) =>
                sum + application.hiringPotential,
              0
            ) / applications.length
          )
        : 0;

    const needsAttention = applications.filter(
      (application) =>
        application.recommendedAction.priority === "high" ||
        application.recommendedAction.priority === "medium"
    ).length;

    return {
      total: applications.length,
      active: active.length,
      interviews: interviews.length,
      offers: offers.length,
      averageMatch,
      averagePotential,
      interviewRate,
      responseRate,
      needsAttention,
    };
  }, [applications]);

  /* ==========================================================
     FILTER COUNTS
  ========================================================== */

  const filterCounts = useMemo(() => {
    return {
      All: applications.length,

      Active: applications.filter(
        (a) =>
          a.status !== "Rejected" &&
          a.status !== "Withdrawn"
      ).length,

      Interview: applications.filter(
        (a) => a.status === "Interview"
      ).length,

      Offers: applications.filter(
        (a) => a.status === "Offer"
      ).length,

      Rejected: applications.filter(
        (a) => a.status === "Rejected"
      ).length,

      Withdrawn: applications.filter(
        (a) => a.status === "Withdrawn"
      ).length,
    };
  }, [applications]);

  /* ==========================================================
     FILTER + SEARCH + SORT
  ========================================================== */

  const filteredApplications = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = applications.filter(
      (application) => {
        let matchesFilter = true;

        if (activeFilter === "Active") {
          matchesFilter =
            application.status !== "Rejected" &&
            application.status !== "Withdrawn";
        }

        if (activeFilter === "Interview") {
          matchesFilter =
            application.status === "Interview";
        }

        if (activeFilter === "Offers") {
          matchesFilter =
            application.status === "Offer";
        }

        if (activeFilter === "Rejected") {
          matchesFilter =
            application.status === "Rejected";
        }

        if (activeFilter === "Withdrawn") {
          matchesFilter =
            application.status === "Withdrawn";
        }

        const matchesSearch =
          !normalizedSearch ||
          application.jobTitle
            .toLowerCase()
            .includes(normalizedSearch) ||
          application.company
            .toLowerCase()
            .includes(normalizedSearch) ||
          application.location
            .toLowerCase()
            .includes(normalizedSearch);

        return matchesFilter && matchesSearch;
      }
    );

    return [...filtered].sort((a, b) => {
      if (sort === "Newest") {
        return b.appliedAt - a.appliedAt;
      }

      if (sort === "Oldest") {
        return a.appliedAt - b.appliedAt;
      }

      return b.updatedAt - a.updatedAt;
    });
  }, [
    applications,
    activeFilter,
    search,
    sort,
  ]);

  /* ==========================================================
     WITHDRAW
  ========================================================== */

  const handleWithdraw = (id: string) => {
    setApplications((current) =>
      current.map((application) => {
        if (application.id !== id) {
          return application;
        }

        return {
          ...application,

          status: "Withdrawn",

          lastUpdated: "Just now",

          updatedAt: Date.now(),

          nextStep: undefined,

          nextStepDate: undefined,
        };
      })
    );

    setSelectedApplication(null);
  };

  /* ==========================================================
     FILTERS
  ========================================================== */

  const filters: ApplicationFilter[] = [
    "All",
    "Active",
    "Interview",
    "Offers",
    "Rejected",
    "Withdrawn",
  ];

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="min-h-full bg-gray-50/40">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
          <div className="flex min-h-[88px] items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-[-0.035em] text-gray-950 sm:text-[28px]">
                  My Applications
                </h1>

                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                  {stats.total}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Track every application and understand where you
                stand.
              </p>
            </div>

            <button
              type="button"
              className="hidden h-9 items-center gap-2 rounded-lg bg-gray-950 px-4 text-xs font-semibold text-white transition-colors hover:bg-gray-800 sm:inline-flex"
            >
              <Search className="h-3.5 w-3.5" />
              Find jobs
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-[1240px] px-5 py-6 sm:px-6 lg:px-8">
        {/* ====================================================
            STATS
        ==================================================== */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Active applications"
            value={stats.active}
            detail={`${stats.responseRate}% employer response rate`}
            icon={Activity}
          />

          <StatCard
            label="Interviews"
            value={stats.interviews}
            detail={`${stats.interviewRate}% of applications`}
            icon={Video}
          />

          <StatCard
            label="Average match"
            value={`${stats.averageMatch}%`}
            detail="Profile → job alignment"
            icon={Target}
          />

          <StatCard
            label="Offers"
            value={stats.offers}
            detail={`${stats.needsAttention} applications need attention`}
            icon={TrendingUp}
          />
        </div>

        {/* ====================================================
            INTELLIGENCE BANNER
        ==================================================== */}

        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-950">
                  Your application health
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
                  Your applications have an average{" "}
                  <span className="font-semibold text-gray-800">
                    {stats.averagePotential}% hiring potential
                  </span>
                  . You currently have{" "}
                  <span className="font-semibold text-gray-800">
                    {stats.interviews} interview
                    {stats.interviews !== 1 ? "s" : ""}
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-gray-800">
                    {stats.offers} offer
                    {stats.offers !== 1 ? "s" : ""}
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="min-w-[160px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Portfolio health
                </span>

                <span className="text-xs font-bold text-gray-900">
                  {stats.averagePotential}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${stats.averagePotential}%`,
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gray-950"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            APPLICATION WORKSPACE
        ==================================================== */}

        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* TOOLBAR */}

          <div className="border-b border-gray-200 px-5 pt-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* SEARCH */}

              <div className="relative w-full sm:max-w-[360px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search applications"
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* CONTROLS */}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setSortOpen((value) => !value)
                    }
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {sort}

                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-11 z-30 w-44 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
                      {(
                        [
                          "Newest",
                          "Oldest",
                          "Recently updated",
                        ] as SortOption[]
                      ).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSort(option);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-medium ${
                            sort === option
                              ? "bg-gray-100 text-gray-950"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* TABS */}

            <div className="mt-5 flex gap-6 overflow-x-auto scrollbar-none">
              {filters.map((filter) => {
                const active = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                    className={`relative shrink-0 pb-3.5 text-xs font-semibold transition-colors ${
                      active
                        ? "text-gray-950"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {filter}

                    <span
                      className={`ml-1 ${
                        active
                          ? "text-gray-500"
                          : "text-gray-300"
                      }`}
                    >
                      {filterCounts[filter]}
                    </span>

                    {active && (
                      <motion.span
                        layoutId="active-application-tab"
                        className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gray-950"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LIST HEADER */}

          <div className="hidden border-b border-gray-100 bg-gray-50/60 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 sm:block">
            Applications
          </div>

          {/* APPLICATIONS */}

          {filteredApplications.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onOpen={setSelectedApplication}
                  onWithdraw={handleWithdraw}
                />
              ))}
            </AnimatePresence>
          ) : (
            <EmptyState search={search} />
          )}
        </div>

        {/* FOOTER */}

        {filteredApplications.length > 0 && (
          <div className="mt-4 flex items-center justify-between px-1 text-[11px] text-gray-400">
            <span>
              Showing {filteredApplications.length}{" "}
              {filteredApplications.length === 1
                ? "application"
                : "applications"}
            </span>

            <span>{applications.length} total</span>
          </div>
        )}
      </div>

      {/* ======================================================
          DRAWER
      ====================================================== */}

      {selectedApplication && (
        <ApplicationDrawer
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default MyApplications;