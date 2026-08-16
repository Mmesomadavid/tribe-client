import { useMemo, useState } from "react";

import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import JobCard, { type Job } from "../../../components/jobs/JobCard";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type StatusFilter = "all" | "open" | "closing-soon" | "closed";

// ─────────────────────────────────────────────
// Mock Saved Jobs — replace with API data later
// ─────────────────────────────────────────────

const initialSavedJobs: Job[] = [
  {
    id: "saved-001",
    postedAt: "2 hours ago",
    title: "Senior Backend Engineer",
    company: "Nexa Systems",
    companyLogo: "",
    description:
      "We're looking for an experienced backend engineer to help us build reliable, scalable services and APIs. You'll work closely with product and infrastructure teams to design systems that serve millions of users.",
    applicants: 24,
    skills: ["Go", "PostgreSQL", "Docker", "Kubernetes"],
    paymentType: "hourly",
    hourlyRate: "35–55",
    paymentVerified: true,
    location: "Remote · Worldwide",
    experienceLevel: "Senior",
    estimatedTime: "Less than 1 month",
    hoursPerWeek: "Less than 30 hrs/week",
    rating: 5,
    saved: true,
    fitScore: 94,
    status: "open",
  },
  {
    id: "saved-002",
    postedAt: "5 hours ago",
    title: "Backend Engineer",
    company: "CloudForge",
    companyLogo: "",
    description:
      "Join our infrastructure team to design APIs, distributed systems and cloud-native services used by customers around the world.",
    applicants: 41,
    skills: ["Node.js", "TypeScript", "AWS", "PostgreSQL"],
    paymentType: "hourly",
    hourlyRate: "30–45",
    paymentVerified: true,
    location: "Remote · US / Europe",
    experienceLevel: "Intermediate",
    estimatedTime: "1–3 months",
    hoursPerWeek: "Less than 30 hrs/week",
    rating: 5,
    saved: true,
    fitScore: 89,
    status: "open",
  },
  {
    id: "saved-003",
    postedAt: "Yesterday",
    title: "Platform Engineer",
    company: "Vertex Labs",
    companyLogo: "",
    description:
      "Help us build and maintain reliable cloud infrastructure, developer tooling and deployment systems for a growing engineering organization.",
    applicants: 67,
    skills: ["Terraform", "AWS", "Kubernetes", "CI/CD"],
    paymentType: "hourly",
    hourlyRate: "40–65",
    paymentVerified: true,
    location: "Remote · Worldwide",
    experienceLevel: "Professional",
    estimatedTime: "3–6 months",
    hoursPerWeek: "30+ hrs/week",
    rating: 5,
    saved: true,
    fitScore: 82,
    status: "closing-soon",
  },
  {
    id: "saved-004",
    postedAt: "2 days ago",
    title: "Go Backend Developer",
    company: "FinStack",
    companyLogo: "",
    description:
      "Develop high-performance financial APIs and distributed services for our growing fintech platform.",
    applicants: 31,
    skills: ["Go", "Redis", "PostgreSQL", "Microservices"],
    paymentType: "hourly",
    hourlyRate: "25–40",
    paymentVerified: true,
    location: "Remote · Africa",
    experienceLevel: "Intermediate",
    estimatedTime: "1–3 months",
    hoursPerWeek: "Less than 30 hrs/week",
    rating: 4,
    saved: true,
    fitScore: 91,
    status: "open",
  },
  {
    id: "saved-005",
    postedAt: "3 days ago",
    title: "Cloud Infrastructure Engineer",
    company: "ScaleGrid",
    companyLogo: "",
    description:
      "We're looking for an engineer to improve infrastructure automation, observability and reliability across our cloud platform.",
    applicants: 52,
    skills: ["Terraform", "Docker", "Prometheus", "AWS"],
    paymentType: "hourly",
    hourlyRate: "35–50",
    paymentVerified: true,
    location: "Remote · Worldwide",
    experienceLevel: "Intermediate",
    estimatedTime: "1–3 months",
    hoursPerWeek: "Less than 30 hrs/week",
    rating: 5,
    saved: true,
    fitScore: 88,
    status: "open",
  },
  {
    id: "saved-006",
    postedAt: "4 days ago",
    title: "Software Engineer — Infrastructure",
    company: "Orbit",
    companyLogo: "",
    description:
      "Work with our infrastructure and platform teams to build resilient services, internal developer tooling and cloud infrastructure.",
    applicants: 38,
    skills: ["Go", "Kubernetes", "GCP", "Docker"],
    paymentType: "hourly",
    hourlyRate: "32–48",
    paymentVerified: true,
    location: "Remote · Worldwide",
    experienceLevel: "Senior",
    estimatedTime: "3–6 months",
    hoursPerWeek: "30+ hrs/week",
    rating: 5,
    saved: true,
    fitScore: 84,
    status: "open",
  },
];

const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "closing-soon", label: "Closing soon" },
  { key: "closed", label: "Closed" },
];

// ─────────────────────────────────────────────
// Saved Jobs Page
// ─────────────────────────────────────────────

const SavedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(initialSavedJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        query.length === 0 ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.skills?.some((skill) => skill.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const totalSaved = jobs.length;
  const openJobs = jobs.filter((job) => job.status === "open").length;
  const closingSoon = jobs.filter((job) => job.status === "closing-soon").length;
  const excellentMatches = jobs.filter((job) => (job.fitScore ?? 0) >= 90).length;

  const handleOpenJob = (job: Job) => {
    console.log("Open saved job:", job.id);
    // navigate(`/dashboard/talent/jobs/${job.id}`);
  };

  const handleSaveJob = (job: Job) => {
    // On this page, un-bookmarking removes the job from the list.
    setJobs((current) => current.filter((j) => j.id !== job.id));
  };

  const handleLikeJob = (job: Job) => console.log("Liked saved job:", job.id);
  const handleDislikeJob = (job: Job) => console.log("Disliked saved job:", job.id);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const hasActiveFilters = search.trim().length > 0 || statusFilter !== "all";

  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-gray-100 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Bookmark className="h-3.5 w-3.5" />
              <p className="text-xs font-medium uppercase tracking-wide">
                Your job collection
              </p>
            </div>

            <h1 className="mt-2 text-[28px] font-semibold tracking-tight text-gray-950">
              Saved jobs
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Keep track of opportunities you want to come back to. WorkTribe
              analyzes your saved jobs to help you prioritize what's worth
              applying to.
            </p>
          </div>

          <Button
            variant="outline"
            className="group w-fit rounded-full border-gray-200 bg-white px-5 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            onClick={() => console.log("Browse jobs")}
          >
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Browse jobs
            <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Saved jobs" value={totalSaved} description="Total opportunities" />
          <StatCard label="Currently open" value={openJobs} description="Ready for applications" />
          <StatCard
            label="Closing soon"
            value={closingSoon}
            description="Worth reviewing today"
            highlight={closingSoon > 0}
          />
          <StatCard
            label="Excellent matches"
            value={excellentMatches}
            description="90%+ WorkTribe match"
          />
        </div>

        {/* AI insight */}
        {jobs.length > 0 && (
          <Card className="mt-5 overflow-hidden rounded-2xl border-gray-200 bg-white shadow-none">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Your saved jobs are being analyzed
                  </p>
                  <p className="mt-0.5 max-w-xl text-xs leading-5 text-gray-500">
                    WorkTribe compares your skills, experience and the
                    competition on each job to surface what deserves your
                    attention first.
                  </p>
                </div>
              </div>
              <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                AI insights active
              </span>
            </CardContent>
          </Card>
        )}

        {/* Search + filters */}
        <div className="sticky top-0 z-10 mt-7 flex flex-col gap-3 bg-white/90 py-3 backdrop-blur lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search saved jobs, companies, or skills..."
              className="h-11 rounded-full border-gray-200 bg-gray-50/60 pl-11 text-sm shadow-none transition-colors focus-visible:border-gray-900 focus-visible:bg-white focus-visible:ring-0"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto rounded-full bg-gray-50 p-1">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setStatusFilter(filter.key)}
                className={`
                  relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium
                  transition-all duration-200
                  ${
                    statusFilter === filter.key
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-3">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "saved job" : "saved jobs"}
              </p>
              {search && (
                <p className="mt-0.5 text-xs text-gray-400">
                  Showing results for "{search}"
                </p>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="shrink-0 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-in fade-in slide-in-from-bottom-1"
                  style={{ animationDuration: "300ms", animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
                >
                  <JobCard
                    job={job}
                    onOpen={handleOpenJob}
                    onSave={handleSaveJob}
                    onLike={handleLikeJob}
                    onDislike={handleDislikeJob}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              hasFilters={hasActiveFilters}
              onClear={clearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: number;
  description: string;
  highlight?: boolean;
};

const StatCard = ({ label, value, description, highlight = false }: StatCardProps) => (
  <Card className="group rounded-2xl border-gray-200 bg-white shadow-none transition-colors hover:border-gray-900">
    <CardContent className="p-5">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <span className="mt-2 block text-[26px] font-semibold tracking-tight text-gray-950">
        {value}
      </span>
      <p className={`mt-1 text-xs ${highlight ? "font-medium text-amber-600" : "text-gray-500"}`}>
        {description}
      </p>
    </CardContent>
  </Card>
);

// ─────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────

type EmptyStateProps = {
  hasFilters: boolean;
  onClear: () => void;
};

const EmptyState = ({ hasFilters, onClear }: EmptyStateProps) => (
  <Card className="rounded-2xl border-dashed border-gray-200 bg-white shadow-none">
    <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
        <Bookmark className="h-5 w-5 text-gray-400" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        {hasFilters ? "No saved jobs found" : "You haven't saved any jobs yet"}
      </h3>
      <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
        {hasFilters
          ? "Try another search or clear your filters to see more saved opportunities."
          : "Save interesting opportunities while browsing WorkTribe and come back to them later."}
      </p>
      <Button
        variant="outline"
        onClick={onClear}
        className="mt-5 rounded-full border-gray-200 text-xs hover:border-gray-900 hover:bg-gray-900 hover:text-white"
      >
        {hasFilters ? "Clear filters" : "Browse jobs"}
      </Button>
    </CardContent>
  </Card>
);

export default SavedJobs;