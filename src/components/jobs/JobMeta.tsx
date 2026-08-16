import {
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";

interface JobMetaProps {
  company: string;
  verified?: boolean;
  location: string;
  applicants?: number;
}

export default function JobMeta({
  company,
  verified,
  location,
  applicants,
}: JobMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
      <span className="font-medium text-gray-700">
        {company}
      </span>

      {verified && (
        <>
          <span className="text-gray-300">•</span>

          <span className="inline-flex items-center gap-1 text-gray-600">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
            Payment verified
          </span>
        </>
      )}

      <span className="text-gray-300">•</span>

      <span className="inline-flex items-center gap-1">
        <MapPin className="h-3.5 w-3.5" />
        {location}
      </span>

      {typeof applicants === "number" && (
        <>
          <span className="text-gray-300">•</span>

          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5">
            <Users className="h-3 w-3" />
            {applicants} applicants
          </span>
        </>
      )}
    </div>
  );
}