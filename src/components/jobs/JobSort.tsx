import { ChevronDown } from "lucide-react";

interface JobSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobSort({
  value,
  onChange,
}: JobSortProps) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-gray-500">
      <span>Sort:</span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="cursor-pointer appearance-none border-0 bg-transparent pr-5 font-medium text-gray-900 outline-none"
      >
        <option value="newest">
          Newest
        </option>

        <option value="relevant">
          Most relevant
        </option>

        <option value="salary">
          Highest paying
        </option>

        <option value="applicants">
          Fewest applicants
        </option>
      </select>

      <ChevronDown className="-ml-5 h-3.5 w-3.5 pointer-events-none text-gray-500" />
    </label>
  );
}