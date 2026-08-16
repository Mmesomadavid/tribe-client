import JobCard from "./JobCard";

const JobFeed = () => {
  const jobs = [
    {
      id: "1",
      title: "Senior Backend Engineer",
      // ...
    },
    {
      id: "2",
      title: "Go Backend Developer",
      // ...
    },
    {
      id: "3",
      title: "Python API Engineer",
      // ...
    },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Recommended jobs
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Jobs matched to your skills and preferences.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>
    </section>
  );
};

export default JobFeed;