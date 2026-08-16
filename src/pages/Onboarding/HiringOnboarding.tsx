"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";

import HiringOnboardingShell from "../../components/onboarding/hiring/HiringOnboardingShell";
import HiringOption from "../../components/onboarding/hiring/HiringOption";
import HiringTagInput from "../../components/onboarding/hiring/HiringTagInput";
import CompanyLogoUpload from "../../components/onboarding/hiring/CompanyLogoUpload";

import { apiFetch, ApiError } from "../../lib/api";
import { useAuth } from "../../contexts/Authcontext";
import { dashboardPathFor } from "../../lib/routing";

const COMPANY_TYPES = [
  "Tech Startup",
  "Software Agency",
  "Design Agency",
  "Consulting Firm",
  "eCommerce Business",
  "Fintech",
  "SaaS",
  "Marketplace",
  "Nonprofit",
  "University",
  "Enterprise",
  "Other",
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 people" },
  { value: "11-50", label: "11–50 people" },
  { value: "51-200", label: "51–200 people" },
  { value: "201-500", label: "201–500 people" },
  { value: "501-1000", label: "501–1,000 people" },
  { value: "1001-5000", label: "1,001–5,000 people" },
  { value: "5001+", label: "5,001+ people" },
];

const INDUSTRIES = [
  "Technology",
  "Fintech",
  "Healthtech",
  "E-commerce",
  "Education",
  "Finance & Banking",
  "Marketing & Advertising",
  "Consulting",
  "Logistics",
  "Energy",
  "Manufacturing",
  "Real Estate",
  "Media",
  "Telecommunications",
  "Government",
  "Nonprofit",
  "Other",
];

const DEPARTMENTS = [
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
  "Legal",
  "DevOps & Infrastructure",
  "Cybersecurity",
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry level" },
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
];

const WORK_ARRANGEMENTS = [
  {
    value: "remote",
    label: "Remote",
    description: "Work from anywhere",
  },
  {
    value: "hybrid",
    label: "Hybrid",
    description: "A mix of remote and office",
  },
  {
    value: "on-site",
    label: "On-site",
    description: "Work from the office",
  },
];

const COUNTRIES = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "India",
  "South Africa",
  "Kenya",
  "Ghana",
  "United Arab Emirates",
  "Australia",
];

const TIMEZONES = [
  "UTC-8 (PST)",
  "UTC-5 (EST)",
  "UTC+0 (GMT)",
  "UTC+1 (CET)",
  "UTC+2 (WAT/SAST)",
  "UTC+3 (EAT)",
  "UTC+4 (GST)",
  "UTC+5:30 (IST)",
  "UTC+8 (SGT/CST)",
  "UTC+9 (JST)",
  "UTC+10 (AEST)",
];

const ROLE_SUGGESTIONS = [
  "Software Engineer",
  "Backend Engineer",
  "Frontend Engineer",
  "Full Stack Engineer",
  "Product Manager",
  "UI/UX Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Marketing Manager",
  "Sales Manager",
];

const STEP_META = [
  {
    title: "Can you tell us about your company?",
    subtitle:
      "Let's start by understanding who you are. This helps us create a better hiring experience for your team.",
  },
  {
    title: "Where does your company operate?",
    subtitle:
      "Tell candidates where your team is based and where you hire from.",
  },
  {
    title: "Who are you looking to hire?",
    subtitle:
      "Tell WorkTribe what your team typically recruits for so we can improve candidate matching.",
  },
  {
    title: "How do you want to hire?",
    subtitle:
      "Set your hiring preferences and we'll use them to surface more relevant talent.",
  },
  {
    title: "Ready to find your next hire?",
    subtitle:
      "Your hiring profile is ready. Create your first role now or explore your dashboard.",
  },
];

interface HiringOnboardingState {
  companyLogo: string | null;

  recruiterName: string;
  recruiterTitle: string;

  companyName: string;
  companyType: string;
  companySize: string;

  country: string;
  location: string;
  timezone: string;
  website: string;
  industry: string;
  companyDescription: string;

  departments: string[];
  commonRoles: string[];
  experienceLevels: string[];

  employmentTypes: string[];
  workArrangement: string;
  hiringLocations: string[];
  internationalHiring: boolean;
  candidateTimezone: string;

  firstJobTitle: string;
}

const inputClass =
  "h-11 rounded-xl border-gray-200 bg-gray-50/60 text-sm placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:border-gray-900 transition-all";

