"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import Chip from "../../components/onboarding/talent/Chip";
import TagInput from "../../components/onboarding/talent/TagInput";
import AvatarUpload from "../../components/onboarding/talent/AvatarUpload";
import OnboardingShell from "../../components/onboarding/talent/OnboardingShell";
import { apiFetch, ApiError } from "../../lib/api";
import { useAuth } from "../../contexts/Authcontext";
import { dashboardPathFor } from "../../lib/routing";

// ─── Static option sets ────────────────────────────────────────────────────

const CATEGORIES = [
  "Software Engineering",
  "Product",
  "Design",
  "Data & Analytics",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Customer Support",
  "Human Resources",
  "Other",
];

const EMPLOYMENT_STATUS = ["Employed", "Unemployed", "Freelancing", "Student", "Open to opportunities"];

const YEARS_OPTIONS = ["0", "1-2", "3-5", "6-10", "10+"];
const YEARS_MAP: Record<string, number> = { "0": 0, "1-2": 1, "3-5": 4, "6-10": 8, "10+": 12 };

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry" },
  { value: "junior", label: "Junior" },
  { value: "intermediate", label: "Intermediate" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
];

const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
];

const WORK_ARRANGEMENTS = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on-site", label: "On-site" },
];

const POPULAR_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "Go",
  "MongoDB", "PostgreSQL", "MySQL", "Docker", "Kubernetes", "AWS", "GCP",
  "Azure", "Git", "GraphQL", "REST APIs", "Figma", "UI/UX Design",
  "Product Management", "Data Analysis", "SQL", "Communication", "Leadership",
];

const COUNTRIES = [
  "Nigeria", "United States", "United Kingdom", "Canada", "Germany", "France",
  "India", "South Africa", "Kenya", "Ghana", "United Arab Emirates", "Australia",
  "Remote / Global",
];

const TIMEZONES = [
  "UTC-8 (PST)", "UTC-5 (EST)", "UTC+0 (GMT)", "UTC+1 (CET)", "UTC+2 (WAT/SAST)",
  "UTC+3 (EAT)", "UTC+4 (GST)", "UTC+5:30 (IST)", "UTC+8 (SGT/CST)", "UTC+9 (JST)",
  "UTC+10 (AEST)",
];

const CURRENCIES = ["USD", "EUR", "GBP", "NGN", "GHS", "KES", "ZAR", "CAD", "AUD", "INR"];

const STEP_META = [
  { title: "Let's start with the basics", subtitle: "Tell us who you are so WorkTribe can personalize your experience." },
  { title: "What do you do?", subtitle: "This is how recruiters and our AI matching understand your professional identity." },
  { title: "What are your strongest skills?", subtitle: "Add at least 3 skills — you can fine-tune these anytime from your profile." },
  { title: "What are you looking for?", subtitle: "This powers WorkTribe's SmartMatch AI and job recommendations." },
  { title: "Add your resume", subtitle: "Upload an existing resume or build one with AI — or do this later from your dashboard." },
];

// ─── State shape ────────────────────────────────────────────────────────────

interface OnboardingState {
  avatar: string | null;
  name: string;
  country: string;
  location: string;
  timezone: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  otherLink: string;

  headline: string;
  currentTitle: string;
  yearsBucket: string;
  experienceLevel: string;
  category: string;
  employmentStatus: string;

  skills: string[];

  desiredTitles: string[];
  desiredIndustries: string[];
  employmentTypes: string[];
  workPreference: string;
  preferredLocations: string[];
  openToRelocate: boolean;
  preferredTimezone: string;
  availableFrom: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;

  resumeChoice: "upload" | "ai" | null;
}

const inputClass =
  "h-11 rounded-xl border-gray-200 bg-gray-50/60 text-sm placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:border-gray-900 transition-all";
const selectClass =
  "h-11 w-full rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 px-3 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider">{label}</Label>
    {children}
  </div>
);

// ─── Component ──────────────────────────────────────────────────────────────

