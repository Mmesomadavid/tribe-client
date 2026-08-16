import {
  ChevronDown,
  RotateCcw,
} from "lucide-react";

import JobFilterSection from "./JobFilterSection";

export interface JobFilterState {
  categories: string[];
  experience: string[];
  jobTypes: string[];
  remoteOnly: boolean;
  salaryMin: string;
  salaryMax: string;
}

interface JobFiltersProps {
  filters: JobFilterState;
  onChange: (
    filters: JobFilterState
  ) => void;
}

const experienceLevels = [
  "Entry level",
  "Intermediate",
  "Expert",
];

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

export default function JobFilters({
  filters,
  onChange,
}: JobFiltersProps) {
  const toggleArrayValue = (
    key: "experience" | "jobTypes",
    value: string
  ) => {
    const current = filters[key];

    const next = current.includes(value)
      ? current.filter(
          (item) => item !== value
        )
      : [...current, value];

    onChange({
      ...filters,
      [key]: next,
    });
  };

  const resetFilters = () => {
    onChange({
      categories: [],
      experience: [],
      jobTypes: [],
      remoteOnly: false,
      salaryMin: "",
      salaryMax: "",
    });
  };

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-950">
          Filter
        </h2>

        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <JobFilterSection title="Categories">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 px-3 text-left text-xs text-gray-500 transition-colors hover:border-gray-300"
        >
          <span>
            {filters.categories.length
              ? filters.categories.join(", ")
              : "Select categories"}
          </span>

          <ChevronDown className="h-4 w-4" />
        </button>
      </JobFilterSection>

      <JobFilterSection title="Experience level">
        <div className="space-y-3">
          {experienceLevels.map(
            (level) => (
              <label
                key={level}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={filters.experience.includes(
                    level
                  )}
                  onChange={() =>
                    toggleArrayValue(
                      "experience",
                      level
                    )
                  }
                  className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span>{level}</span>
              </label>
            )
          )}
        </div>
      </JobFilterSection>

      <JobFilterSection title="Job type">
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-600"
            >
              <input
                type="checkbox"
                checked={filters.jobTypes.includes(
                  type
                )}
                onChange={() =>
                  toggleArrayValue(
                    "jobTypes",
                    type
                  )
                }
                className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span>{type}</span>
            </label>
          ))}
        </div>
      </JobFilterSection>

      <JobFilterSection title="Location">
        <label className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={filters.remoteOnly}
            onChange={(event) =>
              onChange({
                ...filters,
                remoteOnly:
                  event.target.checked,
              })
            }
            className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />

          <span>Remote only</span>
        </label>
      </JobFilterSection>

      <JobFilterSection title="Price range">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.salaryMin}
            onChange={(event) =>
              onChange({
                ...filters,
                salaryMin:
                  event.target.value,
              })
            }
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none placeholder:text-gray-400 focus:border-gray-400"
          />

          <input
            type="number"
            placeholder="Max"
            value={filters.salaryMax}
            onChange={(event) =>
              onChange({
                ...filters,
                salaryMax:
                  event.target.value,
              })
            }
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>
      </JobFilterSection>
    </aside>
  );
}