import {
  Award,
  Briefcase,
  Check,
  FolderKanban,
  GraduationCap,
  Languages as LanguagesIcon,
  Loader2,
  Sparkles,
  User,
  AlertCircle,
} from "lucide-react";
import { RESUME_SECTIONS, type ResumeSectionId } from "../../../types/resumeTypes";
import type { SaveStatus } from "../../../hooks/useResumeBuilder";

const ICONS: Record<ResumeSectionId, React.ComponentType<{ className?: string }>> = {
  personal: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Sparkles,
  projects: FolderKanban,
  certifications: Award,
  languages: LanguagesIcon,
};

export function ResumeSidebar({
  active,
  onSelect,
  saveStatus,
}: {
  active: ResumeSectionId;
  onSelect: (id: ResumeSectionId) => void;
  saveStatus: SaveStatus;
}) {
  return (
    <nav className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-card">
      <div className="px-4 pb-2 pt-5">
        <h1 className="text-base font-semibold tracking-tight text-foreground">Resume Builder</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Build once, tailor for every role.</p>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-2">
        {RESUME_SECTIONS.map((section) => {
          const Icon = ICONS[section.id];
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onSelect(section.id)}
                aria-current={isActive}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border px-4 py-3">
        <SaveIndicator status={saveStatus} />
      </div>
    </nav>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;

  const config: Record<Exclude<SaveStatus, "idle">, { label: string; icon: React.ReactNode; className: string }> = {
    saving: { label: "Saving…", icon: <Loader2 className="size-3.5 animate-spin" />, className: "text-muted-foreground" },
    saved: { label: "All changes saved", icon: <Check className="size-3.5" />, className: "text-muted-foreground" },
    error: { label: "Couldn't save — retrying", icon: <AlertCircle className="size-3.5" />, className: "text-destructive" },
  };

  const { label, icon, className } = config[status];

  return (
    <div className={`flex items-center gap-1.5 text-xs ${className}`}>
      {icon}
      {label}
    </div>
  );
}