const TalentOnboarding = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [state, setState] = useState<OnboardingState>({
    avatar: null,
    name: user?.name || "",
    country: "",
    location: "",
    timezone: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    otherLink: "",

    headline: "",
    currentTitle: "",
    yearsBucket: "",
    experienceLevel: "",
    category: "",
    employmentStatus: "",

    skills: [],

    desiredTitles: [],
    desiredIndustries: [],
    employmentTypes: [],
    workPreference: "",
    preferredLocations: [],
    openToRelocate: false,
    preferredTimezone: "",
    availableFrom: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",

    resumeChoice: null,
  });

  const update = <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const toggleInArray = (key: "employmentTypes", value: string) => {
    const current = state[key];
    update(key, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  // ── Per-step save calls ──

  const saveIdentity = () =>
    apiFetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({
        name: state.name,
        phone: state.phone || undefined,
        location: state.location,
        country: state.country,
        timezone: state.timezone,
        website: state.website || undefined,
        linkedin: state.linkedin || undefined,
        github: state.github || undefined,
        otherSocialLinks: state.otherLink ? [{ label: "Portfolio", url: state.otherLink }] : [],
      }),
    });

  const saveProfessional = () =>
    apiFetch("/api/talent/profile", {
      method: "PUT",
      body: JSON.stringify({
        headline: state.headline,
        currentTitle: state.currentTitle,
        category: state.category,
        yearsOfExperience: YEARS_MAP[state.yearsBucket] ?? 0,
        experienceLevel: state.experienceLevel,
        employmentStatus: state.employmentStatus,
      }),
    });

  const saveSkills = () =>
    apiFetch("/api/talent/profile", {
      method: "PUT",
      body: JSON.stringify({
        skills: state.skills.map((name) => ({ name, category: "technical", proficiency: "intermediate" })),
      }),
    });

  const savePreferences = () =>
    apiFetch("/api/talent/preferences", {
      method: "PUT",
      body: JSON.stringify({
        desiredTitles: state.desiredTitles,
        desiredIndustries: state.desiredIndustries,
        employmentTypes: state.employmentTypes,
        workPreference: state.workPreference,
        preferredLocations: state.preferredLocations,
        openToRelocate: state.openToRelocate,
        preferredTimezone: state.preferredTimezone,
        availableFrom: state.availableFrom || undefined,
        salary:
          state.salaryMin || state.salaryMax
            ? {
                min: state.salaryMin ? Number(state.salaryMin) : undefined,
                max: state.salaryMax ? Number(state.salaryMax) : undefined,
                currency: state.currency,
              }
            : undefined,
      }),
    });

  const finishOnboarding = async () => {
  const data = await apiFetch<{ user: any }>(
    "/api/talent/onboarding/complete",
    { method: "POST" }
  );

  updateUser(data.user);
  navigate(dashboardPathFor(data.user.role), { replace: true });
};

  const handleContinue = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      if (stepIndex === 0) await saveIdentity();
      if (stepIndex === 1) await saveProfessional();
      if (stepIndex === 2) await saveSkills();
      if (stepIndex === 3) await savePreferences();

      if (stepIndex === STEP_META.length - 1) {
        await finishOnboarding();
        return;
      }

      setStepIndex((i) => i + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipResume = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await finishOnboarding();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const isStepValid = () => {
    switch (stepIndex) {
      case 0:
        return !!(state.name && state.country && state.location);
      case 1:
        return !!(
          state.headline &&
          state.currentTitle &&
          state.yearsBucket &&
          state.experienceLevel &&
          state.category &&
          state.employmentStatus
        );
      case 2:
        return state.skills.length >= 3;
      case 3:
        return (
          state.desiredTitles.length > 0 &&
          state.employmentTypes.length > 0 &&
          !!state.workPreference &&
          state.preferredLocations.length > 0
        );
      default:
        return true;
    }
  };

  // ── Step content ──

  const renderStep = () => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="space-y-5">
            <AvatarUpload value={state.avatar} onChange={(url) => update("avatar", url)} />

            <Field label="Full name">
              <Input
                value={state.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Country">
                <select
                  value={state.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="City / location">
                <Input
                  value={state.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Lagos, Nigeria"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Timezone">
              <select
                value={state.timezone}
                onChange={(e) => update("timezone", e.target.value)}
                className={selectClass}
              >
                <option value="" disabled>
                  Select timezone
                </option>
                {TIMEZONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-3">Optional</p>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={state.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Phone number"
                  className={inputClass}
                />
                <Input
                  value={state.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="Personal website"
                  className={inputClass}
                />
                <Input
                  value={state.linkedin}
                  onChange={(e) => update("linkedin", e.target.value)}
                  placeholder="LinkedIn URL"
                  className={inputClass}
                />
                <Input
                  value={state.github}
                  onChange={(e) => update("github", e.target.value)}
                  placeholder="GitHub URL"
                  className={inputClass}
                />
              </div>
              <Input
                value={state.otherLink}
                onChange={(e) => update("otherLink", e.target.value)}
                placeholder="Other portfolio / social link"
                className={`${inputClass} mt-4`}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <Field label="Professional headline">
              <Input
                value={state.headline}
                onChange={(e) => update("headline", e.target.value)}
                placeholder="Backend Software Engineer | Node.js & Go"
                className={inputClass}
              />
            </Field>
            <Field label="Current / primary job title">
              <Input
                value={state.currentTitle}
                onChange={(e) => update("currentTitle", e.target.value)}
                placeholder="Software Engineer"
                className={inputClass}
              />
            </Field>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Years of experience
              </Label>
              <div className="flex flex-wrap gap-2">
                {YEARS_OPTIONS.map((y) => (
                  <Chip key={y} label={y} selected={state.yearsBucket === y} onClick={() => update("yearsBucket", y)} />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Experience level
              </Label>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_LEVELS.map((l) => (
                  <Chip
                    key={l.value}
                    label={l.label}
                    selected={state.experienceLevel === l.value}
                    onClick={() => update("experienceLevel", l.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Professional category
              </Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Chip key={c} label={c} selected={state.category === c} onClick={() => update("category", c)} />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Employment status
              </Label>
              <div className="flex flex-wrap gap-2">
                {EMPLOYMENT_STATUS.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    selected={state.employmentStatus === s}
                    onClick={() => update("employmentStatus", s)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Add your skills
              </Label>
              <TagInput
                values={state.skills}
                onChange={(v) => update("skills", v)}
                placeholder="Type a skill and press Enter"
                suggestions={POPULAR_SKILLS}
              />
              <p className={`text-[11px] mt-2 ${state.skills.length >= 3 ? "text-emerald-600" : "text-gray-400"}`}>
                {state.skills.length}/3 skills added{state.skills.length >= 3 ? " — nice!" : " minimum"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2">Popular skills</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SKILLS.filter((s) => !state.skills.includes(s))
                  .slice(0, 14)
                  .map((s) => (
                    <Chip key={s} label={s} selected={false} onClick={() => update("skills", [...state.skills, s])} />
                  ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <Field label="Desired job titles">
              <TagInput
                values={state.desiredTitles}
                onChange={(v) => update("desiredTitles", v)}
                placeholder="e.g. Backend Engineer"
              />
            </Field>
            <Field label="Desired industries (optional)">
              <TagInput
                values={state.desiredIndustries}
                onChange={(v) => update("desiredIndustries", v)}
                placeholder="e.g. Fintech, Healthtech"
              />
            </Field>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Employment type
              </Label>
              <div className="flex flex-wrap gap-2">
                {EMPLOYMENT_TYPES.map((t) => (
                  <Chip
                    key={t.value}
                    label={t.label}
                    selected={state.employmentTypes.includes(t.value)}
                    onClick={() => toggleInArray("employmentTypes", t.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Work arrangement
              </Label>
              <div className="flex flex-wrap gap-2">
                {WORK_ARRANGEMENTS.map((w) => (
                  <Chip
                    key={w.value}
                    label={w.label}
                    selected={state.workPreference === w.value}
                    onClick={() => update("workPreference", w.value)}
                  />
                ))}
              </div>
            </div>

            <Field label="Preferred locations">
              <TagInput
                values={state.preferredLocations}
                onChange={(v) => update("preferredLocations", v)}
                placeholder="e.g. Lagos, Remote, Berlin"
              />
            </Field>

            <div className="flex items-center gap-2">
              <Checkbox
                id="relocate"
                checked={state.openToRelocate}
                onCheckedChange={(v) => update("openToRelocate", !!v)}
                className="rounded-md border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
              />
              <Label htmlFor="relocate" className="text-xs text-gray-800 cursor-pointer">
                I'm open to relocating
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Preferred timezone">
                <select
                  value={state.preferredTimezone}
                  onChange={(e) => update("preferredTimezone", e.target.value)}
                  className={selectClass}
                >
                  <option value="">No preference</option>
                  {TIMEZONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Available from">
                <Input
                  type="date"
                  value={state.availableFrom}
                  onChange={(e) => update("availableFrom", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 block">
                Expected compensation (optional)
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  type="number"
                  value={state.salaryMin}
                  onChange={(e) => update("salaryMin", e.target.value)}
                  placeholder="Min"
                  className={inputClass}
                />
                <Input
                  type="number"
                  value={state.salaryMax}
                  onChange={(e) => update("salaryMax", e.target.value)}
                  placeholder="Max"
                  className={inputClass}
                />
                <select value={state.currency} onChange={(e) => update("currency", e.target.value)} className={selectClass}>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => update("resumeChoice", "upload")}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                state.resumeChoice === "upload"
                  ? "border-gray-950 bg-black text-white"
                  : "border-gray-200 bg-gray-50/60 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold text-[15px] mb-1">Upload existing resume</p>
              <p className={`text-xs ${state.resumeChoice === "upload" ? "text-white/60" : "text-gray-400"}`}>
                We'll parse it to extract your skills, experience, and education, and check ATS compatibility.
              </p>
            </button>

            <button
              type="button"
              onClick={() => update("resumeChoice", "ai")}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                state.resumeChoice === "ai"
                  ? "border-gray-950 bg-black text-white"
                  : "border-gray-200 bg-gray-50/60 hover:border-gray-300"
              }`}
            >
              <p className="font-semibold text-[15px] mb-1">Build my resume with AI</p>
              <p className={`text-xs ${state.resumeChoice === "ai" ? "text-white/60" : "text-gray-400"}`}>
                Head into WorkTribe's AI Resume Builder after onboarding to create one from scratch.
              </p>
            </button>

            {state.resumeChoice && (
              <div className="border border-dashed border-gray-200 rounded-2xl p-5 text-center">
                <p className="text-xs text-gray-400">
                  {state.resumeChoice === "upload"
                    ? "Resume upload lives in your existing AI Resume system — head to "
                    : "The AI Resume Builder lives in "}
                  <span className="font-medium text-gray-700">AI Resume</span> from your dashboard right after this.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <OnboardingShell
      step={stepIndex}
      totalSteps={STEP_META.length}
      title={STEP_META[stepIndex].title}
      subtitle={STEP_META[stepIndex].subtitle}
      onBack={stepIndex > 0 ? handleBack : undefined}
      onContinue={handleContinue}
      continueLabel={stepIndex === STEP_META.length - 1 ? "Finish & go to dashboard" : "Continue"}
      continueDisabled={!isStepValid()}
      isSubmitting={isSubmitting}
      error={error}
      secondaryAction={
        stepIndex === STEP_META.length - 1 ? (
          <button
            type="button"
            onClick={handleSkipResume}
            disabled={isSubmitting}
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-40"
          >
            I'll do this later
          </button>
        ) : undefined
      }
    >
      {renderStep()}
    </OnboardingShell>
  );
};

export default TalentOnboarding;