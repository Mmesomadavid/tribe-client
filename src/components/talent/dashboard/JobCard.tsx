import { useState } from "react";

import {
  ArrowUpRight,
  Bookmark,
  Clock3,
  MapPin,
  ThumbsDown,
  ThumbsUp,
  Star,
  Users,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Toggle } from "../../../components/ui/toggle";

import VerificationIcon from "../../../assets/icons/verified-icon.png";

const JobCard = () => {
  const [isPressed, setIsPressed] = useState(false);

  const job = {
    postedAt: "2 hours ago",
    title: "Senior Backend Engineer",
    description:
      "We're looking for an experienced backend engineer to help us build reliable, scalable services and APIs. You'll work closely with product and infrastructure teams to design systems that serve millions of users. You will collaborate with product managers, frontend engineers, infrastructure teams, and other backend engineers to design distributed systems and improve application performance.",
    applicants: 18,
    skills: ["Go", "Python", "PostgreSQL", "Docker", "Kubernetes"],
    paymentType: "hourly",
    hourlyRate: "15–30",
    paymentVerified: true,
    location: "Remote · Worldwide",
    experienceLevel: "Intermediate",
    estimatedTime: "Less than 1 month",
    hoursPerWeek: "Less than 30 hrs/week",
    rating: 5,
  };

  const isLongDescription = job.description.length > 220;
  const ratingLabel =
    job.rating >= 4.5 ? "Excellent" : job.rating >= 3.5 ? "Good" : "Average";

  const handleCardClick = () => {
    console.log("Open job:", job.title);
  };

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
        group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-none
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:border-gray-900 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]
        ${isPressed ? "scale-[0.99]" : ""}
      `}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              {job.postedAt}
            </p>

            <h3 className="mt-1 text-[15px] font-semibold leading-snug tracking-tight text-gray-900">
              {job.title}
            </h3>
          </div>

          {/* Actions */}
          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(event) => event.stopPropagation()}
          >
            <Toggle
              aria-label="Like job"
              className="h-8 w-8 rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Toggle>

            <Toggle
              aria-label="Dislike job"
              className="h-8 w-8 rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Toggle>

            <Toggle
              aria-label="Bookmark job"
              className="h-8 w-8 rounded-full text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-900 data-[state=on]:text-white active:scale-90"
            >
              <Bookmark className="h-3.5 w-3.5" />
            </Toggle>
          </div>
        </div>

        {/* Description */}
        <div className="relative mt-3">
          <p
            className={`text-[13px] leading-5 text-gray-500 ${
              isLongDescription ? "line-clamp-3" : ""
            }`}
          >
            {job.description}
          </p>

          {isLongDescription && (
            <div className="absolute bottom-0 left-0 right-0 flex h-14 items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-0.5">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCardClick();
                }}
                className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-900 hover:text-gray-900"
              >
                View job details
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Primary metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
          <span className="font-semibold text-gray-900">
            ${job.hourlyRate}/hr
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-600">{job.experienceLevel}</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-500">Est. {job.estimatedTime}</span>
        </div>

        {/* Secondary metadata */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {job.hoursPerWeek}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {job.applicants} applicants
          </span>
        </div>

        {/* Skills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-gray-200 px-2.5 py-1 text-[10.5px] font-medium text-gray-600 transition-colors group-hover:border-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3.5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3 w-3 ${
                      index < job.rating
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