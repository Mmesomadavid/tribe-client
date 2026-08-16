import type { ResumeData } from "../../../types/resumeTypes";

function formatRange(start: string, end: string, current?: boolean) {
  const fmt = (v: string) => {
    if (!v) return "";
    const [y, m] = v.split("-");
    const date = new Date(Number(y), Number(m) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  const startLabel = fmt(start);
  const endLabel = current ? "Present" : fmt(end);
  if (!startLabel && !endLabel) return "";
  return `${startLabel} — ${endLabel}`;
}

export function ResumePreview({ data }: { data: ResumeData }) {
  const { personalInfo: p } = data;
  const hasContactLine = [p.email, p.phone, p.location, p.website, p.linkedin].some(Boolean);

  return (
    <div className="mx-auto w-full max-w-[720px]">
      {/* Print styles: only the preview page prints, at letter size. */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview-page, #resume-preview-page * { visibility: visible; }
          #resume-preview-page {
            position: absolute; inset: 0; margin: 0; box-shadow: none; border: none;
            width: 8.5in; min-height: 11in; padding: 0.6in;
          }
        }
      `}</style>

      <div
        id="resume-preview-page"
        className="min-h-[960px] rounded-lg border border-border bg-white px-10 py-10 text-[#1a1a1a] shadow-sm"
      >
        {/* Header */}
        <header className="mb-6 border-b border-neutral-200 pb-5">
          <h1 className="text-3xl font-bold tracking-tight">
            {p.fullName || "Your Name"}
          </h1>
          {p.title && <p className="mt-1 text-base text-neutral-600">{p.title}</p>}
          {hasContactLine && (
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
              {[p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).map((item, i) => (
                <span key={i} className="flex items-center gap-3">
                  {i > 0 && <span className="text-neutral-300">•</span>}
                  {item}
                </span>
              ))}
            </p>
          )}
        </header>

        {p.summary && (
          <PreviewSection title="Summary">
            <p className="text-sm leading-relaxed text-neutral-700">{p.summary}</p>
          </PreviewSection>
        )}

        {data.experience.length > 0 && (
          <PreviewSection title="Experience">
            <div className="flex flex-col gap-4">
              {data.experience.map((entry) => (
                <div key={entry.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold">{entry.role || "Role"}</span>
                    <span className="shrink-0 text-xs text-neutral-500">
                      {formatRange(entry.startDate, entry.endDate, entry.current)}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {[entry.company, entry.location].filter(Boolean).join(" · ")}
                  </div>
                  {entry.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-700">
                      {entry.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </PreviewSection>
        )}

        {data.education.length > 0 && (
          <PreviewSection title="Education">
            <div className="flex flex-col gap-3">
              {data.education.map((entry) => (
                <div key={entry.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold">{entry.school || "School"}</span>
                    <span className="shrink-0 text-xs text-neutral-500">
                      {formatRange(entry.startDate, entry.endDate)}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {[entry.degree, entry.field].filter(Boolean).join(", ")}
                    {entry.gpa && ` · GPA ${entry.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </PreviewSection>
        )}

        {data.skills.length > 0 && (
          <PreviewSection title="Skills">
            <div className="flex flex-col gap-1.5">
              {data.skills.map((group) => (
                <div key={group.id} className="text-sm leading-relaxed">
                  {group.category && <span className="font-semibold">{group.category}: </span>}
                  <span className="text-neutral-700">{group.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </PreviewSection>
        )}

        {data.projects.length > 0 && (
          <PreviewSection title="Projects">
            <div className="flex flex-col gap-4">
              {data.projects.map((entry) => (
                <div key={entry.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold">{entry.name || "Project"}</span>
                    {entry.link && <span className="shrink-0 text-xs text-neutral-500">{entry.link}</span>}
                  </div>
                  {entry.description && (
                    <p className="text-sm leading-relaxed text-neutral-700">{entry.description}</p>
                  )}
                  {entry.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-700">
                      {entry.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </PreviewSection>
        )}

        {data.certifications.length > 0 && (
          <PreviewSection title="Certifications">
            <div className="flex flex-col gap-2">
              {data.certifications.map((entry) => (
                <div key={entry.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span>
                    <span className="font-semibold">{entry.name || "Certification"}</span>
                    {entry.issuer && <span className="text-neutral-500"> · {entry.issuer}</span>}
                  </span>
                  {entry.date && <span className="shrink-0 text-xs text-neutral-500">{entry.date}</span>}
                </div>
              ))}
            </div>
          </PreviewSection>
        )}

        {data.languages.length > 0 && (
          <PreviewSection title="Languages">
            <p className="text-sm leading-relaxed text-neutral-700">
              {data.languages.map((l) => `${l.name} (${l.proficiency})`).join("  ·  ")}
            </p>
          </PreviewSection>
        )}
      </div>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">{title}</h2>
      {children}
    </section>
  );
}