import {
  MapPin,
  Search,
  X,
} from "lucide-react";

interface JobSearchBarProps {
  query: string;
  location: string;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
}

export default function JobSearchBar({
  query,
  location,
  onQueryChange,
  onLocationChange,
  onSearch,
}: JobSearchBarProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_15px_50px_rgba(0,0,0,0.08)] sm:flex-row">
      {/* Search */}
      <div className="flex h-12 flex-1 items-center gap-3 rounded-xl px-3">
        <Search className="h-5 w-5 shrink-0 text-gray-500" />

        <input
          value={query}
          onChange={(event) =>
            onQueryChange(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="Job title, skills or keywords"
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="text-gray-400 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="hidden h-8 self-center border-l border-gray-200 sm:block" />

      {/* Location */}
      <div className="flex h-12 flex-1 items-center gap-3 rounded-xl px-3">
        <MapPin className="h-5 w-5 shrink-0 text-gray-500" />

        <input
          value={location}
          onChange={(event) =>
            onLocationChange(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="Country or timezone"
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="h-12 rounded-xl bg-gray-950 px-7 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Search
      </button>
    </div>
  );
}