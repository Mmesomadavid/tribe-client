import { ChevronDown } from "lucide-react";

import { Button } from "../../../components/ui/button";

const filters = [
  "Job type",
  "Experience level",
  "Salary",
  "Location",
  "Skills",
];

const JobFilter = () => {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant="outline"
          className="h-9 shrink-0 gap-2 rounded-full border-gray-200 bg-white px-3.5 text-xs font-medium text-gray-700 shadow-none hover:bg-gray-50 hover:text-gray-900"
        >
          {filter}

          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </Button>
      ))}

      <Button
        variant="ghost"
        className="h-9 shrink-0 rounded-full px-3 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      >
        Clear all
      </Button>
    </div>
  );
};

export default JobFilter;