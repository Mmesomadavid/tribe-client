import { useState } from "react";

import {
  Bookmark,
  Clock3,
  MapPin,
  ThumbsDown,
  ThumbsUp,
  Star,
  Users,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Toggle } from "../ui/toggle";

import VerificationIcon from "../../assets/icons/verified-icon.png";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type Job = {
  id: string;
  postedAt?: string;
  title: string;
  company: string;
  companyLogo?: string;
  description?: string;
  applicants?: number;
  skills?: string[];
  paymentType: "hourly" | "fixed";
  hourlyRate?: string;
  fixedPrice?: string;
  paymentVerified?: boolean;
  location?: string;
  experienceLevel?: string;
  estimatedTime?: string;
  hoursPerWeek?: string;
  rating?: number;
  saved?: boolean;
  fitScore?: number;
  status?: "open" | "closing-soon" | "closed";
};

type JobCardProps = {
  job: Job;
  onOpen?: (job: Job) => void;
  onSave?: (job: Job) => void;
  onLike?: (job: Job) => void;
  onDislike?: (job: Job) => void;
};

// ─────────────────────────────────────────────
// Small helper: circular match-score ring
// ─────────────────────────────────────────────

const MatchRing = ({ score }: { score: number }) => {
  const clamped = Math.min(Math.max(score, 0), 100);
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
      <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-gray-100"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-gray-900 transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-semibold text-gray-900">
        {clamped}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const JobCard = ({ job, onOpen, onSave, onLike, onDislike }: JobCardProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const title = job.title || "Untitled job";
  const company = job.company || "Company";
  const description = job.description || "";
  const skills = Array.isArray(job.skills) ? job.skills : [];
  const postedAt = job.postedAt || "Recently";
  const applicants = job.applicants ?? 0;
  const location = job.location || "Remote";
  const experienceLevel = job.experienceLevel || "Not specified";
  const estimatedTime = job.estimatedTime || "Not specified";
  const rating = Math.min(Math.max(job.rating ?? 0, 0), 5);
  const companyInitial = company.charAt(0).toUpperCase();
  const isLongDescription = description.length > 220;
  const isClosed = job.status === "closed";

  const paymentLabel =
    job.paymentType === "hourly"
      ? job.hourlyRate
        ? `$${job.hourlyRate.replace(/^\$/, "")}/hr`
        : "Hourly"
      : job.fixedPrice
        ? `${job.fixedPrice.replace(/^\$/, "$")} fixed`
        : "Fixed price";

  const ratingLabel =
    rating >= 4.5 ? "Excellent" : rating >= 3.5 ? "Good" : "Average";

  const handleCardClick = () => onOpen?.(job);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        group relative h-full cursor-pointer overflow-hidden rounded-2xl
        border border-gray-200 bg-white shadow-none
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:border-gray-900 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]
        ${isPressed ? "scale-[0.99]" : ""}
        ${isClosed ? "opacity-70" : ""}
      `}
    >
      <CardContent className="flex h-full flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                overflow-hidden rounded-xl bg-gray-900 text-sm font-semibold text-white
              "
            >
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={company}
                  className="h-full w-full object-contain"
                />
              ) : (
                companyInitial
              )}
            </div>

            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                {postedAt}
              </p>
              <h3 className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-gray-900">
                {title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-gray-500">
                {company}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(event) => event.stopPropagation()}
          >
            {job.fitScore !== undefined && <MatchRing score={job.fitScore} />}

            <div className="mx-0.5 h-6 w-px bg-gray-100" />

            <Toggle
              aria-label="Like job"
              onPressedChange={() => onLike?.(job)}
              className="h-8 w-8 rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Toggle>

            <Toggle
              aria-label="Dislike job"
              onPressedChange={() => onDislike?.(job)}
              className="h-8 w-8 rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Toggle>

            <Toggle
              pressed={job.saved === true}
              aria-label={job.saved ? "Remove saved job" : "Save job"}
              onPressedChange={() => onSave?.(job)}
              className="h-8 w-8 rounded-full text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white active:scale-90"
            >
              <Bookmark
                className={job.saved ? "h-3.5 w-3.5 fill-current" : "h-3.5 w-3.5"}
              />
            </Toggle>
          </div>
        </div>

        {/* Status */}
        {job.status === "closing-soon" && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amber-500" />
            </span>
            <span className="text-[11px] font-medium text-amber-700">
              Closing soon
            </span>
          </div>
        )}

        {isClosed && (
          <div className="mt-3">
            <Badge className="rounded-full border border-gray-200 bg-gray-50 text-[10px] font-medium text-gray-500 hover:bg-gray-50">
              No longer accepting applications
            </Badge>
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="relative mt-3">
            <p
              className={`text-[13px] leading-5 text-gray-500 ${
                isLongDescription ? "line-clamp-3" : ""
              }`}
            >
              {description}
            </p>
          </div>
        )}

        {/* Primary metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
          <span className="font-semibold text-gray-900">{paymentLabel}</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-600">{experienceLevel}</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-500">Est. {estimatedTime}</span>
        </div>

        {/* Secondary metadata */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-gray-500">
          {job.hoursPerWeek && (
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {job.hoursPerWeek}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {applicants} applicants
          </span>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full border border-gray-200 px-2.5 py-1 text-[10.5px] font-medium text-gray-600 transition-colors group-hover:border-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3.5 mt-4">
          <div className="flex items-center gap-3">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-3 w-3 ${
                        index < rating
                          ? "fill-gray-900 text-gray-900"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-gray-600">
                  {ratingLabel}
                </span>
              </div>
            )}

            {job.paymentVerified && (
              <div className="flex items-center gap-1.5">
                <img
                  src={VerificationIcon}
                  alt=""
                  className="h-3.5 w-3.5 object-contain"
                />
                <span className="text-[11px] font-medium text-gray-500">
                  Verified
                </span>
              </div>
            )}
          </div>

          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-900 group-hover:opacity-100">
            View details
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;