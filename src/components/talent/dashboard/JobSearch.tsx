import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const JobSearch = () => {
  return (
    <div className="flex w-full items-center gap-3">
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <Input
          type="search"
          placeholder="Search for jobs, skills, or companies..."
          className="h-12 rounded-xl border-gray-200 bg-white pl-11 pr-4 text-sm shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-900"
        />
      </div>

      {/* Filters */}
      <Button
        variant="outline"
        className="h-12 shrink-0 gap-2 rounded-xl border-gray-200 bg-white px-4 text-sm font-medium shadow-none hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Filters</span>
      </Button>
    </div>
  );
};

export default JobSearch;