const selectClass =
  "h-11 w-full rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 px-3 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all";

const textareaClass =
  "min-h-[120px] w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all resize-none";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider">
      {label}
    </Label>

    {children}
  </div>
);

const HiringOnboarding = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [state, setState] =
    useState<HiringOnboardingState>({
      companyLogo: null,

      recruiterName: user?.name || "",
      recruiterTitle: "",

      companyName: "",
      companyType: "",
      companySize: "",

      country: "",
      location: "",
      timezone: "",
      website: "",
      industry: "",
      companyDescription: "",

      departments: [],
      commonRoles: [],
      experienceLevels: [],

      employmentTypes: [],
      workArrangement: "",
      hiringLocations: [],
      internationalHiring: false,
      candidateTimezone: "",

      firstJobTitle: "",
    });

  const update = <
    K extends keyof HiringOnboardingState
  >(
    key: K,
    value: HiringOnboardingState[K]
  ) => {
    setState((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleArray = (
    key:
      | "departments"
      | "experienceLevels"
      | "employmentTypes",
    value: string
  ) => {
    const current = state[key];

    update(
      key,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  // ─────────────────────────────────────────────
  // API
  // ─────────────────────────────────────────────

  const saveCompanyBasics = () =>
    apiFetch("/api/hiring/profile", {
      method: "PUT",
      body: JSON.stringify({
        company: {
          name: state.companyName,
          type: state.companyType,
          size: state.companySize,
          logo: state.companyLogo || undefined,
        },
      }),
    });

  const saveCompanyLocation = () =>
    apiFetch("/api/hiring/profile", {
      method: "PUT",
      body: JSON.stringify({
        company: {
          country: state.country,
          location: state.location,
          website: state.website || undefined,
          industry: state.industry,
          description:
            state.companyDescription || undefined,
        },
        recruiter: {
          name: state.recruiterName,
          title: state.recruiterTitle,
          timezone: state.timezone,
        },
      }),
    });

  const saveHiringNeeds = () =>
    apiFetch("/api/hiring/profile", {
      method: "PUT",
      body: JSON.stringify({
        departments: state.departments,
        commonRoles: state.commonRoles,
        experienceLevels: state.experienceLevels,
      }),
    });

  const saveHiringPreferences = () =>
    apiFetch("/api/hiring/preferences", {
      method: "PUT",
      body: JSON.stringify({
        employmentTypes: state.employmentTypes,
        workPreference: state.workArrangement,
        hiringLocations: state.hiringLocations,
        openToInternational:
          state.internationalHiring,
        preferredTimezone:
          state.candidateTimezone || undefined,
      }),
    });

  const finishOnboarding = async () => {
    const data = await apiFetch<{ user: any }>(
      "/api/hiring/onboarding/complete",
      {
        method: "POST",
        body: JSON.stringify({
          firstJobTitle:
            state.firstJobTitle || undefined,
        }),
      }
    );

    updateUser(data.user);

    navigate(
      dashboardPathFor(data.user.role),
      { replace: true }
    );
  };

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  const handleContinue = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (stepIndex === 0) {
        await saveCompanyBasics();
      }

      if (stepIndex === 1) {
        await saveCompanyLocation();
      }

      if (stepIndex === 2) {
        await saveHiringNeeds();
      }

      if (stepIndex === 3) {
        await saveHiringPreferences();
      }

      if (
        stepIndex ===
        STEP_META.length - 1
      ) {
        await finishOnboarding();
        return;
      }

      setStepIndex((current) => current + 1);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await finishOnboarding();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);

    setStepIndex((current) =>
      Math.max(0, current - 1)
    );
  };

  // ─────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────

  const isStepValid = () => {
    switch (stepIndex) {
      case 0:
        return !!(
          state.companyName &&
          state.companyType &&
          state.companySize
        );

      case 1:
        return !!(
          state.country &&
          state.location &&
          state.industry
        );

      case 2:
        return (
          state.departments.length > 0 &&
          state.commonRoles.length > 0 &&
          state.experienceLevels.length > 0
        );

      case 3:
        return (
          state.employmentTypes.length > 0 &&
          !!state.workArrangement &&
          state.hiringLocations.length > 0
        );

      case 4:
        return true;

      default:
        return false;
    }
  };

  // ─────────────────────────────────────────────
  // Steps
  // ─────────────────────────────────────────────

  const renderStep = () => {
    switch (stepIndex) {

      // ═══════════════════════════════════════════
      // STEP 1
      // ═══════════════════════════════════════════

      case 0:
        return (
          <div className="space-y-7">

            <CompanyLogoUpload
              value={state.companyLogo}
              onChange={(value) =>
                update("companyLogo", value)
              }
            />

            <Field label="Company name">
              <Input
                value={state.companyName}
                onChange={(event) =>
                  update(
                    "companyName",
                    event.target.value
                  )
                }
                placeholder="Acme Technologies"
                className={inputClass}
              />
            </Field>

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                What kind of company are you?
              </Label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {COMPANY_TYPES.map((type) => (
                  <HiringOption
                    key={type}
                    label={type}
                    selected={
                      state.companyType === type
                    }
                    onClick={() =>
                      update(
                        "companyType",
                        type
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                How large is your company?
              </Label>

              <div className="space-y-2">
                {COMPANY_SIZES.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() =>
                      update(
                        "companySize",
                        size.value
                      )
                    }
                    className={`
                      w-full text-left h-10 px-4 rounded-xl
                      border text-[11px] font-medium
                      transition-all
                      ${
                        state.companySize ===
                        size.value
                          ? "border-gray-950 bg-gray-950 text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }
                    `}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════════
      // STEP 2
      // ═══════════════════════════════════════════

      case 1:
        return (
          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <Field label="Country">
                <select
                  value={state.country}
                  onChange={(event) =>
                    update(
                      "country",
                      event.target.value
                    )
                  }
                  className={selectClass}
                >
                  <option value="">
                    Select country
                  </option>

                  {COUNTRIES.map((country) => (
                    <option
                      key={country}
                      value={country}
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="City / location">
                <Input
                  value={state.location}
                  onChange={(event) =>
                    update(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="Lagos, Nigeria"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Industry">
              <select
                value={state.industry}
                onChange={(event) =>
                  update(
                    "industry",
                    event.target.value
                  )
                }
                className={selectClass}
              >
                <option value="">
                  Select industry
                </option>

                {INDUSTRIES.map((industry) => (
                  <option
                    key={industry}
                    value={industry}
                  >
                    {industry}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Company website">
              <Input
                value={state.website}
                onChange={(event) =>
                  update(
                    "website",
                    event.target.value
                  )
                }
                placeholder="https://company.com"
                className={inputClass}
              />
            </Field>

            <Field label="About your company">
              <textarea
                value={state.companyDescription}
                onChange={(event) =>
                  update(
                    "companyDescription",
                    event.target.value
                  )
                }
                placeholder="Tell candidates what your company does, what you're building, and what makes your team unique..."
                className={textareaClass}
              />
            </Field>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3">
                Hiring contact
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Your name">
                  <Input
                    value={state.recruiterName}
                    onChange={(event) =>
                      update(
                        "recruiterName",
                        event.target.value
                      )
                    }
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                </Field>

                <Field label="Your role">
                  <Input
                    value={state.recruiterTitle}
                    onChange={(event) =>
                      update(
                        "recruiterTitle",
                        event.target.value
                      )
                    }
                    placeholder="Talent Acquisition"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

          </div>
        );

      // ═══════════════════════════════════════════
      // STEP 3
      // ═══════════════════════════════════════════

      case 2:
        return (
          <div className="space-y-7">

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                Which departments do you hire for?
              </Label>

              <div className="grid grid-cols-2 gap-2">
                {DEPARTMENTS.map((department) => (
                  <HiringOption
                    key={department}
                    label={department}
                    selected={state.departments.includes(
                      department
                    )}
                    onClick={() =>
                      toggleArray(
                        "departments",
                        department
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                Common job titles
              </Label>

              <HiringTagInput
                values={state.commonRoles}
                onChange={(values) =>
                  update(
                    "commonRoles",
                    values
                  )
                }
                placeholder="e.g. Backend Engineer"
                suggestions={ROLE_SUGGESTIONS}
              />
            </div>

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                What experience levels do you hire?
              </Label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {EXPERIENCE_LEVELS.map((level) => (
                  <HiringOption
                    key={level.value}
                    label={level.label}
                    selected={state.experienceLevels.includes(
                      level.value
                    )}
                    onClick={() =>
                      toggleArray(
                        "experienceLevels",
                        level.value
                      )
                    }
                  />
                ))}
              </div>
            </div>

          </div>
        );

      // ═══════════════════════════════════════════
      // STEP 4
      // ═══════════════════════════════════════════

      case 3:
        return (
          <div className="space-y-7">

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                Employment types
              </Label>

              <div className="flex flex-wrap gap-2">
                {EMPLOYMENT_TYPES.map((type) => (
                  <HiringOption
                    key={type.value}
                    label={type.label}
                    selected={state.employmentTypes.includes(
                      type.value
                    )}
                    onClick={() =>
                      toggleArray(
                        "employmentTypes",
                        type.value
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-3 block">
                Work arrangement
              </Label>

              <div className="grid grid-cols-3 gap-2">
                {WORK_ARRANGEMENTS.map(
                  (arrangement) => (
                    <HiringOption
                      key={arrangement.value}
                      label={arrangement.label}
                      description={
                        arrangement.description
                      }
                      selected={
                        state.workArrangement ===
                        arrangement.value
                      }
                      onClick={() =>
                        update(
                          "workArrangement",
                          arrangement.value
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>

            <Field label="Where do you hire?">
              <HiringTagInput
                values={state.hiringLocations}
                onChange={(values) =>
                  update(
                    "hiringLocations",
                    values
                  )
                }
                placeholder="e.g. Lagos, London, Remote"
              />
            </Field>

            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="international-hiring"
                  checked={
                    state.internationalHiring
                  }
                  onCheckedChange={(value) =>
                    update(
                      "internationalHiring",
                      !!value
                    )
                  }
                  className="mt-0.5 rounded-md border-gray-300 data-[state=checked]:bg-gray-950 data-[state=checked]:border-gray-950"
                />

                <div>
                  <Label
                    htmlFor="international-hiring"
                    className="text-[11px] font-semibold text-gray-900 cursor-pointer"
                  >
                    Open to international talent
                  </Label>

                  <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">
                    We'll show you candidates outside
                    your primary hiring locations.
                  </p>
                </div>
              </div>
            </div>

            <Field label="Preferred candidate timezone">
              <select
                value={state.candidateTimezone}
                onChange={(event) =>
                  update(
                    "candidateTimezone",
                    event.target.value
                  )
                }
                className={selectClass}
              >
                <option value="">
                  No preference
                </option>

                {TIMEZONES.map((timezone) => (
                  <option
                    key={timezone}
                    value={timezone}
                  >
                    {timezone}
                  </option>
                ))}
              </select>
            </Field>

          </div>
        );

      // ═══════════════════════════════════════════
      // STEP 5
      // ═══════════════════════════════════════════

      case 4:
        return (
          <div className="space-y-5">

            <div className="rounded-2xl bg-gray-950 text-white p-6">
              <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center mb-5">
                <span className="text-sm font-bold">
                  +
                </span>
              </div>

              <p className="text-[17px] font-semibold tracking-tight">
                Your hiring profile is ready.
              </p>

              <p className="text-[11px] text-white/50 leading-relaxed mt-2 max-w-[380px]">
                WorkTribe can now use your company,
                hiring preferences and role requirements
                to help you find relevant talent.
              </p>
            </div>

            <Field label="What role are you hiring for first?">
              <Input
                value={state.firstJobTitle}
                onChange={(event) =>
                  update(
                    "firstJobTitle",
                    event.target.value
                  )
                }
                placeholder="e.g. Senior Backend Engineer"
                className={inputClass}
              />
            </Field>

            <div className="rounded-xl border border-dashed border-gray-200 p-5">
              <p className="text-[11px] font-medium text-gray-900">
                You can create the full job posting after onboarding.
              </p>

              <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
                WorkTribe's job creation flow will let you
                define responsibilities, requirements,
                compensation, screening questions and more.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                update(
                  "firstJobTitle",
                  ""
                )
              }
              className="hidden"
            >
              reset
            </button>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <HiringOnboardingShell
      step={stepIndex}
      totalSteps={STEP_META.length}
      title={STEP_META[stepIndex].title}
      subtitle={STEP_META[stepIndex].subtitle}
      onBack={
        stepIndex > 0
          ? handleBack
          : undefined
      }
      onContinue={handleContinue}
      continueLabel={
        stepIndex === STEP_META.length - 1
          ? "Finish & go to dashboard"
          : "Continue"
      }
      continueDisabled={!isStepValid()}
      isSubmitting={isSubmitting}
      error={error}
      secondaryAction={
        stepIndex === STEP_META.length - 1 ? (
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="text-[10px] text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-40"
          >
            I'll do this later
          </button>
        ) : undefined
      }
    >
      {renderStep()}
    </HiringOnboardingShell>
  );
};

export default HiringOnboarding;