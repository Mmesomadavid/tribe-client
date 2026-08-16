import type { Job } from "../../types/jobs";
import JobCard from "./JobCard";
import JobSort from "./JobSort";

interface JobResultsProps {
  jobs: Job[];
  total: number;
  sort: string;
  onSortChange: (value: string) => void;
}

export default function JobResults({
  jobs,
  total,
  sort,
  onSortChange,
}: JobResultsProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-950">
          Showing {total.toLocaleString()}{" "}
          results
        </p>

        <JobSort
          value={sort}
          onChange={onSortChange}
        />
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center">
          <p className="text-sm font-medium text-gray-900">
            No jobs found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      )}
    </section>
  );
}