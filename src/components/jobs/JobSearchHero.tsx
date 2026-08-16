import JobSearchBar from "./JobSearchBar";

interface JobSearchHeroProps {
  query: string;
  location: string;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
}

export default function JobSearchHero({
  query,
  location,
  onQueryChange,
  onLocationChange,
  onSearch,
}: JobSearchHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 px-5 py-14 sm:px-10 sm:py-16">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-100px] left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium text-gray-500">
          WorkTribe Jobs
        </span>

        <h1 className="text-4xl font-bold tracking-[-0.04em] text-gray-950 sm:text-5xl">
          Find work that
          <br />
          moves you forward.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-[15px]">
          Discover opportunities from companies
          around the world and find roles matched
          to your skills, experience and career goals.
        </p>

        <div className="mt-8">
          <JobSearchBar
            query={query}
            location={location}
            onQueryChange={onQueryChange}
            onLocationChange={onLocationChange}
            onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  );
}