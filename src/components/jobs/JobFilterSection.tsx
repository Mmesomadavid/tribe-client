import type { ReactNode } from "react";

interface JobFilterSectionProps {
  title: string;
  children: ReactNode;
}

export default function JobFilterSection({
  title,
  children,
}: JobFilterSectionProps) {
  return (
    <section className="border-b border-gray-100 py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-xs font-semibold text-gray-900">
        {title}
      </h3>

      {children}
    </section>
  );
}