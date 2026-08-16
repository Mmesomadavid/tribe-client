import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import type { Job } from "../../types/jobs";

interface RecommendedJobsProps {
  jobs: Job[];
}

export default function RecommendedJobs({
  jobs,
}: RecommendedJobsProps) {
  const recommended = jobs
    .filter(
      (job) =>
        typeof job.matchScore === "number"
    )
    .sort(
      (a, b) =>
        (b.matchScore ?? 0) -
        (a.matchScore ?? 0)
    )
    .slice(0, 3);

  if (!recommended.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />

          <h2 className="text-sm font-semibold text-gray-950">
            Recommended for you
          </h2>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Roles that match your skills and career
          profile.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {recommended.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-950">
                  {job.title}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {job.company.name}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600">
                {job.matchScore}% match
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.skills
                .slice(0, 3)
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-gray-50 px-2 py-1 text-[10px] text-gray-500"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}