"use client";

interface CompanyReviewCardProps {
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  website?: string;
  description?: string;
}

const CompanyReviewCard = ({
  companyName,
  industry,
  companySize,
  location,
  website,
  description,
}: CompanyReviewCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[15px] font-semibold text-gray-950">
              {companyName || "Your company"}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {industry || "Industry"} · {companySize || "Company size"}
            </p>
          </div>

          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
            {companyName
              ? companyName
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
              : "CO"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider font-medium text-gray-400">
            Location
          </p>

          <p className="text-sm font-medium text-gray-800 mt-1">
            {location || "Not provided"}
          </p>
        </div>

        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider font-medium text-gray-400">
            Website
          </p>

          <p className="text-sm font-medium text-gray-800 mt-1 truncate">
            {website || "Not provided"}
          </p>
        </div>
      </div>

      {description && (
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider font-medium text-gray-400 mb-1">
            About
          </p>

          <p className="text-xs leading-relaxed text-gray-500">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyReviewCard;